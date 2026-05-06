import 'dotenv/config'
import crypto from 'node:crypto'
import express from 'express'
import cors from 'cors'
import pg from 'pg'
import nodemailer from 'nodemailer'

const { Pool } = pg
const PORT = Number(process.env.API_PORT ?? 4000)
const DATABASE_URL = process.env.DATABASE_URL ?? ''
const NODE_ENV = process.env.NODE_ENV ?? 'development'
const SMTP_HOST = process.env.SMTP_HOST ?? ''
const SMTP_PORT = Number(process.env.SMTP_PORT ?? 587)
const SMTP_USER = process.env.SMTP_USER ?? ''
const SMTP_PASS = process.env.SMTP_PASS ?? ''
const SMTP_FROM = process.env.SMTP_FROM ?? SMTP_USER

const normalizeEmail = (value = '') => String(value).trim().toLowerCase()
const ADMIN_EMAIL = normalizeEmail(process.env.ADMIN_EMAIL ?? '')
const ADMIN_PASSWORD = String(process.env.ADMIN_PASSWORD ?? '')
  .replace(/\r/g, '')
  .trim()
  .replace(/^\uFEFF/, '')
const ADMIN_SESSION_SECRET = String(process.env.ADMIN_SESSION_SECRET ?? '')
  .trim()
  .replace(/^\uFEFF/, '')

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL tanimli degil. .env dosyasina PostgreSQL baglanti bilgisini ekleyin.')
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
})

/** CSRF imzası: ayrı anahtar yoksa oturum sırrı; o da yoksa DB URL türevi (tek sunucu için sabit). */
const CSRF_SECRET = String(process.env.CSRF_SECRET ?? ADMIN_SESSION_SECRET ?? '')
  .trim()
  .replace(/^\uFEFF/, '') || crypto.createHash('sha256').update(DATABASE_URL).digest('hex')

const CSRF_TTL_MS = 60 * 60 * 1000

const getClientIp = (req) => {
  const xf = req.headers['x-forwarded-for']
  if (typeof xf === 'string' && xf.trim()) return xf.split(',')[0].trim()
  return req.socket?.remoteAddress ?? 'unknown'
}

const LOGIN_RATE_WINDOW_MS = 15 * 60 * 1000
const LOGIN_RATE_MAX_FAILS = 5
const loginFailBuckets = new Map()

const getLoginBucket = (key) => {
  const now = Date.now()
  let b = loginFailBuckets.get(key)
  if (!b || b.resetAt <= now) {
    b = { fails: 0, resetAt: now + LOGIN_RATE_WINDOW_MS }
    loginFailBuckets.set(key, b)
  }
  return b
}

const isLoginBlocked = (key) => {
  const b = getLoginBucket(key)
  return b.fails >= LOGIN_RATE_MAX_FAILS
}

const sendLoginRateLimited = (res, key) => {
  const b = getLoginBucket(key)
  const retryAfterSec = Math.max(1, Math.ceil((b.resetAt - Date.now()) / 1000))
  res.setHeader('Retry-After', String(retryAfterSec))
  res.status(429).json({ error: 'cok_fazla_giris_denemesi' })
}

const recordLoginFail = (key) => {
  const b = getLoginBucket(key)
  b.fails += 1
}

const clearLoginFails = (key) => {
  loginFailBuckets.delete(key)
}

const SCRYPT_PARAMS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }
const SCRYPT_KEYLEN = 64

const hashUserPassword = (plain) => {
  const salt = crypto.randomBytes(16)
  const hash = crypto.scryptSync(String(plain), salt, SCRYPT_KEYLEN, SCRYPT_PARAMS)
  return `scrypt$1$${SCRYPT_PARAMS.N}$${SCRYPT_PARAMS.r}$${SCRYPT_PARAMS.p}$${salt.toString('base64url')}$${hash.toString('base64url')}`
}

const verifyUserPassword = (plain, stored) => {
  const s = String(stored ?? '')
  if (!s.startsWith('scrypt$')) {
    return plain === s
  }
  const parts = s.split('$')
  if (parts.length !== 7 || parts[0] !== 'scrypt' || parts[1] !== '1') return false
  const N = Number(parts[2])
  const r = Number(parts[3])
  const p = Number(parts[4])
  if (!Number.isFinite(N) || !Number.isFinite(r) || !Number.isFinite(p)) return false
  let salt
  let expected
  try {
    salt = Buffer.from(parts[5], 'base64url')
    expected = Buffer.from(parts[6], 'base64url')
  } catch {
    return false
  }
  const hash = crypto.scryptSync(String(plain), salt, expected.length, { N, r, p, maxmem: SCRYPT_PARAMS.maxmem })
  if (hash.length !== expected.length) return false
  try {
    return crypto.timingSafeEqual(hash, expected)
  } catch {
    return false
  }
}

const createCsrfToken = () => {
  const payload = { t: Date.now(), n: crypto.randomBytes(10).toString('base64url') }
  const body = Buffer.from(JSON.stringify(payload), 'utf8').toString('base64url')
  const sig = crypto.createHmac('sha256', CSRF_SECRET).update(body).digest('base64url')
  return `${body}.${sig}`
}

const verifyCsrfToken = (raw) => {
  const token = String(raw ?? '')
  if (!token) return false
  const dot = token.lastIndexOf('.')
  if (dot < 0) return false
  const body = token.slice(0, dot)
  const sig = token.slice(dot + 1)
  const expected = crypto.createHmac('sha256', CSRF_SECRET).update(body).digest('base64url')
  if (sig.length !== expected.length) return false
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'))) return false
  } catch {
    return false
  }
  let parsed
  try {
    parsed = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
  } catch {
    return false
  }
  if (typeof parsed.t !== 'number' || Date.now() - parsed.t > CSRF_TTL_MS) return false
  return true
}

const allowedCorsOrigins = () => {
  const raw = String(process.env.FRONTEND_ORIGIN ?? '')
  const fromEnv = raw
    .split(',')
    .map((x) => x.trim())
    .filter(Boolean)
  const defaults = [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'http://localhost:4173',
    'http://127.0.0.1:4173',
  ]
  return [...new Set([...defaults, ...fromEnv])]
}

const app = express()

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (NODE_ENV === 'production') {
    res.setHeader('Strict-Transport-Security', 'max-age=15552000; includeSubDomains')
  }
  next()
})

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) {
        cb(null, true)
        return
      }
      cb(null, allowedCorsOrigins().includes(origin))
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'X-Admin-Token', 'X-CSRF-Token'],
  }),
)
app.use(express.json({ limit: '2mb' }))

app.get('/api/csrf-token', (_req, res) => {
  res.json({ token: createCsrfToken() })
})

app.use((req, res, next) => {
  const m = req.method
  if (m === 'GET' || m === 'HEAD' || m === 'OPTIONS') {
    next()
    return
  }
  const hdr = req.headers['x-csrf-token']
  const token = Array.isArray(hdr) ? hdr[0] : hdr
  if (!verifyCsrfToken(String(token ?? ''))) {
    res.status(403).json({ error: 'csrf_gecersiz' })
    return
  }
  next()
})

const ADMIN_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000

const safeEqualPassword = (a, b) => {
  try {
    const ba = Buffer.from(String(a), 'utf8')
    const bb = Buffer.from(String(b), 'utf8')
    if (ba.length !== bb.length) return false
    return crypto.timingSafeEqual(ba, bb)
  } catch {
    return false
  }
}

const createAdminSessionToken = () => {
  const exp = Date.now() + ADMIN_SESSION_TTL_MS
  const payload = JSON.stringify({ typ: 'admin', exp })
  const sig = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('base64url')
  const body = Buffer.from(payload, 'utf8').toString('base64url')
  return `${body}.${sig}`
}

