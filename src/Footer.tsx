import type { ComponentType } from 'react'
import './Footer.css'

export type FooterNewsletterIds = {
  formId: string
  emailInputId: string
  statusId: string
}

type FooterProps = {
  newsletterIds: FooterNewsletterIds
}

const stroke = { fill: 'none' as const, stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

function IconSecure() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
}

function IconReturns() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  )
}

function IconDelivery() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M1 12h15l3-6H6" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  )
}

function IconInstallment() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" />
    </svg>
  )
}

function IconPackaging() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 3l9 5-9 5-9-5 9-5z" />
      <path d="M3 8v8l9 5 9-5V8" />
      <path d="M12 13V3" />
    </svg>
  )
}

function IconQuality() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 15c-3.3 0-6-1.3-6-3V6c0-1.7 2.7-3 6-3s6 1.3 6 3v6c0 1.7-2.7 3-6 3z" />
      <path d="M12 15v4" />
      <path d="M8 22h8" />
    </svg>
  )
}

function IconSustainable() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <path d="M12 22s8-6 8-13a8 8 0 0 0-16 0c0 7 8 13 8 13z" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    </svg>
  )
}

function IconRange() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...stroke}>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  )
}

const FEATURES: { label: string; Icon: ComponentType }[] = [
  { label: 'Güvenli alışveriş', Icon: IconSecure },
  { label: 'Kolay iade', Icon: IconReturns },
  { label: 'Hızlı teslimat', Icon: IconDelivery },
  { label: 'Taksitli ödeme', Icon: IconInstallment },
  { label: 'Şık paketleme', Icon: IconPackaging },
  { label: 'Kaliteli ürünler', Icon: IconQuality },
  { label: 'Sürdürülebilir', Icon: IconSustainable },
  { label: 'Geniş ürün yelpazesi', Icon: IconRange },
]

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V8a1 1 0 0 1 1-1h3V3z" />
    </svg>
  )
}

function IconX() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4l16 16M20 4L4 20" strokeLinecap="round" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
      <path d="M14.5 3h3v12.3a4.2 4.2 0 1 1-4.2-4.2V10a2.1 2.1 0 1 0 2.1 2.1V3z" />
    </svg>
  )
}

function BadgeAppStore() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      <path d="M16.36 12.5c-.02-2.56 2.1-3.8 2.19-3.86-1.2-1.75-3.06-1.99-3.72-2.01-1.58-.16-3.08.93-3.88.93-.8 0-2.04-.91-3.35-.88-1.72.03-3.31 1-4.19 2.53-1.79 3.1-.46 7.69 1.28 10.2.85 1.23 1.87 2.62 3.2 2.57 1.28-.05 1.76-.83 3.3-.83 1.54 0 1.97.83 3.32.8 1.37-.02 2.24-1.24 3.08-2.48.97-1.42 1.37-2.8 1.39-2.87-.03-.01-2.66-1.02-2.69-4.05zM13.35 3.8c.7-.85 1.18-2.03 1.05-3.22-1.02.04-2.26.68-2.99 1.53-.65.75-1.22 1.95-1.07 3.1 1.13.09 2.28-.57 3.01-1.41z" />
    </svg>
  )
}

function BadgePlay() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="currentColor">
      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.19 21.98c-.43.25-.97.26-1.4 0l-.01-.01 11.62-11.59zM14.19 8.38l3.62 2.24c.53.33.53 1.1 0 1.43l-3.62 2.24-2.5-3.45 2.5-2.46z" />
    </svg>
  )
}