const verifyAdminSessionToken = (rawToken) => {
  if (!rawToken || !ADMIN_SESSION_SECRET) return false
  const parts = String(rawToken).split('.')
  if (parts.length !== 2) return false
  const [bodyB64, sig] = parts
  let payload
  try {
    payload = Buffer.from(bodyB64, 'base64url').toString('utf8')
  } catch {
    return false
  }
  const expected = crypto.createHmac('sha256', ADMIN_SESSION_SECRET).update(payload).digest('base64url')
  if (sig.length !== expected.length) return false
  try {
    if (!crypto.timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'))) return false
  } catch {
    return false
  }
  try {
    const data = JSON.parse(payload)
    if (data.typ !== 'admin' || typeof data.exp !== 'number') return false
    if (data.exp < Date.now()) return false
    return true
  } catch {
    return false
  }
}

const requireAdmin = (req, res, next) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
    res.status(503).json({ error: 'ADMIN_EMAIL, ADMIN_PASSWORD ve ADMIN_SESSION_SECRET .env dosyasinda gerekli' })
    return
  }
  const raw = req.headers['x-admin-token']
  const header = Array.isArray(raw) ? raw[0] : raw
  if (!header || !verifyAdminSessionToken(String(header))) {
    res.status(401).json({ error: 'yetkisiz' })
    return
  }
  next()
}

const mailTransport =
  SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: SMTP_PORT === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null

app.post('/api/admin/login', (req, res) => {
  if (!ADMIN_EMAIL || !ADMIN_PASSWORD || !ADMIN_SESSION_SECRET) {
    res.status(503).json({ error: 'Yonetici girisi yapilandirilmamis (.env)' })
    return
  }
  const ip = getClientIp(req)
  const rateKey = `admin:${ip}`
  if (isLoginBlocked(rateKey)) {
    sendLoginRateLimited(res, rateKey)
    return
  }
  const email = normalizeEmail(req.body?.email)
  const password = String(req.body?.password ?? '')
    .trim()
    .replace(/^\uFEFF/, '')
  if (!email || !password) {
    res.status(400).json({ error: 'e-posta ve sifre gerekli' })
    return
  }
  if (email !== ADMIN_EMAIL || !safeEqualPassword(password, ADMIN_PASSWORD)) {
    recordLoginFail(rateKey)
    res.status(401).json({ error: 'e-posta veya sifre hatali' })
    return
  }
  clearLoginFails(rateKey)
  res.json({ token: createAdminSessionToken(), email: ADMIN_EMAIL })
})

const isPasswordValid = (password = '') => {
  const value = String(password)
  return value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[!@#$]/.test(value)
}

const createDefaultState = () => ({
  cart: [],
  orders: [],
  favorites: [],
  giftPoints: 80,
})

const sanitizeState = (input = {}) => ({
  cart: Array.isArray(input.cart) ? input.cart : [],
  orders: Array.isArray(input.orders) ? input.orders : [],
  favorites: Array.isArray(input.favorites) ? input.favorites : [],
  giftPoints:
    typeof input.giftPoints === 'number' && Number.isFinite(input.giftPoints) ? Math.max(0, Math.floor(input.giftPoints)) : 80,
})

const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS user_state (
      email TEXT PRIMARY KEY,
      state JSONB NOT NULL DEFAULT '{"cart":[],"orders":[],"favorites":[],"giftPoints":80}'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      email TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      surname TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS support_requests (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL REFERENCES users(email) ON DELETE CASCADE,
      subject TEXT NOT NULL,
      title TEXT NOT NULL,
      detail TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS password_reset_codes (
      email TEXT PRIMARY KEY REFERENCES users(email) ON DELETE CASCADE,
      code TEXT NOT NULL,
      expires_at TIMESTAMPTZ NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_products (
      sku TEXT PRIMARY KEY,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'kadin',
      price_text TEXT NOT NULL,
      stock INT NOT NULL DEFAULT 0,
      variants JSONB NOT NULL DEFAULT '[]'::jsonb,
      digital_url TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS order_fulfillment (
      order_id TEXT PRIMARY KEY,
      customer_email TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'Yeni',
      tracking_code TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`ALTER TABLE admin_products ADD COLUMN IF NOT EXISTS vat_rate SMALLINT NOT NULL DEFAULT 20`)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS customer_membership (
      email TEXT PRIMARY KEY,
      tier TEXT NOT NULL DEFAULT 'standart',
      discount_percent NUMERIC(5,2) NOT NULL DEFAULT 0
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS product_reviews (
      id BIGSERIAL PRIMARY KEY,
      email TEXT NOT NULL,
      sku TEXT NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'beklemede',
      reply TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS coupons (
      code TEXT PRIMARY KEY,
      kind TEXT NOT NULL,
      value NUMERIC(12,2) NOT NULL,
      min_cart NUMERIC(12,2) NOT NULL DEFAULT 0,
      expires_at TIMESTAMPTZ,
      active BOOLEAN NOT NULL DEFAULT true,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value JSONB NOT NULL DEFAULT '{}'::jsonb,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_banners (
      id BIGSERIAL PRIMARY KEY,
      title TEXT NOT NULL DEFAULT '',
      image_url TEXT NOT NULL DEFAULT '',
      link_url TEXT NOT NULL DEFAULT '',
      sort_order INT NOT NULL DEFAULT 0,
      active BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_blog_posts (
      id BIGSERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      published BOOLEAN NOT NULL DEFAULT false,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS cms_pages (
      slug TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      body TEXT NOT NULL DEFAULT '',
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `)
  await pool.query(`
    CREATE TABLE IF NOT EXISTS admin_audit_log (
      id BIGSERIAL PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      action TEXT NOT NULL,
      detail JSONB NOT NULL DEFAULT '{}'::jsonb
    )
  `)

  const seedPages = [
    ['mesafeli-satis', 'Mesafeli Satış Sözleşmesi', 'İçerik henüz düzenlenmedi.'],
    ['kvkk', 'KVKK Aydınlatma Metni', 'İçerik henüz düzenlenmedi.'],
    ['iade-kosullari', 'İade Koşulları', 'İçerik henüz düzenlenmedi.'],
  ]
  for (const [slug, title, body] of seedPages) {
    await pool.query(
      `INSERT INTO cms_pages (slug, title, body) VALUES ($1, $2, $3)
       ON CONFLICT (slug) DO NOTHING`,
      [slug, title, body],
    )
  }
}

const auditAdmin = async (action, detail = {}) => {
  try {
    await pool.query('INSERT INTO admin_audit_log (action, detail) VALUES ($1, $2::jsonb)', [action, JSON.stringify(detail)])
  } catch {
    /* ignore */
  }
}

const SITE_SETTING_KEYS = ['marketing', 'payment', 'finance', 'seo', 'security', 'cartReminder']

const defaultSiteSettings = () => ({
  marketing: {
    campaigns: [
      { id: 'c1', type: 'bundle', label: '3 al 2 öde', active: false, note: 'Sepet kuralı — entegrasyon sonrası otomatik uygulanır' },
      { id: 'c2', type: 'shipping', label: 'X TL üzeri ücretsiz kargo', active: true, thresholdTl: 1000 },
    ],
  },
  payment: {
    virtualPosProvider: '',
    bankTransfer: true,
    cashOnDelivery: true,
    notes: 'Iyzico / PayTR API anahtarları .env ve entegrasyon ile bağlanır.',
  },
  finance: {
    installments: [{ label: 'Tüm kartlar', maxInstallment: 6, commissionPercent: 2.8 }],
    defaultVatPercent: 20,
  },
  seo: {
    siteTitle: '',
    metaDescription: '',
    robotsTxt: 'User-agent: *\nDisallow:',
    sitemapNote: 'Üretim ortamında /sitemap.xml endpoint veya statik dosya servis edilir.',
  },
  security: {
    rolesDescription:
      'Panel erişimi yalnızca .env içindeki ADMIN_EMAIL ve ADMIN_PASSWORD ile mümkündür; oturum için ADMIN_SESSION_SECRET kullanılır. Çoklu rol için JWT ve rol tablosu eklenebilir.',
    backupNote: 'Veritabanı dökümü günlük cron + nesne depolama önerilir.',
  },
  cartReminder: {
    enabled: false,
    hoursSinceCartEdit: 24,
    lastDryRunInfo: '',
  },
})

const mergeSiteSettings = async () => {
  const defs = defaultSiteSettings()
  const out = {}
  const result = await pool.query('SELECT key, value FROM site_settings WHERE key = ANY($1)', [SITE_SETTING_KEYS])
  const fromDb = Object.fromEntries(result.rows.map((r) => [r.key, r.value]))
  for (const k of SITE_SETTING_KEYS) {
    const base = defs[k]
    const stored = fromDb[k] && typeof fromDb[k] === 'object' ? fromDb[k] : {}
    out[k] = { ...base, ...stored }
    if (k === 'marketing' && Array.isArray(stored.campaigns) && stored.campaigns.length > 0) {
      out[k].campaigns = stored.campaigns
    }
    if (k === 'finance' && Array.isArray(stored.installments) && stored.installments.length > 0) {
      out[k].installments = stored.installments
    }
  }
  return out
}

const parsePriceTr = (text = '') => {
  const n = Number(String(text).replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'))
  return Number.isNaN(n) ? 0 : n
}

const parseTrOrderDate = (createdAt = '') => {
  const m = String(createdAt).match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})/)
  if (!m) return null
  const d = new Date(Number(m[3]), Number(m[2]) - 1, Number(m[1]))
  return Number.isNaN(d.getTime()) ? null : d
}

/** Eski ASCII degerler panelde Turkce etiketlere donusturulur */
const normalizeOrderStatus = (raw) => {
  const s = String(raw ?? '').trim()
  const legacy = {
    Hazirlaniyor: 'Hazırlanıyor',
    Kargoda: 'Kargolandı',
    Iptal: 'İptal',
    Iade: 'İade',
  }
  const mapped = legacy[s] ?? s
  return mapped || 'Yeni'
}

/** user_state.orders kayıtlarına order_fulfillment alanlarını ekler (müşteri /api/state ve /api/orders). */
const enrichOrdersWithFulfillment = async (orders) => {
  const list = Array.isArray(orders) ? orders : []
  const orderIds = [...new Set(list.map((o) => String(o.id ?? '')).filter(Boolean))]
  let fulfillMap = new Map()
  if (orderIds.length) {
    const fulfillResult = await pool.query(
      'SELECT order_id, status, tracking_code, updated_at FROM order_fulfillment WHERE order_id = ANY($1::text[])',
      [orderIds],
    )
    fulfillMap = new Map(fulfillResult.rows.map((row) => [row.order_id, row]))
  }
  return list.map((order) => {
    const id = String(order.id ?? '')
    const f = fulfillMap.get(id)
    return {
      ...order,
      status: normalizeOrderStatus(f?.status ?? order.status ?? 'Yeni'),
      trackingCode: String(f?.tracking_code ?? order.trackingCode ?? '').trim(),
      fulfillmentUpdatedAt: f?.updated_at ? new Date(f.updated_at).toLocaleString('tr-TR') : order.fulfillmentUpdatedAt ?? null,
    }
  })
}

const collectOrdersFromStates = async () => {
  const result = await pool.query('SELECT email, state FROM user_state')
  const fulfillResult = await pool.query('SELECT order_id, customer_email, status, tracking_code, updated_at FROM order_fulfillment')
  const fulfillMap = new Map(fulfillResult.rows.map((row) => [row.order_id, row]))
  const list = []
  for (const row of result.rows) {
    const state = row.state ?? {}
    const orders = Array.isArray(state.orders) ? state.orders : []
    for (const order of orders) {
      const id = String(order.id ?? '')
      const f = fulfillMap.get(id)
      list.push({
        ...order,
        customerEmail: row.email,
        status: normalizeOrderStatus(f?.status ?? 'Yeni'),
        trackingCode: f?.tracking_code ?? '',
        fulfillmentUpdatedAt: f?.updated_at ? new Date(f.updated_at).toLocaleString('tr-TR') : null,
      })
    }
  }
  return list
}

const getStateByEmail = async (email) => {
  const result = await pool.query('SELECT state FROM user_state WHERE email = $1', [email])
  if (result.rowCount === 0) {
    const state = createDefaultState()
    await pool.query('INSERT INTO user_state (email, state) VALUES ($1, $2::jsonb)', [email, JSON.stringify(state)])
    return state
  }
  return sanitizeState(result.rows[0].state ?? {})
}

const upsertState = async (email, nextState) => {
  const state = sanitizeState(nextState)
  await pool.query(
    `
      INSERT INTO user_state (email, state)
      VALUES ($1, $2::jsonb)
      ON CONFLICT (email)
      DO UPDATE SET state = EXCLUDED.state, updated_at = NOW()
    `,
    [email, JSON.stringify(state)],
  )
  return state
}

app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')
    res.json({ ok: true })
  } catch {
    res.status(500).json({ ok: false })
  }
})

app.get('/api/state', async (req, res) => {
  const email = normalizeEmail(req.query.email)
  if (!email) {
    res.status(400).json({ error: 'email gerekli' })
    return
  }
  try {
    const state = await getStateByEmail(email)
    const orders = await enrichOrdersWithFulfillment(state.orders)
    res.json({ ...state, orders })
  } catch {
    res.status(500).json({ error: 'durum okunamadi' })
  }
})

app.get('/api/orders', async (req, res) => {
  const email = normalizeEmail(req.query.email)
  if (!email) {
    res.status(400).json({ error: 'email gerekli' })
    return
  }
  try {
    const state = await getStateByEmail(email)
    const orders = await enrichOrdersWithFulfillment(state.orders)
    res.json(orders)
  } catch {
    res.status(500).json({ error: 'siparisler okunamadi' })
  }
})

app.put('/api/state', async (req, res) => {
  const email = normalizeEmail(req.body?.email)
  if (!email) {
    res.status(400).json({ error: 'email gerekli' })
    return
  }

  try {
    const current = await getStateByEmail(email)
    const { cart, orders, favorites, giftPoints } = req.body ?? {}
    const state = await upsertState(email, {
      cart: Array.isArray(cart) ? cart : current.cart,
      orders: Array.isArray(orders) ? orders : current.orders,
      favorites: Array.isArray(favorites) ? favorites : current.favorites,
      giftPoints:
        typeof giftPoints === 'number' && Number.isFinite(giftPoints) ? Math.max(0, Math.floor(giftPoints)) : current.giftPoints,
    })
    res.json({ ok: true, state })
  } catch {
    res.status(500).json({ error: 'durum yazilamadi' })
  }
})

app.post('/api/checkout/stock', async (req, res) => {
  const items = Array.isArray(req.body?.items) ? req.body.items : []
  if (!items.length) {
    res.status(400).json({ error: 'items gerekli' })
    return
  }

  const normalized = items
    .map((item) => ({
      brand: String(item?.brand ?? '').trim(),
      model: String(item?.model ?? '').trim(),
      quantity: Math.max(0, Math.floor(Number(item?.quantity ?? 0))),
    }))
    .filter((item) => item.brand && item.model && item.quantity > 0)

  if (!normalized.length) {
    res.status(400).json({ error: 'gecerli urun yok' })
    return
  }

  const client = await pool.connect()
  try {
    await client.query('BEGIN')
    const insufficient = []
    for (const item of normalized) {
      const found = await client.query(
        `SELECT sku, stock FROM admin_products
         WHERE LOWER(brand) = LOWER($1) AND LOWER(model) = LOWER($2)
         ORDER BY updated_at DESC
         LIMIT 1
         FOR UPDATE`,
        [item.brand, item.model],
      )
      if (!found.rowCount) {
        insufficient.push({ brand: item.brand, model: item.model, requested: item.quantity, available: 0, reason: 'not_found' })
        continue
      }
      const row = found.rows[0]
      const available = Number(row.stock ?? 0)
      if (available < item.quantity) {
        insufficient.push({ brand: item.brand, model: item.model, requested: item.quantity, available, reason: 'insufficient' })
      }
    }

    if (insufficient.length) {
      await client.query('ROLLBACK')
      res.status(409).json({ error: 'yetersiz_stok', items: insufficient })
      return
    }

    for (const item of normalized) {
      await client.query(
        `UPDATE admin_products
         SET stock = GREATEST(0, stock - $3), updated_at = NOW()
         WHERE LOWER(brand) = LOWER($1) AND LOWER(model) = LOWER($2)`,
        [item.brand, item.model, item.quantity],
      )
    }

    await client.query('COMMIT')
    res.json({ ok: true })
  } catch {
    try {
      await client.query('ROLLBACK')
    } catch {
      // noop
    }
    res.status(500).json({ error: 'stok guncellenemedi' })
  } finally {
    client.release()
  }
})

app.get('/api/auth/me', async (req, res) => {
  const email = normalizeEmail(req.query.email)
  if (!email) {
    res.status(400).json({ error: 'email gerekli' })
    return
  }
  try {
    const result = await pool.query('SELECT name, surname, email FROM users WHERE email = $1', [email])
    if (!result.rowCount) {
      res.status(404).json({ error: 'kullanici bulunamadi' })
      return
    }
    res.json(result.rows[0])
  } catch {
    res.status(500).json({ error: 'kullanici okunamadi' })
  }
})

app.post('/api/auth/register', async (req, res) => {
  const name = String(req.body?.name ?? '').trim()
  const surname = String(req.body?.surname ?? '').trim()
  const email = normalizeEmail(req.body?.email)
  const password = String(req.body?.password ?? '').trim()
  if (!name || !surname || !email || !password) {
    res.status(400).json({ error: 'tum alanlar gerekli' })
    return
  }
  if (!isPasswordValid(password)) {
    res.status(400).json({ error: 'sifre kurallara uygun degil' })
    return
  }
  try {
    const exists = await pool.query('SELECT 1 FROM users WHERE email = $1', [email])
    if (exists.rowCount) {
      res.status(409).json({ error: 'bu e-posta zaten kayitli' })
      return
    }
    const passwordHash = hashUserPassword(password)
    await pool.query('INSERT INTO users (name, surname, email, password) VALUES ($1, $2, $3, $4)', [name, surname, email, passwordHash])
    await getStateByEmail(email)
    res.status(201).json({ ok: true, user: { name, surname, email } })
  } catch {
    res.status(500).json({ error: 'kayit olusturulamadi' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  const email = normalizeEmail(req.body?.email)
  const password = String(req.body?.password ?? '')
    .trim()
    .replace(/^\uFEFF/, '')
  if (!email || !password) {
    res.status(400).json({ error: 'email ve sifre gerekli' })
    return
  }
  const ip = getClientIp(req)
  const rateKey = `user:${ip}:${email}`
  if (isLoginBlocked(rateKey)) {
    sendLoginRateLimited(res, rateKey)
    return
  }
  if (
    ADMIN_EMAIL &&
    ADMIN_PASSWORD &&
    ADMIN_SESSION_SECRET &&
    email === ADMIN_EMAIL &&
    safeEqualPassword(password, ADMIN_PASSWORD)
  ) {
    clearLoginFails(rateKey)
    res.json({
      ok: true,
      user: { name: 'Yonetici', surname: 'Panel', email: ADMIN_EMAIL },
      adminToken: createAdminSessionToken(),
    })
    return
  }
  try {
    const result = await pool.query('SELECT name, surname, email, password FROM users WHERE email = $1', [email])
    if (!result.rowCount) {
      recordLoginFail(rateKey)
      res.status(401).json({ error: 'e-posta veya sifre hatali' })
      return
    }
    const row = result.rows[0]
    const stored = String(row.password ?? '')
    if (!verifyUserPassword(password, stored)) {
      recordLoginFail(rateKey)
      res.status(401).json({ error: 'e-posta veya sifre hatali' })
      return
    }
    if (!stored.startsWith('scrypt$')) {
      const nextHash = hashUserPassword(password)
      await pool.query('UPDATE users SET password = $2, updated_at = NOW() WHERE email = $1', [email, nextHash])
    }
    clearLoginFails(rateKey)
    res.json({ ok: true, user: { name: row.name, surname: row.surname, email: row.email } })
  } catch {
    res.status(500).json({ error: 'giris yapilamadi' })
  }
})

app.post('/api/auth/reset/request', async (req, res) => {
  const email = normalizeEmail(req.body?.email)
  if (!email) {
    res.status(400).json({ error: 'email gerekli' })
    return
  }
  try {
    const result = await pool.query('SELECT 1 FROM users WHERE email = $1', [email])
    if (!result.rowCount) {
      res.status(404).json({ error: 'kullanici bulunamadi' })
      return
    }
    if (!mailTransport || !SMTP_FROM) {
      res.status(500).json({ error: 'mail servisi ayarlanamadi' })
      return
    }

    const code = String(Math.floor(100000 + Math.random() * 900000))
    await pool.query(
      `
        INSERT INTO password_reset_codes (email, code, expires_at)
        VALUES ($1, $2, NOW() + INTERVAL '10 minutes')
        ON CONFLICT (email)
        DO UPDATE SET code = EXCLUDED.code, expires_at = EXCLUDED.expires_at, created_at = NOW()
      `,
      [email, code],
    )

    await mailTransport.sendMail({
      from: SMTP_FROM,
      to: email,
      subject: 'Sifre sifirlama kodunuz',
      text: `Sifre sifirlama kodunuz: ${code}\nBu kod 10 dakika gecerlidir.`,
    })
    res.json({ ok: true, message: 'Kod e-posta adresinize gonderildi.' })
  } catch {
    res.status(500).json({ error: 'sifre sifirlama istegi olusturulamadi' })
  }
})

app.post('/api/auth/reset/confirm', async (req, res) => {
  const email = normalizeEmail(req.body?.email)
  const code = String(req.body?.code ?? '').trim()
  const password = String(req.body?.password ?? '').trim()
  if (!email || !code || !password) {
    res.status(400).json({ error: 'email, kod ve yeni sifre gerekli' })
    return
  }
  if (!isPasswordValid(password)) {
    res.status(400).json({ error: 'sifre kurallara uygun degil' })
    return
  }
  try {
    const resetResult = await pool.query('SELECT code, expires_at FROM password_reset_codes WHERE email = $1', [email])
    if (!resetResult.rowCount) {
      res.status(400).json({ error: 'gecerli bir sifirlama talebi bulunamadi' })
      return
    }
    const resetRow = resetResult.rows[0]
    if (String(resetRow.code) !== code) {
      res.status(400).json({ error: 'dogrulama kodu hatali' })
      return
    }
    if (new Date(resetRow.expires_at).getTime() < Date.now()) {
      await pool.query('DELETE FROM password_reset_codes WHERE email = $1', [email])
      res.status(400).json({ error: 'kod suresi doldu' })
      return
    }

    const passwordHash = hashUserPassword(password)
    const result = await pool.query('UPDATE users SET password = $2, updated_at = NOW() WHERE email = $1 RETURNING name, surname, email', [
      email,
      passwordHash,
    ])
    if (!result.rowCount) {
      res.status(404).json({ error: 'kullanici bulunamadi' })
      return
    }
    await pool.query('DELETE FROM password_reset_codes WHERE email = $1', [email])
    res.json({ ok: true, user: result.rows[0] })
  } catch {
    res.status(500).json({ error: 'sifre guncellenemedi' })
  }
})

app.get('/api/support', async (req, res) => {
  const email = normalizeEmail(req.query.email)
  if (!email) {
    res.status(400).json({ error: 'email gerekli' })
    return
  }
  try {
    const result = await pool.query(
      'SELECT id, subject, title, detail, created_at FROM support_requests WHERE email = $1 ORDER BY created_at DESC',
      [email],
    )
    res.json(
      result.rows.map((row) => ({
        id: Number(row.id),
        subject: row.subject,
        title: row.title,
        detail: row.detail,
        createdAt: new Date(row.created_at).toLocaleString('tr-TR'),
      })),
    )
  } catch {
    res.status(500).json({ error: 'destek kayitlari okunamadi' })
  }
})

app.post('/api/support', async (req, res) => {
  const email = normalizeEmail(req.body?.email)
  const subject = String(req.body?.subject ?? '').trim()
  const title = String(req.body?.title ?? '').trim()
  const detail = String(req.body?.detail ?? '').trim()
  if (!email || !subject || !title) {
    res.status(400).json({ error: 'email, konu ve baslik gerekli' })
    return
  }
  try {
    const result = await pool.query(
      `
        INSERT INTO support_requests (email, subject, title, detail)
        VALUES ($1, $2, $3, $4)
        RETURNING id, subject, title, detail, created_at
      `,
      [email, subject, title, detail],
    )
    const row = result.rows[0]
    res.status(201).json({
      id: Number(row.id),
      subject: row.subject,
      title: row.title,
      detail: row.detail,
      createdAt: new Date(row.created_at).toLocaleString('tr-TR'),
    })
  } catch {
    res.status(500).json({ error: 'destek kaydi olusturulamadi' })
  }
})

app.put('/api/support/:id', async (req, res) => {
  const id = Number(req.params.id)
  const email = normalizeEmail(req.body?.email)
  const subject = String(req.body?.subject ?? '').trim()
  const title = String(req.body?.title ?? '').trim()
  const detail = String(req.body?.detail ?? '').trim()
  if (!Number.isFinite(id) || !email || !subject || !title) {
    res.status(400).json({ error: 'gecersiz veri' })
    return
  }
  try {
    const result = await pool.query(
      `
        UPDATE support_requests
        SET subject = $3, title = $4, detail = $5, updated_at = NOW()
        WHERE id = $1 AND email = $2
        RETURNING id, subject, title, detail, created_at
      `,
      [id, email, subject, title, detail],
    )
    if (!result.rowCount) {
      res.status(404).json({ error: 'talep bulunamadi' })
      return
    }
    const row = result.rows[0]
    res.json({
      id: Number(row.id),
      subject: row.subject,
      title: row.title,
      detail: row.detail,
      createdAt: new Date(row.created_at).toLocaleString('tr-TR'),
    })
  } catch {
    res.status(500).json({ error: 'talep guncellenemedi' })
  }
})

app.delete('/api/support/:id', async (req, res) => {
  const id = Number(req.params.id)
  const email = normalizeEmail(req.query.email)
  if (!Number.isFinite(id) || !email) {
    res.status(400).json({ error: 'gecersiz veri' })
    return
  }
  try {
    const result = await pool.query('DELETE FROM support_requests WHERE id = $1 AND email = $2 RETURNING id', [id, email])
    if (!result.rowCount) {
      res.status(404).json({ error: 'talep bulunamadi' })
      return
    }
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'talep silinemedi' })
  }
})

app.post('/api/admin/sync-catalog', requireAdmin, async (req, res) => {
  const products = req.body?.products
  if (!Array.isArray(products) || !products.length) {
    res.status(400).json({ error: 'products dizisi gerekli' })
    return
  }
  try {
    for (const p of products) {
      const brand = String(p.brand ?? '').trim()
      const model = String(p.model ?? '').trim()
      const category = String(p.category ?? 'kadin').trim() || 'kadin'
      const priceText = String(p.price ?? p.price_text ?? '').trim()
      if (!brand || !model || !priceText) continue
      const sku = `${brand}__${model}`.toLowerCase()
      await pool.query(
        `
          INSERT INTO admin_products (sku, brand, model, category, price_text, stock)
          VALUES ($1, $2, $3, $4, $5, COALESCE((SELECT stock FROM admin_products WHERE sku = $1), 15))
          ON CONFLICT (sku)
          DO UPDATE SET
            brand = EXCLUDED.brand,
            model = EXCLUDED.model,
            category = EXCLUDED.category,
            price_text = EXCLUDED.price_text,
            updated_at = NOW()
        `,
        [sku, brand, model, category, priceText],
      )
    }
    res.json({ ok: true, synced: products.length })
  } catch {
    res.status(500).json({ error: 'katalog senkronu basarisiz' })
  }
})

app.get('/api/admin/dashboard', requireAdmin, async (_req, res) => {
  try {
    const orders = await collectOrdersFromStates()
    const totalSales = orders.reduce((sum, o) => sum + parsePriceTr(o.total), 0)
    const orderCount = orders.length
    const userCountResult = await pool.query('SELECT COUNT(*)::int AS c FROM users')
    const registeredCustomers = userCountResult.rows[0]?.c ?? 0

    const today = new Date()
    const dayKey = (d) => d.toISOString().slice(0, 10)
    const revenueByDay = []
    for (let i = 13; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(d.getDate() - i)
      revenueByDay.push({ date: dayKey(d), label: d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }), amount: 0 })
    }
    const dayIndex = new Map(revenueByDay.map((b, i) => [b.date, i]))
    for (const o of orders) {
      const dt = parseTrOrderDate(o.createdAt) ?? today
      const key = dayKey(dt)
      const idx = dayIndex.get(key)
      if (idx !== undefined) {
        revenueByDay[idx].amount += parsePriceTr(o.total)
      }
    }

    const revenueByWeek = []
    for (let w = 3; w >= 0; w--) {
      const start = new Date(today)
      start.setDate(start.getDate() - (w + 1) * 7)
      const end = new Date(today)
      end.setDate(end.getDate() - w * 7)
      let amount = 0
      for (const o of orders) {
        const dt = parseTrOrderDate(o.createdAt)
        if (dt && dt >= start && dt < end) amount += parsePriceTr(o.total)
      }
      revenueByWeek.push({
        label: `${start.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })} – ${end.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' })}`,
        amount,
      })
    }

    const revenueByMonth = []
    for (let m = 5; m >= 0; m--) {
      const ref = new Date(today.getFullYear(), today.getMonth() - m, 1)
      let amount = 0
      for (const o of orders) {
        const dt = parseTrOrderDate(o.createdAt)
        if (dt && dt.getFullYear() === ref.getFullYear() && dt.getMonth() === ref.getMonth()) {
          amount += parsePriceTr(o.total)
        }
      }
      revenueByMonth.push({
        label: ref.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }),
        amount,
      })
    }

    const lowStockResult = await pool.query(
      'SELECT sku, brand, model, stock FROM admin_products WHERE stock <= 3 ORDER BY stock ASC, brand ASC LIMIT 12',
    )
    const pendingOrders = orders.filter((o) => ['Yeni', 'Hazırlanıyor'].includes(o.status)).length
    let returnRequests = 0
    try {
      const ret = await pool.query(
        `SELECT COUNT(*)::int AS c FROM support_requests WHERE LOWER(subject) LIKE '%iade%' OR LOWER(title) LIKE '%iade%'`,
      )
      returnRequests = ret.rows[0]?.c ?? 0
    } catch {
      returnRequests = 0
    }

    res.json({
      stats: {
        totalSales,
        orderCount,
        registeredCustomers,
      },
      charts: { revenueByDay, revenueByWeek, revenueByMonth },
      alerts: {
        lowStock: lowStockResult.rows,
        pendingOrders,
        returnRequests,
      },
    })
  } catch {
    res.status(500).json({ error: 'dashboard yuklenemedi' })
  }
})

app.get('/api/admin/products', requireAdmin, async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT sku, brand, model, category, price_text, stock, variants, digital_url, vat_rate, updated_at FROM admin_products ORDER BY brand ASC, model ASC',
    )
    res.json(
      result.rows.map((row) => ({
        sku: row.sku,
        brand: row.brand,
        model: row.model,
        category: row.category,
        priceText: row.price_text,
        stock: row.stock,
        variants: row.variants,
        digitalUrl: row.digital_url,
        vatRate: row.vat_rate,
        updatedAt: row.updated_at,
      })),
    )
  } catch {
    res.status(500).json({ error: 'urunler okunamadi' })
  }
})