export function Footer({ newsletterIds }: FooterProps) {
  const { formId, emailInputId, statusId } = newsletterIds

  return (
    <footer className="ec-footer" lang="tr">
      <div className="ec-footer__inner">
        <div className="ec-footer__features">
          {FEATURES.map(({ label, Icon }) => (
            <div key={label} className="ec-footer__feature">
              <span className="ec-footer__feature-icon">
                <Icon />
              </span>
              <span className="ec-footer__feature-label">{label}</span>
            </div>
          ))}
        </div>

        <div className="ec-footer__newsletter">
          <div>
            <p className="ec-footer__newsletter-lead">E-bültenimize katılın, haberdar olun:</p>
            <form id={formId} className="ec-footer__newsletter-form">
              <input
                id={emailInputId}
                className="ec-footer__newsletter-input"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="E-posta adresinizi yazın..."
                required
              />
              <button type="submit" className="ec-footer__newsletter-submit">
                Kaydol
              </button>
            </form>
            <p id={statusId} className="ec-footer__newsletter-status" role="status" aria-live="polite" />
          </div>
          <div>
            <p className="ec-footer__social-title">Bizi takip edin!</p>
            <div className="ec-footer__social-links">
              <a className="ec-footer__social-btn" href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <IconFacebook />
              </a>
              <a className="ec-footer__social-btn" href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <IconX />
              </a>
              <a className="ec-footer__social-btn" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <IconInstagram />
              </a>
              <a className="ec-footer__social-btn" href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <IconTikTok />
              </a>
            </div>
          </div>
        </div>

        <div className="ec-footer__main">
          <div className="ec-footer__help-bar" aria-label="Hızlı yardım">
            <span className="ec-footer__help-label">Yardıma mı ihtiyacınız var?</span>
            <a href="#">Sık sorulan sorular</a>
            <span className="ec-footer__help-sep" aria-hidden="true">
              |
            </span>
            <a href="tel:+905331233333">0533 123 3333</a>
            <span className="ec-footer__help-sep" aria-hidden="true">
              |
            </span>
            <a href="mailto:ilaydaDefne@gmail.com">ilaydaDefne@gmail.com</a>
          </div>

          <div className="ec-footer__columns">
            <nav aria-label="Kurumsal">
              <h4 className="ec-footer__col-title">Kurumsal</h4>
              <ul className="ec-footer__col-list">
                <li>
                  <a href="#">Hikayemiz</a>
                </li>
                <li>
                  <a href="#">KVKK (aydınlatma)</a>
                </li>
                <li>
                  <a href="#">Çerez politikası</a>
                </li>
                <li>
                  <a href="#">Mesafeli satış sözleşmesi</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Mağazalar</a>
                </li>
                <li>
                  <a href="#">Ürün analiz raporları</a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Alışveriş">
              <h4 className="ec-footer__col-title">Alışveriş</h4>
              <ul className="ec-footer__col-list">
                <li>
                  <a href="#">Hesabım</a>
                </li>
                <li>
                  <a href="#">Siparişlerim</a>
                </li>
                <li>
                  <a href="#">İade talepleri</a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Bilgi">
              <h4 className="ec-footer__col-title">Bilgi</h4>
              <ul className="ec-footer__col-list">
                <li>
                  <a href="#">Yardım</a>
                </li>
                <li>
                  <a href="#">İade ve değişim</a>
                </li>
                <li>
                  <a href="#">Sipariş takibi</a>
                </li>
                <li>
                  <a href="#">Sık sorulan sorular</a>
                </li>
              </ul>
            </nav>
            <nav aria-label="Popüler kategoriler">
              <h4 className="ec-footer__col-title">Popüler kategoriler</h4>
              <ul className="ec-footer__col-list">
                <li>
                  <a href="#">Kadın güneş gözlüğü</a>
                </li>
                <li>
                  <a href="#">Erkek güneş gözlüğü</a>
                </li>
                <li>
                  <a href="#">Mavi ışık gözlüğü</a>
                </li>
                <li>
                  <a href="#">Çocuk</a>
                </li>
                <li>
                  <a href="#">İndirim</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="ec-footer__bottom">
          <p className="ec-footer__bottom-tagline">D&amp;İ EYEWEAR her platformda yanınızda!</p>
          <div className="ec-footer__stores">
            <a className="ec-footer__store-btn" href="https://apps.apple.com" target="_blank" rel="noopener noreferrer">
              <BadgeAppStore />
              <span>App Store’dan indirin</span>
            </a>
            <a className="ec-footer__store-btn" href="https://play.google.com" target="_blank" rel="noopener noreferrer">
              <BadgePlay />
              <span>Google Play’den indirin</span>
            </a>
          </div>
          <p className="ec-footer__brand">ticimax</p>
        </div>
      </div>
    </footer>
  )
}