app.patch('/api/admin/products/:sku', requireAdmin, async (req, res) => {
  const sku = String(req.params.sku ?? '').toLowerCase()
  const { stock, priceText, digitalUrl, variants, vatRate } = req.body ?? {}
  if (!sku) {
    res.status(400).json({ error: 'sku gerekli' })
    return
  }
  try {
    const updates = []
    const values = []
    let i = 1
    if (typeof stock === 'number' && Number.isFinite(stock)) {
      updates.push(`stock = $${i++}`)
      values.push(Math.max(0, Math.floor(stock)))
    }
    if (typeof priceText === 'string' && priceText.trim()) {
      updates.push(`price_text = $${i++}`)
      values.push(priceText.trim())
    }
    if (typeof digitalUrl === 'string') {
      updates.push(`digital_url = $${i++}`)
      values.push(digitalUrl.trim())
    }
    if (variants !== undefined) {
      updates.push(`variants = $${i++}::jsonb`)
      values.push(JSON.stringify(variants))
    }
    if (typeof vatRate === 'number' && Number.isFinite(vatRate)) {
      const v = Math.max(0, Math.min(100, Math.floor(vatRate)))
      if ([1, 10, 20].includes(v)) {
        updates.push(`vat_rate = $${i++}`)
        values.push(v)
      }
    }
    if (!updates.length) {
      res.status(400).json({ error: 'guncelleme alani yok' })
      return
    }
    updates.push('updated_at = NOW()')
    values.push(sku)
    const result = await pool.query(
      `UPDATE admin_products SET ${updates.join(', ')} WHERE sku = $${i} RETURNING sku, brand, model, category, price_text, stock, variants, digital_url, vat_rate`,
      values,
    )
    if (!result.rowCount) {
      res.status(404).json({ error: 'urun bulunamadi' })
      return
    }
    const row = result.rows[0]
    res.json({
      sku: row.sku,
      brand: row.brand,
      model: row.model,
      category: row.category,
      priceText: row.price_text,
      stock: row.stock,
      variants: row.variants,
      digitalUrl: row.digital_url,
      vatRate: row.vat_rate,
    })
  } catch {
    res.status(500).json({ error: 'urun guncellenemedi' })
  }
})

app.post('/api/admin/products/bulk-stock', requireAdmin, async (req, res) => {
  const skus = req.body?.skus
  const delta = req.body?.delta
  const stock = req.body?.stock
  if (!Array.isArray(skus) || !skus.length) {
    res.status(400).json({ error: 'skus dizisi gerekli' })
    return
  }
  try {
    for (const raw of skus) {
      const sku = String(raw ?? '').toLowerCase()
      if (!sku) continue
      if (typeof stock === 'number' && Number.isFinite(stock)) {
        await pool.query('UPDATE admin_products SET stock = $2, updated_at = NOW() WHERE sku = $1', [sku, Math.max(0, Math.floor(stock))])
      } else if (typeof delta === 'number' && Number.isFinite(delta)) {
        await pool.query('UPDATE admin_products SET stock = GREATEST(0, stock + $2), updated_at = NOW() WHERE sku = $1', [sku, Math.floor(delta)])
      }
    }
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'toplu stok guncellenemedi' })
  }
})

app.post('/api/admin/products/bulk-price', requireAdmin, async (req, res) => {
  const percent = Number(req.body?.percent)
  if (!Number.isFinite(percent)) {
    res.status(400).json({ error: 'percent (ornegin 5 veya -3) gerekli' })
    return
  }
  const factor = 1 + percent / 100
  try {
    const rows = await pool.query('SELECT sku, price_text FROM admin_products')
    for (const row of rows.rows) {
      const num = parsePriceTr(row.price_text)
      const next = num * factor
      const priceText = `${next.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`
      await pool.query('UPDATE admin_products SET price_text = $2, updated_at = NOW() WHERE sku = $1', [row.sku, priceText])
    }
    res.json({ ok: true, updated: rows.rows.length })
  } catch {
    res.status(500).json({ error: 'toplu fiyat guncellenemedi' })
  }
})

app.get('/api/admin/orders', requireAdmin, async (_req, res) => {
  try {
    const orders = await collectOrdersFromStates()
    orders.sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)))
    res.json(orders)
  } catch {
    res.status(500).json({ error: 'siparisler okunamadi' })
  }
})

app.patch('/api/admin/orders/:orderId', requireAdmin, async (req, res) => {
  const orderId = String(req.params.orderId ?? '').trim()
  const customerEmail = normalizeEmail(req.body?.customerEmail ?? req.body?.customer_email)
  const status = String(req.body?.status ?? '').trim()
  const trackingCode = String(req.body?.trackingCode ?? req.body?.tracking_code ?? '').trim()
  if (!orderId || !customerEmail || !status) {
    res.status(400).json({ error: 'orderId, customerEmail ve status gerekli' })
    return
  }
  try {
    await pool.query(
      `
        INSERT INTO order_fulfillment (order_id, customer_email, status, tracking_code)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (order_id)
        DO UPDATE SET
          customer_email = EXCLUDED.customer_email,
          status = EXCLUDED.status,
          tracking_code = EXCLUDED.tracking_code,
          updated_at = NOW()
      `,
      [orderId, customerEmail, status, trackingCode],
    )
    res.json({ ok: true, orderId, status, trackingCode })
  } catch {
    res.status(500).json({ error: 'siparis guncellenemedi' })
  }
})

const slugifyTr = (s = '') => {
  const map = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', Ç: 'c', Ğ: 'g', İ: 'i', Ö: 'o', Ş: 's', Ü: 'u' }
  const x = String(s).replace(/[çğıöşüÇĞİÖŞÜ]/g, (ch) => map[ch] ?? ch)
  return (
    x
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'yazi'
  )
}

app.get('/api/admin/customers', requireAdmin, async (_req, res) => {
  try {
    const r = await pool.query(`
      SELECT u.email, u.name, u.surname, us.state, cm.tier, cm.discount_percent
      FROM users u
      LEFT JOIN user_state us ON us.email = u.email
      LEFT JOIN customer_membership cm ON cm.email = u.email
      ORDER BY u.created_at DESC
    `)
    const customers = r.rows.map((row) => {
      const state = sanitizeState(row.state ?? {})
      const orders = state.orders
      const cart = state.cart
      const totalSpend = orders.reduce((sum, o) => sum + parsePriceTr(o.total), 0)
      const cartItemCount = cart.reduce((sum, c) => sum + (Number(c.quantity) || 0), 0)
      return {
        email: row.email,
        name: row.name,
        surname: row.surname,
        orderCount: orders.length,
        totalSpend,
        cartItemCount,
        cartPreview: cart.slice(0, 5).map((c) => ({
          brand: c.brand,
          model: c.model,
          quantity: c.quantity,
        })),
        tier: row.tier ?? 'standart',
        discountPercent: Number(row.discount_percent ?? 0),
      }
    })
    res.json(customers)
  } catch {
    res.status(500).json({ error: 'musteriler okunamadi' })
  }
})

app.patch('/api/admin/customers/:email', requireAdmin, async (req, res) => {
  const email = normalizeEmail(decodeURIComponent(String(req.params.email ?? '')))
  const tier = String(req.body?.tier ?? 'standart').trim() || 'standart'
  const discountPercent = Number(req.body?.discountPercent ?? req.body?.discount_percent ?? 0)
  if (!email) {
    res.status(400).json({ error: 'gecersiz e-posta' })
    return
  }
  if (!Number.isFinite(discountPercent) || discountPercent < 0 || discountPercent > 100) {
    res.status(400).json({ error: 'indirim 0-100 araliginda olmali' })
    return
  }
  try {
    await pool.query(
      `
        INSERT INTO customer_membership (email, tier, discount_percent)
        VALUES ($1, $2, $3)
        ON CONFLICT (email)
        DO UPDATE SET tier = EXCLUDED.tier, discount_percent = EXCLUDED.discount_percent
      `,
      [email, tier, discountPercent],
    )
    await auditAdmin('customer_membership', { email, tier, discountPercent })
    res.json({ ok: true, email, tier, discountPercent })
  } catch {
    res.status(500).json({ error: 'uyelik guncellenemedi' })
  }
})

app.get('/api/admin/reviews', requireAdmin, async (_req, res) => {
  try {
    const r = await pool.query(
      'SELECT id, email, sku, rating, comment, status, reply, created_at FROM product_reviews ORDER BY created_at DESC LIMIT 200',
    )
    res.json(
      r.rows.map((row) => ({
        id: String(row.id),
        email: row.email,
        sku: row.sku,
        rating: row.rating,
        comment: row.comment,
        status: row.status,
        reply: row.reply,
        createdAt: new Date(row.created_at).toLocaleString('tr-TR'),
      })),
    )
  } catch {
    res.status(500).json({ error: 'yorumlar okunamadi' })
  }
})

app.patch('/api/admin/reviews/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  const status = String(req.body?.status ?? '').trim()
  const reply = typeof req.body?.reply === 'string' ? req.body.reply : undefined
  const allowed = ['beklemede', 'onaylandi', 'reddedildi']
  if (!Number.isFinite(id) || !allowed.includes(status)) {
    res.status(400).json({ error: 'gecersiz istek' })
    return
  }
  try {
    const r = await pool.query(
      `UPDATE product_reviews SET status = $2, reply = COALESCE($3, reply) WHERE id = $1 RETURNING id, email, sku, rating, comment, status, reply, created_at`,
      [id, status, reply ?? null],
    )
    if (!r.rowCount) {
      res.status(404).json({ error: 'yorum yok' })
      return
    }
    await auditAdmin('review_moderate', { id, status })
    const row = r.rows[0]
    res.json({
      id: String(row.id),
      email: row.email,
      sku: row.sku,
      rating: row.rating,
      comment: row.comment,
      status: row.status,
      reply: row.reply,
      createdAt: new Date(row.created_at).toLocaleString('tr-TR'),
    })
  } catch {
    res.status(500).json({ error: 'yorum guncellenemedi' })
  }
})

app.get('/api/admin/coupons', requireAdmin, async (_req, res) => {
  try {
    const r = await pool.query(
      'SELECT code, kind, value, min_cart, expires_at, active, created_at FROM coupons ORDER BY created_at DESC',
    )
    res.json(
      r.rows.map((row) => ({
        code: row.code,
        kind: row.kind,
        value: Number(row.value),
        minCart: Number(row.min_cart),
        expiresAt: row.expires_at ? new Date(row.expires_at).toISOString() : null,
        active: row.active,
      })),
    )
  } catch {
    res.status(500).json({ error: 'kuponlar okunamadi' })
  }
})

app.post('/api/admin/coupons', requireAdmin, async (req, res) => {
  const code = String(req.body?.code ?? '')
    .trim()
    .toUpperCase()
    .replace(/\s+/g, '')
  const kind = String(req.body?.kind ?? 'percent')
  const value = Number(req.body?.value)
  const minCart = Number(req.body?.minCart ?? req.body?.min_cart ?? 0)
  const expiresRaw = req.body?.expiresAt ?? req.body?.expires_at
  const expiresAt = expiresRaw ? new Date(String(expiresRaw)) : null
  const active = req.body?.active !== false
  if (!code || !['percent', 'fixed'].includes(kind) || !Number.isFinite(value) || value <= 0) {
    res.status(400).json({ error: 'code, kind (percent|fixed) ve value gerekli' })
    return
  }
  if (expiresAt && Number.isNaN(expiresAt.getTime())) {
    res.status(400).json({ error: 'gecersiz tarih' })
    return
  }
  try {
    await pool.query(
      `INSERT INTO coupons (code, kind, value, min_cart, expires_at, active) VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (code) DO UPDATE SET kind = EXCLUDED.kind, value = EXCLUDED.value, min_cart = EXCLUDED.min_cart, expires_at = EXCLUDED.expires_at, active = EXCLUDED.active`,
      [code, kind, value, minCart, expiresAt && !Number.isNaN(expiresAt.getTime()) ? expiresAt : null, active],
    )
    await auditAdmin('coupon_upsert', { code })
    res.json({ ok: true, code })
  } catch {
    res.status(500).json({ error: 'kupon kaydedilemedi' })
  }
})

app.delete('/api/admin/coupons/:code', requireAdmin, async (req, res) => {
  const code = String(req.params.code ?? '')
    .trim()
    .toUpperCase()
  if (!code) {
    res.status(400).json({ error: 'kod gerekli' })
    return
  }
  try {
    await pool.query('DELETE FROM coupons WHERE code = $1', [code])
    await auditAdmin('coupon_delete', { code })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'kupon silinemedi' })
  }
})

app.get('/api/admin/site-config', requireAdmin, async (_req, res) => {
  try {
    res.json(await mergeSiteSettings())
  } catch {
    res.status(500).json({ error: 'ayarlar okunamadi' })
  }
})

app.patch('/api/admin/site-config', requireAdmin, async (req, res) => {
  try {
    const body = req.body ?? {}
    const defs = defaultSiteSettings()
    for (const k of SITE_SETTING_KEYS) {
      if (body[k] == null || typeof body[k] !== 'object') continue
      const prevRow = await pool.query('SELECT value FROM site_settings WHERE key = $1', [k])
      const prev = prevRow.rows[0]?.value && typeof prevRow.rows[0].value === 'object' ? prevRow.rows[0].value : {}
      const merged = { ...defs[k], ...prev, ...body[k] }
      await pool.query(
        `INSERT INTO site_settings (key, value) VALUES ($1, $2::jsonb)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [k, JSON.stringify(merged)],
      )
      await auditAdmin('site_config', { key: k })
    }
    res.json(await mergeSiteSettings())
  } catch {
    res.status(500).json({ error: 'ayarlar guncellenemedi' })
  }
})

app.get('/api/admin/banners', requireAdmin, async (_req, res) => {
  try {
    const r = await pool.query(
      'SELECT id, title, image_url, link_url, sort_order, active FROM cms_banners ORDER BY sort_order ASC, id ASC',
    )
    res.json(
      r.rows.map((row) => ({
        id: String(row.id),
        title: row.title,
        imageUrl: row.image_url,
        linkUrl: row.link_url,
        sortOrder: row.sort_order,
        active: row.active,
      })),
    )
  } catch {
    res.status(500).json({ error: 'bannerlar okunamadi' })
  }
})

app.post('/api/admin/banners', requireAdmin, async (req, res) => {
  const title = String(req.body?.title ?? '').trim()
  const imageUrl = String(req.body?.imageUrl ?? req.body?.image_url ?? '').trim()
  const linkUrl = String(req.body?.linkUrl ?? req.body?.link_url ?? '').trim()
  const sortOrder = Number(req.body?.sortOrder ?? req.body?.sort_order ?? 0)
  const active = req.body?.active !== false
  try {
    const r = await pool.query(
      `INSERT INTO cms_banners (title, image_url, link_url, sort_order, active) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [title, imageUrl, linkUrl, Number.isFinite(sortOrder) ? sortOrder : 0, active],
    )
    await auditAdmin('banner_create', { id: r.rows[0].id })
    res.json({ ok: true, id: String(r.rows[0].id) })
  } catch {
    res.status(500).json({ error: 'banner olusturulamadi' })
  }
})

app.patch('/api/admin/banners/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: 'gecersiz id' })
    return
  }
  try {
    const fields = []
    const vals = []
    let i = 1
    if (typeof req.body?.title === 'string') {
      fields.push(`title = $${i++}`)
      vals.push(req.body.title.trim())
    }
    if (typeof req.body?.imageUrl === 'string' || typeof req.body?.image_url === 'string') {
      fields.push(`image_url = $${i++}`)
      vals.push(String(req.body.imageUrl ?? req.body.image_url).trim())
    }
    if (typeof req.body?.linkUrl === 'string' || typeof req.body?.link_url === 'string') {
      fields.push(`link_url = $${i++}`)
      vals.push(String(req.body.linkUrl ?? req.body.link_url).trim())
    }
    if (typeof req.body?.sortOrder === 'number' || typeof req.body?.sort_order === 'number') {
      fields.push(`sort_order = $${i++}`)
      vals.push(Math.floor(Number(req.body.sortOrder ?? req.body.sort_order)))
    }
    if (typeof req.body?.active === 'boolean') {
      fields.push(`active = $${i++}`)
      vals.push(req.body.active)
    }
    if (!fields.length) {
      res.status(400).json({ error: 'guncelleme alani yok' })
      return
    }
    fields.push('updated_at = NOW()')
    vals.push(id)
    const r = await pool.query(`UPDATE cms_banners SET ${fields.join(', ')} WHERE id = $${i}`, vals)
    if (!r.rowCount) {
      res.status(404).json({ error: 'banner yok' })
      return
    }
    await auditAdmin('banner_update', { id })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'banner guncellenemedi' })
  }
})

app.delete('/api/admin/banners/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: 'gecersiz id' })
    return
  }
  try {
    await pool.query('DELETE FROM cms_banners WHERE id = $1', [id])
    await auditAdmin('banner_delete', { id })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'banner silinemedi' })
  }
})

app.get('/api/admin/blog', requireAdmin, async (_req, res) => {
  try {
    const r = await pool.query(
      'SELECT id, slug, title, excerpt, body, published, created_at FROM cms_blog_posts ORDER BY updated_at DESC',
    )
    res.json(
      r.rows.map((row) => ({
        id: String(row.id),
        slug: row.slug,
        title: row.title,
        excerpt: row.excerpt,
        body: row.body,
        published: row.published,
        createdAt: new Date(row.created_at).toLocaleString('tr-TR'),
      })),
    )
  } catch {
    res.status(500).json({ error: 'blog okunamadi' })
  }
})

app.post('/api/admin/blog', requireAdmin, async (req, res) => {
  const title = String(req.body?.title ?? '').trim()
  let slug = String(req.body?.slug ?? '').trim()
  const excerpt = String(req.body?.excerpt ?? '').trim()
  const body = String(req.body?.body ?? '')
  const published = req.body?.published === true
  if (!title) {
    res.status(400).json({ error: 'baslik gerekli' })
    return
  }
  if (!slug) slug = slugifyTr(title)
  try {
    const r = await pool.query(
      `INSERT INTO cms_blog_posts (slug, title, excerpt, body, published) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [slug, title, excerpt, body, published],
    )
    await auditAdmin('blog_create', { id: r.rows[0].id, slug })
    res.json({ ok: true, id: String(r.rows[0].id), slug })
  } catch (e) {
    if (String(e?.code) === '23505') {
      res.status(409).json({ error: 'bu slug zaten var' })
      return
    }
    res.status(500).json({ error: 'yazi olusturulamadi' })
  }
})

app.patch('/api/admin/blog/:id', requireAdmin, async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isFinite(id)) {
    res.status(400).json({ error: 'gecersiz id' })
    return
  }
  try {
    const fields = []
    const vals = []
    let i = 1
    for (const [key, col] of [
      ['title', 'title'],
      ['slug', 'slug'],
      ['excerpt', 'excerpt'],
      ['body', 'body'],
    ]) {
      if (typeof req.body?.[key] === 'string') {
        fields.push(`${col} = $${i++}`)
        vals.push(req.body[key])
      }
    }
    if (typeof req.body?.published === 'boolean') {
      fields.push(`published = $${i++}`)
      vals.push(req.body.published)
    }
    if (!fields.length) {
      res.status(400).json({ error: 'guncelleme alani yok' })
      return
    }
    fields.push('updated_at = NOW()')
    vals.push(id)
    const r = await pool.query(`UPDATE cms_blog_posts SET ${fields.join(', ')} WHERE id = $${i}`, vals)
    if (!r.rowCount) {
      res.status(404).json({ error: 'yazi yok' })
      return
    }
    await auditAdmin('blog_update', { id })
    res.json({ ok: true })
  } catch {
    res.status(500).json({ error: 'yazi guncellenemedi' })
  }
})

app.get('/api/admin/cms-pages', requireAdmin, async (_req, res) => {
  try {
    const r = await pool.query('SELECT slug, title, body, updated_at FROM cms_pages ORDER BY slug ASC')
    res.json(
      r.rows.map((row) => ({
        slug: row.slug,
        title: row.title,
        body: row.body,
        updatedAt: new Date(row.updated_at).toLocaleString('tr-TR'),
      })),
    )
  } catch {
    res.status(500).json({ error: 'sayfalar okunamadi' })
  }
})

app.patch('/api/admin/cms-pages/:slug', requireAdmin, async (req, res) => {
  const slug = String(req.params.slug ?? '').trim().toLowerCase()
  const title = typeof req.body?.title === 'string' ? req.body.title.trim() : null
  const body = typeof req.body?.body === 'string' ? req.body.body : null
  if (!slug || (title == null && body == null)) {
    res.status(400).json({ error: 'slug ve title veya body gerekli' })
    return
  }
  try {
    const r = await pool.query(
      `
        UPDATE cms_pages
        SET title = COALESCE($2, title), body = COALESCE($3, body), updated_at = NOW()
        WHERE slug = $1
        RETURNING slug, title, body
      `,
      [slug, title, body],
    )
    if (!r.rowCount) {
      res.status(404).json({ error: 'sayfa yok' })
      return
    }
    await auditAdmin('cms_page', { slug })
    res.json({ ok: true, page: r.rows[0] })
  } catch {
    res.status(500).json({ error: 'sayfa guncellenemedi' })
  }
})

app.get('/api/admin/audit-log', requireAdmin, async (req, res) => {
  const limit = Math.min(200, Math.max(1, Number(req.query.limit) || 80))
  try {
    const r = await pool.query(
      'SELECT id, created_at, action, detail FROM admin_audit_log ORDER BY id DESC LIMIT $1',
      [limit],
    )
    res.json(
      r.rows.map((row) => ({
        id: String(row.id),
        at: new Date(row.created_at).toLocaleString('tr-TR'),
        action: row.action,
        detail: row.detail,
      })),
    )
  } catch {
    res.status(500).json({ error: 'log okunamadi' })
  }
})

app.post('/api/admin/cart-reminders', requireAdmin, async (req, res) => {
  const dryRun = req.body?.dryRun !== false
  const hours = Math.max(1, Number(req.body?.hours) || 24)
  try {
    const r = await pool.query('SELECT email, state, updated_at FROM user_state')
    const candidates = []
    for (const row of r.rows) {
      const state = sanitizeState(row.state ?? {})
      if (!state.cart?.length) continue
      const updated = new Date(row.updated_at).getTime()
      if ((Date.now() - updated) / 3600000 < hours) continue
      candidates.push({ email: row.email, lineCount: state.cart.length })
    }
    if (dryRun) {
      await auditAdmin('cart_reminder_dry_run', { hours, count: candidates.length })
      return res.json({ dryRun: true, hours, count: candidates.length, candidates })
    }
    if (!mailTransport) {
      res.status(503).json({ error: 'SMTP yapilandirilmadi; e-posta gonderilemez' })
      return
    }
    let sent = 0
    for (const c of candidates) {
      try {
        await mailTransport.sendMail({
          from: SMTP_FROM,
          to: c.email,
          subject: 'Sepetinizde bekleyen ürünler var',
          text: `Merhaba,\n\nAlışveriş sepetinizde ${c.lineCount} kalem ürün var. Alışverişe devam etmek için sitemizi ziyaret edebilirsiniz.\n\nİyi günler`,
        })
        sent++
      } catch {
        /* tek kayıt hatası */
      }
    }
    await auditAdmin('cart_reminder_sent', { hours, sent, candidates: candidates.length })
    const cfg = await mergeSiteSettings()
    const nextCart = {
      ...cfg.cartReminder,
      lastDryRunInfo: `Son gonderim: ${sent}/${candidates.length} (${new Date().toISOString()})`,
    }
    await pool.query(
      `INSERT INTO site_settings (key, value) VALUES ('cartReminder', $1::jsonb)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [JSON.stringify({ ...cfg.cartReminder, ...nextCart })],
    )
    res.json({ ok: true, sent, total: candidates.length })
  } catch {
    res.status(500).json({ error: 'sepet hatirlatma calistirilamadi' })
  }
})

const apiParseErrorHandler = (err, req, res, next) => {
  const isParse =
    (err instanceof SyntaxError && 'body' in err) || err?.type === 'entity.parse.failed'
  if (isParse) {
    res.status(400).json({ error: 'gecersiz veya eksik json govde' })
    return
  }
  next(err)
}

app.use(apiParseErrorHandler)

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'endpoint bulunamadi' })
})

const apiFatalErrorHandler = (err, req, res, _next) => {
  console.error('API beklenmeyen hata:', err?.message ?? err)
  if (res.headersSent) return
  res.status(500).json({ error: 'sunucu hatasi' })
}

app.use(apiFatalErrorHandler)

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Backend API hazir: http://localhost:${PORT}`)
      console.log('Rotalar: GET /api/health | POST /api/auth/login | POST /api/admin/login')
    })
  })
  .catch((error) => {
    console.error('PostgreSQL baslatma hatasi:', error)
    process.exit(1)
  })
