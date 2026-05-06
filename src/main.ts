import './style.css'
import { mountBrandMarquee } from './brandMarqueeMount'
import { mountSiteFooter } from './footerMount'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <header class="topbar">
    <a href="#" class="brand" aria-label="D&I Eyewear home">
      <img src="/di-logo.png" alt="D&I Eyewear" class="brand-logo" />
    </a>

    <nav class="top-actions" aria-label="Quick actions">
      <div class="menu-dropdown">
        <button class="icon-btn menu-trigger" aria-label="Menü" aria-expanded="false" aria-controls="menu-panel">
          <span></span><span></span><span></span>
        </button>
        <aside id="menu-panel" class="contents-panel" aria-label="İçerikler">
          <h2 data-i18n="menu.contents">İçerikler</h2>
          <a href="#" class="contents-home-link" data-i18n="menu.home">Anasayfa</a>

          <section class="contents-group">
            <h3 data-i18n="menu.categories">Kategoriler</h3>
            <a href="#" class="category-link" data-category="kadin" data-i18n="menu.women">Kadın</a>
            <a href="#" class="category-link" data-category="erkek" data-i18n="menu.men">Erkek</a>
            <a href="#" class="category-link" data-category="cocuk" data-i18n="menu.kids">Çocuk</a>
          </section>

          <section class="contents-group">
            <h3 data-i18n="menu.popularBrands">Popüler Markalar</h3>
            <a href="#" class="popular-brand-link" data-brand="Ray-Ban">Ray-Ban</a>
            <a href="#" class="popular-brand-link" data-brand="Prada">Prada</a>
            <a href="#" class="popular-brand-link" data-brand="Persol">Persol</a>
            <a href="#" class="popular-brand-link" data-brand="Bottega Veneta">Bottega Veneta</a>
            <a href="#" class="popular-brand-link" data-brand="Olivio & Co">Olivio & Co</a>
            <a href="#" class="popular-brand-link" data-brand="Mess Frames">Mess Frames</a>
            <a href="#" class="popular-brand-link" data-brand="Miu Miu">Miu Miu</a>
            <a href="#" class="popular-brand-link" data-brand="Gast">Gast</a>
            <a href="#" class="popular-brand-link" data-brand="Gucci">Gucci</a>
            <a href="#" class="popular-brand-link" data-brand="Saint Laurent">Saint Laurent</a>
            <a href="#" class="popular-brand-link" data-brand="Loewe">Loewe</a>
            <a href="#" class="popular-brand-link" data-brand="Prada Linea Rossa">Prada Linea Rossa</a>
            <a href="#" class="popular-brand-link" data-brand="Dolce&Gabbana">Dolce&Gabbana</a>
            <a href="#" class="popular-brand-link" data-brand="Matsuda">Matsuda</a>
            <a href="#" class="popular-brand-link" data-brand="Hermossa">Hermossa</a>
            <a href="#" class="popular-brand-link" data-brand="Burberry">Burberry</a>
            <a href="#" class="popular-brand-link" data-brand="Off-White">Off-White</a>
            <a href="#" class="popular-brand-link" data-brand="Izipizi">Izipizi</a>
            <a href="#" class="popular-brand-link" data-brand="Roshambo Eyewear">Roshambo Eyewear</a>
            <a href="#" class="popular-brand-link" data-brand="Looklight">Looklight</a>
            <a href="#" class="popular-brand-link" data-brand="Babiators">Babiators</a>
            <a href="#" class="popular-brand-link" data-brand="Kietla">Kietla</a>
          </section>

          <section class="contents-group">
            <h3 data-i18n="menu.help">Yardım & Destek</h3>
            <a href="#" class="support-open" data-i18n="menu.contact">İletişim</a>
            <a href="#" class="orders-open" data-i18n="menu.orderTracking">Sipariş Takibi</a>
          </section>
        </aside>
      </div>
      <div class="top-search" id="top-search">
        <label class="search-wrap" aria-label="Ürün ara">
          <span class="search-icon">⌕</span>
          <input
            type="search"
            id="top-product-search"
            autocomplete="off"
            placeholder="Ürün ara..."
            data-i18n-placeholder="top.searchPlaceholder"
          />
        </label>
        <div id="top-search-results" class="top-search-results" role="listbox" aria-label="Arama sonuçları" hidden></div>
      </div>
      <div class="account-menu-wrap">
        <button type="button" class="text-link auth-open" aria-label="Üye Girişi / Üye Ol">Üye Girişi / Üye Ol</button>
        <div class="account-menu" id="account-menu" aria-hidden="true">
          <button type="button" class="account-menu-logout" id="top-logout-btn">Çıkış Yap</button>
        </div>
      </div>
      <a href="#" class="icon-link favorites-open" aria-label="Favoriler">&#9825;</a>
      <div class="top-order-actions" role="group" aria-label="Sipariş kısayolları">
        <button type="button" class="icon-link icon-link--labeled orders-open" aria-label="Tüm siparişlerim">
          <span class="icon-link-label-text" data-i18n="top.myOrders">Tüm Siparişlerim</span>
        </button>
      </div>
      <button type="button" class="icon-link cart-open" aria-label="Sepetim">🛒<span id="cart-badge" class="cart-badge">0</span></button>
    </nav>
  </header>

  <aside id="cart-panel" class="cart-panel" aria-label="Sepetim">
    <div class="cart-head">
      <h2>Sepetim</h2>
      <button type="button" id="cart-close-btn" class="cart-close-btn" aria-label="Sepeti kapat">×</button>
    </div>
    <div id="cart-items" class="cart-items"></div>
    <div class="cart-footer">
      <strong>Ara Toplam: <span id="cart-total">0 TL</span></strong>
      <button type="button" class="cart-checkout-btn">SEPETE GIT</button>
    </div>
  </aside>

  <main class="hero-content">
    <section class="hero-banner">
      <img src="/hero-banner.png" alt="Ray-Ban koleksiyonu banner" class="hero-banner-image" />
      <div class="hero-overlay">
        <p class="caption" data-i18n="hero.caption">Minimal ve Zamansız</p>
        <h1 data-i18n="hero.title">Kadın, Erkek ve Çocuk Gözlük Modelleri</h1>
        <p class="intro">
          <span data-i18n="hero.intro">Kadın, erkek ve çocuk seçkimizde siyahın asaleti beyazın yalınlığıyla buluşuyor. Gün boyu konfor sunan premium çerçevelerle stilinizi rafine bir dokunuşla tamamlayın.</span>
        </p>
        <a href="#" class="cta" data-i18n="hero.cta">Alışverişe Başla</a>
      </div>
    </section>
  </main>

  <section id="category-section" class="category-section">
    <div class="category-head">
      <h2 id="category-title">KADIN GÜNEŞ GÖZLÜKLERİ</h2>
      <label class="stock-toggle">
        <input type="checkbox" />
        <span>Tükenenleri Gösterme</span>
      </label>
    </div>
    <div class="category-filters">
      <select id="filter-brand"><option value="">Marka</option></select>
      <select id="filter-shape"><option value="">Çerçeve Şekli</option></select>
      <select id="filter-frame-color"><option value="">Çerçeve Rengi</option></select>
      <select id="filter-lens-size"><option value="">Cam Ölçüsü</option></select>
      <select id="filter-price-range"><option value="">Fiyat Aralığı</option></select>
      <select id="filter-recommended"><option value="">Önerilen</option></select>
    </div>
    <div id="category-products" class="category-products"></div>
  </section>

  <div class="home-shop-ribbon">
    <div id="brand-marquee-root"></div>

    <div class="home-bestsellers-block">
    <section class="best-sellers" aria-label="Cok Satanlar">
      <div class="best-sellers-head">
        <h2>🔥 Çok Satanlar</h2>
        <a href="#" class="see-all">Tümünü Gör</a>
      </div>
      <div class="best-sellers-grid" id="best-sellers-grid"></div>
    </section>

    </div>

    <div id="home-bestsellers-footer-root" class="home-bestsellers-footer-wrap" aria-label="Site alt bilgi"></div>
  </div>

  <section id="account-section" class="account-section">
    <aside class="account-sidebar">
      <button type="button" class="account-nav-item account-home-btn">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 4l9 5.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V9.5z"/></svg></span>
        <span class="account-nav-text">Ana Sayfa</span>
      </button>
      <a href="#" class="account-nav-item profile-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.5"/><path d="M5 20a7 7 0 0 1 14 0"/></svg></span>
        <span class="account-nav-text">Hesap Ayarlarım</span>
      </a>
      <a href="#" class="account-nav-item orders-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 1 0 6 8c0 7-3 7-3 7h18s-3 0-3-7"/><path d="M13.7 21a2 2 0 0 1-3.4 0"/></svg></span>
        <span class="account-nav-text">Siparişlerim</span>
      </a>
      <a href="#" class="account-nav-item return-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/></svg></span>
        <span class="account-nav-text">İade Taleplerim</span>
      </a>
      <a href="#" class="account-nav-item cancel-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.5 9a9 9 0 0 1 14.9-3.4L23 10M1 14l4.6 4.4A9 9 0 0 0 20.5 15"/></svg></span>
        <span class="account-nav-text">İptal Taleplerim</span>
      </a>
      <a href="#" class="account-nav-item cart-page-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M1 1h4l1.7 10.4A2 2 0 0 0 8.6 14H19a2 2 0 0 0 2-1.6L23 6H6"/></svg></span>
        <span class="account-nav-text">Alışveriş Sepetim</span>
      </a>
      <a href="#" class="account-nav-item favorites-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z"/></svg></span>
        <span class="account-nav-text">Favorilerim</span>
      </a>
      <a href="#" class="account-nav-item address-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span>
        <span class="account-nav-text">Adres Defterim</span>
      </a>
      <a href="#" class="account-nav-item reviews-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-3 3v-3H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M13 8H7M17 12H7"/><path d="M18 3h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1l-2 2V8h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2z"/></svg></span>
        <span class="account-nav-text">Yorumlarım</span>
      </a>
      <a href="#" class="account-nav-item wishlist-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7L12 12l8.7-5M12 22V12"/></svg></span>
        <span class="account-nav-text">İstek Listelerim</span>
      </a>
      <a href="#" class="account-nav-item price-alarm-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg></span>
        <span class="account-nav-text">Fiyat Alarm Listem</span>
      </a>
      <a href="#" class="account-nav-item gift-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/></svg></span>
        <span class="account-nav-text">Para Puan / Hediye Çeki</span>
      </a>
      <a href="#" class="account-nav-item support-open">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1"/></svg></span>
        <span class="account-nav-text">Destek Taleplerim</span>
      </a>
      <button type="button" id="logout-btn" class="account-nav-item logout-btn">
        <span class="account-nav-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg></span>
        <span class="account-nav-text">Güvenli Çıkış</span>
      </button>
    </aside>

    <div class="account-main">
      <h2 class="account-title">MERHABA <span id="account-name">MİSAFİR</span></h2>
      <p class="account-subtitle">HOŞGELDİNİZ</p>
      <p class="account-text">
        "Hesabım" sayfasından siparişlerinizi ve arıza/iade/değişim işlemlerinizi takip edebilir,
        kazandığınız hediye çeki ve puanları görüntüleyebilir, üyelik bilgisi güncelleme, şifre ve
        adres değişikliği gibi hesap ayarlarınızı kolayca yapabilirsiniz.
      </p>
      <div class="account-cards">
        <article class="account-card support-open"><span>◉</span><p>Destek Taleplerim</p></article>
        <article class="account-card orders-open"><span>🔔</span><p>Siparişlerim</p></article>
        <article class="account-card profile-open"><span>👤</span><p>Üyelik Bilgilerim</p></article>
        <article class="account-card address-open"><span>📍</span><p>Adres Defterim</p></article>
        <article class="account-card gift-open"><span>💵</span><p>Hediye Çeklerim</p></article>
        <article class="account-card return-open"><span>↻</span><p>İade Taleplerim</p></article>
        <article class="account-card cancel-open"><span>⊘</span><p>İptal Taleplerim</p></article>
        <article class="account-card reviews-open"><span>💬</span><p>Yorumlarım</p></article>
        <article class="account-card wishlist-open"><span>📋</span><p>İstek Listelerim</p></article>
        <article class="account-card cart-page-open"><span>🛒</span><p>Alışveriş Sepetim</p></article>
      </div>
      <div class="account-fab-stack wishlist-fab-stack">
        <a class="wishlist-fab wishlist-fab-whatsapp" href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        </a>
        <button type="button" class="wishlist-fab wishlist-fab-top" id="account-dashboard-scroll-top" aria-label="Sayfanın başına dön">
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
        </button>
      </div>
    </div>
    <div class="account-dashboard-footer" aria-label="Site footer">
      <div id="account-dashboard-footer-root"></div>
    </div>
  </section>

  <section id="orders-section" class="orders-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <div class="orders-head">
      <h2>Siparislerim</h2>
    </div>
    <div id="orders-list" class="orders-list"></div>
  </section>

  <section id="favorites-section" class="favorites-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <div class="favorites-head">
      <h2>Favorilerim</h2>
    </div>
    <div id="favorites-list" class="favorites-list"></div>
  </section>

  <section id="price-alarm-section" class="stock-alarm-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <div class="favorites-head">
      <h2>Fiyat Alarm Listem</h2>
    </div>
    <div class="stock-alarm-panel">
      <p class="stock-alarm-hint">
        Ürün seçin ve takip etmek istediğiniz hedef fiyatı (TL) girin. Örnek kampanya fiyatı, hedefin altına indiğinde satır vurgulanır (örnek gösterim).
      </p>
      <form id="price-alarm-form" class="stock-alarm-form">
        <label>
          <span>Ürün</span>
          <select id="price-alarm-product" required></select>
        </label>
        <label>
          <span>Hedef fiyat (TL ve altı için uyar)</span>
          <input type="number" id="price-alarm-target" min="1" step="1" placeholder="örn. 5000" required />
        </label>
        <button type="submit" class="stock-alarm-add-btn">Ekle</button>
      </form>
      <p id="price-alarm-form-status" class="stock-alarm-form-status" role="status"></p>
    </div>
    <div id="price-alarm-list" class="favorites-list"></div>
  </section>

  <section id="admin-section" class="admin-section">
    <div class="admin-layout">
      <aside class="admin-sidebar" aria-label="Yönetim menüsü">
        <h2 class="admin-sidebar-title">Yönetim</h2>
        <button type="button" class="admin-nav active" data-admin-tab="dashboard">1. Özet</button>
        <button type="button" class="admin-nav" data-admin-tab="products">2. Ürün & Stok</button>
        <button type="button" class="admin-nav" data-admin-tab="orders">3. Sipariş</button>
        <button type="button" class="admin-nav" data-admin-tab="customers">4. Müşteri</button>
        <button type="button" class="admin-nav" data-admin-tab="marketing">5. Pazarlama</button>
        <button type="button" class="admin-nav" data-admin-tab="finance">6. Ödeme & Finans</button>
        <button type="button" class="admin-nav" data-admin-tab="cms">7. İçerik (CMS)</button>
        <button type="button" class="admin-site-back" id="admin-close-btn">Siteye dön</button>
      </aside>
      <div class="admin-main">
        <div id="admin-login-gate" class="admin-login-gate">
          <h3>Panel girişi</h3>
          <form id="admin-login-form" novalidate>
          <label class="admin-token-label">
            <span>E-posta</span>
            <input type="email" id="admin-login-email" name="email" autocomplete="username" required />
          </label>
          <label class="admin-token-label">
            <span>Şifre</span>
            <input type="password" id="admin-login-password" name="password" autocomplete="current-password" required />
          </label>
          <button type="submit" class="admin-token-save" id="admin-login-submit">Giriş yap</button>
          </form>
          <p id="admin-login-status" class="admin-login-status" role="status"></p>
        </div>
        <div id="admin-panel-body" class="admin-panel-body" style="display: none">
          <div class="admin-tab-panes">
            <div class="admin-tab-pane active" data-admin-pane="dashboard">
              <h2 class="admin-pane-title">Özet ekranı</h2>
              <div id="admin-stats" class="admin-stats"></div>
              <div class="admin-charts">
                <div class="admin-chart-card">
                  <h3>Günlük gelir (son 14 gün)</h3>
                  <div id="admin-chart-day" class="admin-chart-bars"></div>
                </div>
                <div class="admin-chart-card">
                  <h3>Haftalık gelir (4 hafta)</h3>
                  <div id="admin-chart-week" class="admin-chart-bars"></div>
                </div>
                <div class="admin-chart-card">
                  <h3>Aylık gelir (6 ay)</h3>
                  <div id="admin-chart-month" class="admin-chart-bars"></div>
                </div>
              </div>
              <div class="admin-alerts">
                <h3>Hızlı uyarılar</h3>
                <div id="admin-alerts-body"></div>
              </div>
            </div>
            <div class="admin-tab-pane" data-admin-pane="products">
              <h2 class="admin-pane-title">Ürün ve stok yönetimi</h2>
              <div class="admin-bulk-row">
                <label>Toplu fiyat (%)<input type="number" id="admin-bulk-percent" step="0.1" placeholder="örn: 5" /></label>
                <button type="button" id="admin-bulk-price-btn" class="admin-btn secondary">Tüm fiyatları güncelle</button>
                <button type="button" id="admin-sync-catalog-btn" class="admin-btn">Katalogu yeniden senkronla</button>
              </div>
              <p class="admin-excel-hint" id="admin-excel-hint"></p>
              <div class="admin-table-wrap">
                <table class="admin-table" id="admin-products-table">
                  <thead>
                    <tr>
                      <th>Marka</th>
                      <th>Model</th>
                      <th>Kategori</th>
                      <th>Fiyat</th>
                      <th>Stok</th>
                      <th>KDV %</th>
                      <th>Varyant (JSON)</th>
                      <th>Dijital URL</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="admin-products-body"></tbody>
                </table>
              </div>
            </div>
            <div class="admin-tab-pane" data-admin-pane="orders">
              <h2 class="admin-pane-title">Sipariş ve sevkiyat</h2>
              <div class="admin-table-wrap admin-table-wrap--wide">
                <table class="admin-table" id="admin-orders-table">
                  <thead>
                    <tr>
                      <th>Sipariş</th>
                      <th>Müşteri</th>
                      <th>Tarih</th>
                      <th>Tutar</th>
                      <th>Durum</th>
                      <th>Takip no</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="admin-orders-body"></tbody>
                </table>
              </div>
              <p class="admin-invoice-hint" id="admin-invoice-hint"></p>
            </div>
            <div class="admin-tab-pane" data-admin-pane="customers">
              <h2 class="admin-pane-title">Müşteri ve üyelik yönetimi</h2>
              <h3>Müşteri kartları</h3>
              <div class="admin-table-wrap admin-table-wrap--wide">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Müşteri</th>
                      <th>Sipariş</th>
                      <th>Toplam harcama</th>
                      <th>Sepet (kalem)</th>
                      <th>Sepet özeti</th>
                      <th>Grup</th>
                      <th>İndirim %</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="admin-customers-body"></tbody>
                </table>
              </div>
              <h3>Yorum ve puan yönetimi</h3>
              <div class="admin-table-wrap admin-table-wrap--wide">
                <table class="admin-table">
                  <thead>
                    <tr>
                      <th>Tarih</th>
                      <th>Müşteri</th>
                      <th>SKU</th>
                      <th>Puan</th>
                      <th>Yorum</th>
                      <th>Durum</th>
                      <th>Yanıt</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody id="admin-reviews-body"></tbody>
                </table>
              </div>
            </div>
            <div class="admin-tab-pane" data-admin-pane="marketing">
              <h2 class="admin-pane-title">Pazarlama ve promosyon</h2>
              <div class="admin-two-col">
                <div class="admin-col-card">
                  <h3>Kupon kodları</h3>
                  <div class="admin-form-row">
                    <label>Kod<input type="text" id="admin-coupon-code" placeholder="YIL2026" /></label>
                    <label>Tür
                      <select id="admin-coupon-kind"><option value="percent">Yüzde</option><option value="fixed">Tutar (TL)</option></select>
                    </label>
                    <label>Değer<input type="number" id="admin-coupon-value" step="0.01" min="0" /></label>
                    <label>Min. sepet (TL)<input type="number" id="admin-coupon-min" step="0.01" min="0" value="0" /></label>
                    <label>Bitiş (isteğe)<input type="date" id="admin-coupon-expires" /></label>
                  </div>
                  <button type="button" class="admin-btn secondary" id="admin-coupon-add">Kupon kaydet</button>
                  <div class="admin-table-wrap">
                    <table class="admin-table"><tbody id="admin-coupons-body"></tbody></table>
                  </div>
                </div>
                <div class="admin-col-card">
                  <h3>Kampanya kurguları</h3>
                  <div id="admin-campaigns-editor"></div>
                  <button type="button" class="admin-btn" id="admin-save-marketing-btn">Kampanyaları kaydet</button>
                  <h3>Sepet hatırlatma</h3>
                  <p id="admin-cart-reminder-status" class="admin-muted"></p>
                  <label class="admin-inline-label">Sepet en az şu saatten eski olsun
                    <input type="number" id="admin-cart-reminder-hours" min="1" value="24" style="width: 4rem" /> saat
                  </label>
                  <div class="admin-btn-row">
                    <button type="button" class="admin-btn secondary" id="admin-cart-reminder-dry">Önizle</button>
                    <button type="button" class="admin-btn" id="admin-cart-reminder-send">E-posta gönder</button>
                  </div>
                </div>
              </div>
            </div>
            <div class="admin-tab-pane" data-admin-pane="finance">
              <h2 class="admin-pane-title">Ödeme ve finans</h2>
              <div class="admin-form-block">
                <h3>Ödeme yöntemleri</h3>
                <label>Sanal POS (Iyzico / PayTR)<input type="text" id="admin-pay-provider" placeholder="boş veya iyzico" /></label>
                <label class="admin-check"><input type="checkbox" id="admin-pay-bank" /> Havale / EFT</label>
                <label class="admin-check"><input type="checkbox" id="admin-pay-cod" /> Kapıda ödeme</label>
                <textarea id="admin-pay-notes" class="admin-textarea" rows="2" placeholder="Notlar (müşteriye gösterilecek metin vb.)"></textarea>
                <button type="button" class="admin-btn" id="admin-save-payment-btn">Ödeme ayarlarını kaydet</button>
              </div>
              <div class="admin-form-block">
                <h3>Taksit ve varsayılan KDV</h3>
                <p class="admin-muted">Taksit JSON örneği: <code>[{"label":"Genel","maxInstallment":6,"commissionPercent":2.8}]</code></p>
                <textarea id="admin-installments-json" class="admin-textarea" rows="4"></textarea>
                <label>Varsayılan KDV % (yeni ürünler için referans)<input type="number" id="admin-default-vat" min="0" max="100" value="20" /></label>
                <button type="button" class="admin-btn" id="admin-save-finance-btn">Finans ayarlarını kaydet</button>
              </div>
            </div>
            <div class="admin-tab-pane" data-admin-pane="cms">
              <h2 class="admin-pane-title">Tasarım ve içerik (CMS)</h2>
              <p class="admin-tools-intro">Ana sayfa slider / banner, blog yazıları ve zorunlu kurumsal sayfalar.</p>
              <div class="admin-form-block">
                <h3>Banner / slider</h3>
                <div class="admin-form-row">
                  <label>Başlık<input type="text" id="admin-banner-title" /></label>
                  <label>Görsel URL<input type="url" id="admin-banner-image" placeholder="/hero/slide1.jpg" /></label>
                  <label>Link<input type="url" id="admin-banner-link" placeholder="https://" /></label>
                  <label>Sıra<input type="number" id="admin-banner-sort" value="0" /></label>
                </div>
                <label class="admin-check"><input type="checkbox" id="admin-banner-active" checked /> Yayında</label>
                <button type="button" class="admin-btn secondary" id="admin-banner-add">Banner ekle</button>
                <div class="admin-table-wrap">
                  <table class="admin-table">
                    <thead><tr><th>Sıra</th><th>Başlık</th><th>Görsel</th><th>Link</th><th>Aktif</th><th></th></tr></thead>
                    <tbody id="admin-banners-body"></tbody>
                  </table>
                </div>
              </div>
              <div class="admin-form-block">
                <h3>Blog</h3>
                <div class="admin-form-row">
                  <label>Başlık<input type="text" id="admin-blog-title" /></label>
                  <label>Slug (boşsa otomatik)<input type="text" id="admin-blog-slug" placeholder="ornek-yazi" /></label>
                </div>
                <textarea id="admin-blog-excerpt" class="admin-textarea" rows="2" placeholder="Özet"></textarea>
                <textarea id="admin-blog-body" class="admin-textarea" rows="5" placeholder="İçerik (HTML/markdown — vitrine göre işlenir)"></textarea>
                <label class="admin-check"><input type="checkbox" id="admin-blog-published" /> Yayınla</label>
                <button type="button" class="admin-btn secondary" id="admin-blog-add">Yazı oluştur</button>
                <div class="admin-table-wrap">
                  <table class="admin-table">
                    <thead><tr><th>Başlık</th><th>Slug</th><th>Yayın</th><th></th></tr></thead>
                    <tbody id="admin-blog-body-rows"></tbody>
                  </table>
                </div>
              </div>
              <div class="admin-form-block">
                <h3>Kurumsal sayfalar</h3>
                <label>Sayfa
                  <select id="admin-cms-page-slug"></select>
                </label>
                <label>Başlık<input type="text" id="admin-cms-page-title" /></label>
                <textarea id="admin-cms-page-body" class="admin-textarea" rows="8"></textarea>
                <button type="button" class="admin-btn" id="admin-cms-page-save">Sayfayı kaydet</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="shopping-cart-section" class="shopping-cart-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <div class="shopping-cart-layout">
      <div class="shopping-cart-main">
        <div class="shopping-cart-head">
          <h2>Sepet (<span id="shopping-cart-count">0</span>)</h2>
          <button type="button" id="shopping-cart-clear" class="shopping-cart-clear">Sepeti Temizle</button>
        </div>
        <div id="shopping-cart-shipping" class="shopping-cart-shipping">Ucretsiz kargo hakkiniz sepetinize uygulandi</div>
        <div id="shopping-cart-items" class="shopping-cart-items"></div>
      </div>
      <aside class="shopping-cart-summary">
        <h3>Siparis Ozeti</h3>
        <div class="shopping-cart-summary-row"><span>Sepet Tutari</span><strong id="shopping-cart-subtotal">0,00 TL</strong></div>
        <div class="shopping-cart-summary-row"><span>Kargo Ucreti</span><strong id="shopping-cart-shipping-price">0,00 TL</strong></div>
        <div class="shopping-cart-summary-row shopping-cart-summary-row--total"><span>Toplam Tutar</span><strong id="shopping-cart-total">0,00 TL</strong></div>
        <button type="button" class="shopping-cart-complete">Alisverisi Tamamla</button>
      </aside>
    </div>
  </section>

  <section id="product-detail-section" class="product-detail-section">
    <button type="button" id="product-detail-back" class="product-detail-back">← Urunlere Don</button>
    <div class="product-detail-layout">
      <div class="product-detail-gallery">
        <div id="product-detail-image-wrap" class="product-detail-image-wrap">
          <img id="product-detail-image" src="" alt="Urun gorseli" />
        </div>
      </div>
      <aside class="product-detail-info">
        <h2 id="product-detail-brand">Marka</h2>
        <p id="product-detail-model" class="product-detail-model">Model</p>
        <p id="product-detail-price" class="product-detail-price">0 TL</p>
        <ul class="product-detail-specs">
          <li><span>Ekartman</span><strong id="product-detail-ekartman">-</strong></li>
          <li><span>Cerceve Rengi</span><strong id="product-detail-frame-color">-</strong></li>
          <li><span>Kopru Uzunlugu</span><strong id="product-detail-bridge">-</strong></li>
          <li><span>Sap Uzunlugu</span><strong id="product-detail-temple">-</strong></li>
          <li><span>Cam Olcusu</span><strong id="product-detail-lens-size">-</strong></li>
          <li><span>Fiyat Araligi</span><strong id="product-detail-price-range">-</strong></li>
          <li><span>Onerilen</span><strong id="product-detail-recommended">-</strong></li>
          <li><span>Cam Turu</span><strong id="product-detail-lens-type">-</strong></li>
          <li><span>Cam Rengi</span><strong id="product-detail-lens-color">-</strong></li>
          <li><span>Cerceve Sekli</span><strong id="product-detail-frame-shape">-</strong></li>
          <li><span>Cerceve Materyali</span><strong id="product-detail-frame-material">-</strong></li>
          <li><span>Model Yili</span><strong id="product-detail-year">-</strong></li>
        </ul>
        <button type="button" id="product-detail-add-cart" class="product-detail-add-cart">Sepete Ekle</button>
      </aside>
    </div>
  </section>

  <div id="checkout-modal" class="checkout-modal" aria-hidden="true" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
    <div class="checkout-modal__backdrop" data-close-checkout></div>
    <div class="checkout-modal__panel">
      <div class="checkout-modal__head">
        <h2 id="checkout-title">Siparis Onayi</h2>
        <button type="button" class="checkout-modal__close" data-close-checkout aria-label="Kapat">×</button>
      </div>
      <form id="checkout-form" class="checkout-form">
        <label><span>Kart Uzerindeki Isim</span><input id="checkout-name" type="text" placeholder="Ad Soyad" required /></label>
        <label><span>Kart Numarasi</span><input id="checkout-card-number" type="text" inputmode="numeric" placeholder="0000 0000 0000 0000" maxlength="19" required /></label>
        <div class="checkout-form-row">
          <label><span>SKT (AA/YY)</span><input id="checkout-expiry" type="text" placeholder="12/29" maxlength="5" required /></label>
          <label><span>CVV</span><input id="checkout-cvv" type="password" inputmode="numeric" placeholder="123" maxlength="4" required /></label>
        </div>
        <label class="checkout-terms">
          <input id="checkout-terms" type="checkbox" />
          <span>On bilgilendirme ve mesafeli satis sozlesmesini onayliyorum.</span>
        </label>
        <p class="checkout-total">Odenecek Tutar: <strong id="checkout-total">0,00 TL</strong></p>
        <button type="submit" class="checkout-confirm-btn">Onayla ve Siparisi Tamamla</button>
        <p id="checkout-status" class="checkout-status"></p>
      </form>
    </div>
  </div>

  <section id="gift-section" class="gift-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <h2>Para Puan / Hediye Çeki</h2>

    <div class="gift-balance-cards">
      <article class="gift-balance-card gift-balance-card--blue">
        <span class="gift-balance-icon">☆</span>
        <div>
          <strong id="gift-total-points">0</strong>
          <p>Toplam Puanınız</p>
        </div>
      </article>
      <article class="gift-balance-card gift-balance-card--green">
        <span class="gift-balance-icon">💵</span>
        <div>
          <strong><span id="gift-total-amount">0</span> ₺</strong>
          <p>₺ Karşılığı</p>
        </div>
      </article>
    </div>

    <p class="gift-warning">Kural: 1 para puan = 1 TL. Kupon oluşturmak için minimum 20 puan gerekir.</p>

    <form id="gift-create-form" class="gift-create-form">
      <label for="gift-amount-input">Kaç ₺ değerinde kupon oluşturulsun?</label>
      <input id="gift-amount-input" type="number" min="20" step="10" value="20" />
      <button type="submit">Hediye Çeki Oluştur</button>
    </form>

    <p class="gift-helper">Örnek: 40 puanın varsa en fazla 40 TL kupon oluşturabilirsin.</p>
    <div id="gift-status" class="gift-status"></div>

    <div class="gift-campaigns">
      <h3>Sana Özel Fırsatlar</h3>
      <div class="gift-campaign-grid">
        <article class="gift-campaign-card">
          <p class="gift-campaign-title">İlk Siparişe Hoş Geldin</p>
          <p class="gift-campaign-desc">İlk alışverişinde <strong>DEFIL200</strong> kodu ile 200 TL indirim kazan.</p>
          <span class="gift-campaign-badge">Kod: DEFIL200</span>
        </article>
        <article class="gift-campaign-card">
          <p class="gift-campaign-title">2. Ürüne Sepette %15</p>
          <p class="gift-campaign-desc">Aynı siparişte ikinci güneş gözlüğünde otomatik %15 sepet indirimi.</p>
          <span class="gift-campaign-badge">Otomatik Uygulanır</span>
        </article>
        <article class="gift-campaign-card">
          <p class="gift-campaign-title">Doğum Günü Sürprizi</p>
          <p class="gift-campaign-desc">Doğum gününe özel tek kullanımlık 250 TL indirim kuponu tanımlanır.</p>
          <span class="gift-campaign-badge">Kişiye Özel</span>
        </article>
        <article class="gift-campaign-card">
          <p class="gift-campaign-title">Arkadaşını Davet Et</p>
          <p class="gift-campaign-desc">Arkadaşın ilk alışverişini tamamladığında hesabına 150 para puan yüklenir.</p>
          <span class="gift-campaign-badge">+150 Puan</span>
        </article>
      </div>
    </div>
  </section>

  <section id="return-section" class="return-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <div class="return-head">
      <button type="button" id="return-cancel-btn" class="return-cancel-btn">Vazgeç</button>
    </div>

    <div class="return-filter">
      <label for="return-order-select">Sipariş No</label>
      <select id="return-order-select">
        <option value="">Seçiniz</option>
      </select>
    </div>

    <div class="return-empty">
      <div class="return-empty-icon">↻</div>
      <h3>Geçmiş İade Kaydı Bulunamadı</h3>
      <p>Şu anda oluşturduğunuz iade kaydı bulunamamaktadır.</p>
      <button type="button" id="return-shop-btn" class="return-shop-btn">Alışverişe Başla</button>
    </div>
  </section>

  <section id="cancel-section" class="cancel-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <div class="cancel-info-bar">
      <p>Bu sayfadan sipariş iptali yapılmaktadır, mevcut taleplerinizin durumunu anlık olarak takip edebilirsiniz.</p>
      <p>Süreçle ilgili her adımda size e-posta veya SMS ile bilgi vereceğiz.</p>
    </div>
    <div id="cancel-toolbar" class="cancel-toolbar">
      <button type="button" id="cancel-new-request-btn" class="cancel-new-request-btn">Yeni Talep Oluştur</button>
    </div>
    <div id="cancel-form-panel" class="cancel-form-panel" style="display: none">
      <form id="cancel-request-form" class="cancel-request-form">
        <div class="cancel-form-panel-head">
          <button type="button" id="cancel-form-dismiss" class="cancel-vazgec-btn">Vazgeç</button>
        </div>
        <label class="cancel-order-label" for="cancel-order-select">Sipariş No</label>
        <select id="cancel-order-select" name="cancelOrder" required>
          <option value="">Seçiniz</option>
        </select>
        <button type="submit" class="cancel-submit-btn">Talebi Gönder</button>
      </form>
    </div>
    <div id="cancel-empty" class="cancel-empty">
      <div class="cancel-empty-icon" aria-hidden="true">↺</div>
      <h3 class="cancel-empty-title">Geçmiş İptal Kaydı Bulunamadı</h3>
      <p class="cancel-empty-text">Şu anda oluşturduğunuz iptal kaydı bulunamamaktadır.</p>
      <button type="button" id="cancel-shop-btn" class="cancel-shop-btn">Alışverişe Başla</button>
    </div>
    <div id="cancel-list-wrap" class="cancel-list-wrap" style="display: none">
      <h3 class="cancel-list-heading">İptal taleplerim</h3>
      <ul id="cancel-list" class="cancel-list"></ul>
    </div>
  </section>

  <section id="reviews-section" class="reviews-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <h2 class="reviews-section-title">Yorumlarım</h2>
    <div class="reviews-empty-card">
      <div class="reviews-empty-icon" aria-hidden="true">
        <svg class="reviews-empty-svg" viewBox="0 0 64 64" width="72" height="72" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 22h20a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H28l-8 6v-6h-2a4 4 0 0 1-4-4V26a4 4 0 0 1 4-4z" />
          <path d="M36 18h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3h-4l-4 3v-3h-2" />
        </svg>
      </div>
      <p class="reviews-empty-heading">Yorumunuz Bulunmamaktadır.</p>
      <button type="button" id="reviews-shop-btn" class="reviews-shop-btn">Alışverişe Başla</button>
    </div>
  </section>

  <section id="wishlist-section" class="wishlist-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <h2 class="wishlist-page-title">İstek Listelerim</h2>
    <form id="wishlist-form" class="wishlist-form">
      <label class="wishlist-field">
        <span>Önem Derecesi</span>
        <select id="wishlist-importance" required>
          <option value="">Önem Derecesi Seçiniz</option>
          <option value="Düşük">Düşük</option>
          <option value="Normal">Normal</option>
          <option value="Yüksek">Yüksek</option>
          <option value="Kritik">Kritik</option>
        </select>
      </label>
      <div class="wishlist-field">
        <span class="wishlist-field-span">Tarih</span>
        <div class="wishlist-date-row">
          <label class="wishlist-date-part">
            <span class="wishlist-sublabel">Gün</span>
            <select id="wishlist-day" required></select>
          </label>
          <label class="wishlist-date-part">
            <span class="wishlist-sublabel">Ay</span>
            <select id="wishlist-month" required></select>
          </label>
          <label class="wishlist-date-part">
            <span class="wishlist-sublabel">Yıl</span>
            <select id="wishlist-year" required></select>
          </label>
        </div>
      </div>
      <label class="wishlist-field">
        <span>Tanım</span>
        <input type="text" id="wishlist-title" autocomplete="off" required />
      </label>
      <label class="wishlist-field">
        <span>Açıklama</span>
        <textarea id="wishlist-desc" rows="3"></textarea>
      </label>
      <label class="wishlist-check"><input type="checkbox" id="wishlist-default" /> Varsayılan</label>
      <label class="wishlist-check"><input type="checkbox" id="wishlist-active" checked /> Aktif</label>
      <div class="wishlist-form-actions">
        <button type="button" id="wishlist-vazgec" class="wishlist-btn-vazgec">Vazgeç</button>
        <button type="submit" class="wishlist-btn-kaydet">Kaydet</button>
      </div>
    </form>
    <div class="wishlist-table-wrap">
      <table class="wishlist-table">
        <thead>
          <tr>
            <th class="wishlist-th-check"><input type="checkbox" disabled aria-label="Seç" /></th>
            <th>Tanım</th>
            <th>Durum</th>
            <th>Önem Derecesi</th>
            <th class="wishlist-th-action"></th>
          </tr>
        </thead>
        <tbody id="wishlist-table-body"></tbody>
      </table>
    </div>
    <div class="wishlist-page-footer" aria-label="Site footer">
      <div id="wishlist-footer-root"></div>
    </div>
    <div class="wishlist-fab-stack">
      <a class="wishlist-fab wishlist-fab-whatsapp" href="https://wa.me/905555555555" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp ile yazın">
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
      </a>
      <button type="button" class="wishlist-fab wishlist-fab-top" id="wishlist-scroll-top" aria-label="Sayfanın başına dön">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
      </button>
    </div>
  </section>

  <section id="support-section" class="support-section">
    <button type="button" id="support-back-btn" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <h2>İletişim</h2>
    <div class="support-contact-card" aria-label="İletişim bilgileri">
      <p class="support-contact-line">
        <strong>E-posta:</strong>
        <a href="mailto:ilaydaDefne@gmail.com">ilaydaDefne@gmail.com</a>
      </p>
      <p class="support-contact-line">
        <strong>Tel:</strong>
        <a href="tel:+905331233333">+905331233333</a>
      </p>
    </div>
  </section>

  <section id="profile-section" class="profile-section">
    <button type="button" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <h2>Üyelik Bilgilerim</h2>
    <form class="profile-form">
      <div class="profile-grid">
        <label><span>Adınız*</span><input type="text" value="İlayda" /></label>
        <label>
          <span>Şehir</span>
          <div class="city-dropdown" id="city-dropdown">
            <button type="button" id="profile-city-trigger" class="city-trigger">Şehir Seçiniz</button>
            <ul id="profile-city-menu" class="city-menu"></ul>
            <input type="hidden" id="profile-city" />
          </div>
        </label>
        <label><span>Soyadınız*</span><input type="text" value="Can" /></label>
        <label><span>İlçe</span><select id="profile-district"><option>İlçe Seçiniz</option></select></label>
        <label><span>Cep Telefonunuz*</span><input type="text" value="+90" /></label>
        <label><span>E-posta Adresiniz</span><input type="email" value="ilaydacanns00@gmail.com" /></label>
        <label><span>Meslek</span><input type="text" /></label>
      </div>
      <label class="profile-gender">
        <span>Cinsiyet</span>
        <div>
          <label><input type="radio" name="gender" /> Kadın</label>
          <label><input type="radio" name="gender" /> Erkek</label>
          <label><input type="radio" name="gender" checked /> Belirtmek İstemiyorum</label>
        </div>
      </label>
      <div class="profile-checkboxes">
        <label><input type="checkbox" /> Kampanya, duyuru, bilgilendirmelerden e-posta ile haberdar olmak istiyorum.</label>
        <label><input type="checkbox" /> Kampanya, duyuru, bilgilendirmelerden sms ile haberdar olmak istiyorum.</label>
      </div>
      <div class="profile-actions">
        <button type="button" class="profile-delete">Üyelik Bilgilerimi Sil</button>
        <button type="submit" class="profile-save">Kaydet</button>
      </div>
    </form>
  </section>

  <section id="address-section" class="address-section">
    <button type="button" id="address-back-btn" class="support-back-btn section-back-btn" data-back-target="account" aria-label="Geri dön">← Geri</button>
    <button type="button" class="address-new-btn address-create-open">Yeni Ekle</button>
    <div class="address-empty" id="address-empty">
      <div class="address-empty-icon">📍</div>
      <h3>Kayıtlı Adres Bulunamadı!</h3>
      <p>Adresini sistemimize kaydederek sipariş aşamasında ek zaman harcamazsın.</p>
      <button type="button" class="address-center-btn address-create-open">Yeni Ekle</button>
    </div>

    <form id="address-form" class="address-form">
      <label><span>* Adres Başlığı</span><input type="text" placeholder="Ev, İş..." /></label>
      <label><span>* Ad Soyad</span><input type="text" /></label>
      <label><span>* Telefon No</span><input type="text" value="+90" /></label>
      <label><span>* Adres</span><textarea rows="4" placeholder="Mahalle, sokak, cadde ve diğer bilgilerinizi giriniz"></textarea></label>

      <div class="address-grid-2">
        <label><span>* Şehir</span><select id="address-city"><option value="">Şehir Seçiniz</option></select></label>
        <label><span>* İlçe</span><select id="address-district"><option value="">İlçe Seçiniz</option></select></label>
      </div>

      <label><span>Posta Kodu</span><input type="text" /></label>
      <label class="address-type-row">
        <input type="radio" name="addressType" checked /> Bireysel
        <input type="radio" name="addressType" /> Kurumsal
      </label>
      <label><span>T.C. Kimlik No</span><input type="text" /></label>
      <label class="address-checkbox"><input type="checkbox" /> Tc Vatandaşı Değilim</label>

      <div class="address-actions">
        <button type="button" class="address-cancel-btn">Vazgeç</button>
        <button type="submit" class="address-save-btn">Kaydet</button>
      </div>
    </form>
    <div class="address-success" id="address-success">
      Adresiniz kaydedildi.
    </div>
  </section>

  <div class="auth-modal" id="auth-modal" role="dialog" aria-modal="true" aria-labelledby="auth-modal-title" aria-hidden="true">
    <div class="auth-modal__backdrop" data-close-auth></div>
    <div class="auth-modal__panel">
      <div class="auth-modal__head">
        <h2 class="auth-modal__title" id="auth-modal-title">Hesabınız</h2>
        <button type="button" class="auth-modal__close" data-close-auth aria-label="Kapat">×</button>
      </div>
      <div class="auth-card">
        <div class="auth-tabs">
          <button type="button" class="auth-tab active" data-tab="login">Giriş Yap</button>
          <button type="button" class="auth-tab" data-tab="register">Üye Ol</button>
        </div>

        <form class="auth-pane active" id="login-pane">
          <input type="email" id="login-email" placeholder="E-posta" required autocomplete="email" />
          <div class="password-field">
            <input type="password" id="login-password" placeholder="Şifre" required autocomplete="current-password" />
            <button type="button" class="password-toggle" data-target="login-password" aria-label="Şifreyi göster">
              <svg class="eye-icon eye-open" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12C4.8 7.8 8.1 5.6 12 5.6C15.9 5.6 19.2 7.8 22 12C19.2 16.2 15.9 18.4 12 18.4C8.1 18.4 4.8 16.2 2 12Z"></path>
                <circle cx="12" cy="12" r="3.2"></circle>
              </svg>
              <svg class="eye-icon eye-closed" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3L21 21"></path>
                <path d="M10 6.2C10.7 5.9 11.3 5.8 12 5.8C15.9 5.8 19.2 8 22 12C21 13.5 19.9 14.7 18.7 15.7"></path>
                <path d="M14.2 17.9C13.5 18.1 12.8 18.2 12 18.2C8.1 18.2 4.8 16 2 12C3.1 10.4 4.2 9.1 5.5 8.1"></path>
              </svg>
            </button>
          </div>
          <button type="button" id="login-submit-btn" class="auth-submit">Giriş Yap</button>
          <div class="pane-actions">
            <button type="button" id="forgot-btn" class="auth-link">Şifremi Unuttum</button>
          </div>
          <button type="button" class="google-signin">
            <span class="google-mark" aria-hidden="true">G</span>
            <span>Google ile Bağlan</span>
          </button>
          <label class="check-row check-row--terms">
            <input type="checkbox" id="login-terms" />
            <span>Üyelik koşullarını ve kişisel verilerimin korunmasını kabul ediyorum.</span>
          </label>
        </form>

        <form class="auth-pane" id="register-pane">
          <div class="social-row">
            <button type="button" class="google-signin">
              <span class="google-mark" aria-hidden="true">G</span>
              <span>Google ile Giriş Yap</span>
            </button>
            <button type="button" class="apple-signin">
              <span class="apple-mark" aria-hidden="true"></span>
              <span>Apple ile Giriş Yap</span>
            </button>
          </div>
          <input type="text" id="register-name" placeholder="Adınız" required autocomplete="given-name" />
          <input type="text" id="register-surname" placeholder="Soyadınız" required autocomplete="family-name" />
          <input type="email" id="register-email" placeholder="E-posta" required autocomplete="email" />
          <div class="password-field">
            <input type="password" id="register-password" placeholder="Şifre" required autocomplete="new-password" />
            <button type="button" class="password-toggle" data-target="register-password" aria-label="Şifreyi göster">
              <svg class="eye-icon eye-open" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12C4.8 7.8 8.1 5.6 12 5.6C15.9 5.6 19.2 7.8 22 12C19.2 16.2 15.9 18.4 12 18.4C8.1 18.4 4.8 16.2 2 12Z"></path>
                <circle cx="12" cy="12" r="3.2"></circle>
              </svg>
              <svg class="eye-icon eye-closed" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3L21 21"></path>
                <path d="M10 6.2C10.7 5.9 11.3 5.8 12 5.8C15.9 5.8 19.2 8 22 12C21 13.5 19.9 14.7 18.7 15.7"></path>
                <path d="M14.2 17.9C13.5 18.1 12.8 18.2 12 18.2C8.1 18.2 4.8 16 2 12C3.1 10.4 4.2 9.1 5.5 8.1"></path>
              </svg>
            </button>
          </div>
          <div class="password-rules" aria-live="polite">
            <p>Şifre kriterleri:</p>
            <ul>
              <li data-rule="length">En az 8 karakter + Büyük harf + Küçük harf + Rakam + Özel karakter (!,@,#,$)</li>
            </ul>
          </div>
          <div class="phone-field">
            <span class="phone-flag" aria-hidden="true">🇹🇷</span>
            <input type="tel" id="register-phone" placeholder="+90 501 234 56 78" />
          </div>
          <label class="check-row check-row--terms">
            <input type="checkbox" id="register-campaign-mail" />
            <span>Kampanya, duyuru, bilgilendirmelerden e-posta ile haberdar olmak istiyorum.</span>
          </label>
          <label class="check-row check-row--terms">
            <input type="checkbox" id="register-campaign-sms" />
            <span>Kampanya, duyuru, bilgilendirmelerden sms ile haberdar olmak istiyorum.</span>
          </label>
          <label class="check-row check-row--terms">
            <input type="checkbox" id="register-terms" />
            <span>Üyelik koşullarını ve kişisel verilerimin korunmasını kabul ediyorum.</span>
          </label>
          <button type="submit" class="auth-submit">Üye Ol</button>
        </form>

        <form class="auth-pane" id="forgot-pane">
          <p class="auth-note">Kayıtlı e-posta adresinizi girin, doğrulama kodu gönderelim.</p>
          <input type="email" id="forgot-email" placeholder="E-posta" required />
          <button type="submit" class="auth-submit">Kod Gönder</button>
        </form>

        <form class="auth-pane" id="reset-pane">
          <p class="auth-note">Mailinize gelen kodu ve yeni şifrenizi girin.</p>
          <input type="text" id="reset-code" placeholder="Doğrulama Kodu" required />
          <div class="password-field">
            <input type="password" id="reset-password" placeholder="Yeni Şifre" required />
            <button type="button" class="password-toggle" data-target="reset-password" aria-label="Şifreyi göster">
              <svg class="eye-icon eye-open" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2 12C4.8 7.8 8.1 5.6 12 5.6C15.9 5.6 19.2 7.8 22 12C19.2 16.2 15.9 18.4 12 18.4C8.1 18.4 4.8 16.2 2 12Z"></path>
                <circle cx="12" cy="12" r="3.2"></circle>
              </svg>
              <svg class="eye-icon eye-closed" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3L21 21"></path>
                <path d="M10 6.2C10.7 5.9 11.3 5.8 12 5.8C15.9 5.8 19.2 8 22 12C21 13.5 19.9 14.7 18.7 15.7"></path>
                <path d="M14.2 17.9C13.5 18.1 12.8 18.2 12 18.2C8.1 18.2 4.8 16 2 12C3.1 10.4 4.2 9.1 5.5 8.1"></path>
              </svg>
            </button>
          </div>
          <button type="submit" class="auth-submit">Şifreyi Güncelle</button>
        </form>

        <p id="auth-status" class="auth-status"></p>
      </div>
    </div>
  </div>
`

mountSiteFooter(document.querySelector<HTMLElement>('#account-dashboard-footer-root'), {
  formId: 'account-dashboard-newsletter-form',
  emailInputId: 'account-dashboard-newsletter-email',
  statusId: 'account-dashboard-newsletter-status',
})
mountSiteFooter(document.querySelector<HTMLElement>('#wishlist-footer-root'), {
  formId: 'wishlist-newsletter-form',
  emailInputId: 'wishlist-newsletter-email',
  statusId: 'wishlist-newsletter-status',
})
mountBrandMarquee(document.querySelector<HTMLElement>('#brand-marquee-root'))
mountSiteFooter(document.querySelector<HTMLElement>('#home-bestsellers-footer-root'), {
  formId: 'home-bestsellers-newsletter-form',
  emailInputId: 'home-bestsellers-newsletter-email',
  statusId: 'home-bestsellers-newsletter-status',
})

const menuTrigger = document.querySelector<HTMLButtonElement>('.menu-trigger')
const menuPanel = document.querySelector<HTMLElement>('#menu-panel')
const brandLink = document.querySelector<HTMLAnchorElement>('.brand')
const authOpenBtn = document.querySelector<HTMLButtonElement>('.auth-open')
const accountMenuWrap = document.querySelector<HTMLElement>('.account-menu-wrap')
const accountMenu = document.querySelector<HTMLElement>('#account-menu')
const topLogoutBtn = document.querySelector<HTMLButtonElement>('#top-logout-btn')
const authModal = document.querySelector<HTMLElement>('#auth-modal')
const topProductSearch = document.querySelector<HTMLInputElement>('#top-product-search')
const topSearchResults = document.querySelector<HTMLElement>('#top-search-results')
const heroSection = document.querySelector<HTMLElement>('.hero-content')
const categorySection = document.querySelector<HTMLElement>('#category-section')
const homeShopRibbon = document.querySelector<HTMLElement>('.home-shop-ribbon')
const supportSection = document.querySelector<HTMLElement>('#support-section')
const returnSection = document.querySelector<HTMLElement>('#return-section')
const cancelSection = document.querySelector<HTMLElement>('#cancel-section')
const reviewsSection = document.querySelector<HTMLElement>('#reviews-section')
const wishlistSection = document.querySelector<HTMLElement>('#wishlist-section')
const profileSection = document.querySelector<HTMLElement>('#profile-section')
const addressSection = document.querySelector<HTMLElement>('#address-section')
const giftSection = document.querySelector<HTMLElement>('#gift-section')
const categoryTitle = document.querySelector<HTMLElement>('#category-title')
const accountSection = document.querySelector<HTMLElement>('#account-section')
const accountNameEl = document.querySelector<HTMLElement>('#account-name')
const logoutBtn = document.querySelector<HTMLButtonElement>('#logout-btn')
const authTabs = document.querySelectorAll<HTMLButtonElement>('.auth-tab')
const panes = {
  login: document.querySelector<HTMLElement>('#login-pane'),
  register: document.querySelector<HTMLElement>('#register-pane'),
  forgot: document.querySelector<HTMLElement>('#forgot-pane'),
  reset: document.querySelector<HTMLElement>('#reset-pane'),
}
const loginPaneForm = document.querySelector<HTMLFormElement>('#login-pane')
const loginSubmitBtn = document.querySelector<HTMLButtonElement>('#login-submit-btn')
const googleSigninButtons = document.querySelectorAll<HTMLButtonElement>('.google-signin')
const statusEl = document.querySelector<HTMLElement>('#auth-status')
const categoryLinks = document.querySelectorAll<HTMLAnchorElement>('.category-link')
const popularBrandLinks = document.querySelectorAll<HTMLAnchorElement>('.popular-brand-link')
const filterBrand = document.querySelector<HTMLSelectElement>('#filter-brand')
const filterShape = document.querySelector<HTMLSelectElement>('#filter-shape')
const filterFrameColor = document.querySelector<HTMLSelectElement>('#filter-frame-color')
const filterLensSize = document.querySelector<HTMLSelectElement>('#filter-lens-size')
const filterPriceRange = document.querySelector<HTMLSelectElement>('#filter-price-range')
const filterRecommended = document.querySelector<HTMLSelectElement>('#filter-recommended')
const supportOpenItems = document.querySelectorAll<HTMLElement>('.support-open')
const ordersOpenItems = document.querySelectorAll<HTMLElement>('.orders-open')
const favoritesOpenItems = document.querySelectorAll<HTMLElement>('.favorites-open')
const priceAlarmOpenItems = document.querySelectorAll<HTMLElement>('.price-alarm-open')
const returnOpenItems = document.querySelectorAll<HTMLElement>('.return-open')
const cancelOpenItems = document.querySelectorAll<HTMLElement>('.cancel-open')
const reviewsOpenItems = document.querySelectorAll<HTMLElement>('.reviews-open')
const wishlistOpenItems = document.querySelectorAll<HTMLElement>('.wishlist-open')
const profileOpenItems = document.querySelectorAll<HTMLElement>('.profile-open')
const addressOpenItems = document.querySelectorAll<HTMLElement>('.address-open')
const giftOpenItems = document.querySelectorAll<HTMLElement>('.gift-open')
const cartPageOpenItems = document.querySelectorAll<HTMLElement>('.cart-page-open')
const returnShopBtn = document.querySelector<HTMLButtonElement>('#return-shop-btn')
const returnCancelBtn = document.querySelector<HTMLButtonElement>('#return-cancel-btn')
const cancelNewRequestBtn = document.querySelector<HTMLButtonElement>('#cancel-new-request-btn')
const cancelFormPanel = document.querySelector<HTMLElement>('#cancel-form-panel')
const cancelRequestForm = document.querySelector<HTMLFormElement>('#cancel-request-form')
const cancelOrderSelect = document.querySelector<HTMLSelectElement>('#cancel-order-select')
const cancelFormDismissBtn = document.querySelector<HTMLButtonElement>('#cancel-form-dismiss')
const cancelEmptyEl = document.querySelector<HTMLElement>('#cancel-empty')
const cancelListWrap = document.querySelector<HTMLElement>('#cancel-list-wrap')
const cancelListEl = document.querySelector<HTMLElement>('#cancel-list')
const cancelShopBtn = document.querySelector<HTMLButtonElement>('#cancel-shop-btn')
const reviewsShopBtn = document.querySelector<HTMLButtonElement>('#reviews-shop-btn')
const wishlistForm = document.querySelector<HTMLFormElement>('#wishlist-form')
const wishlistImportance = document.querySelector<HTMLSelectElement>('#wishlist-importance')
const wishlistDay = document.querySelector<HTMLSelectElement>('#wishlist-day')
const wishlistMonth = document.querySelector<HTMLSelectElement>('#wishlist-month')
const wishlistYear = document.querySelector<HTMLSelectElement>('#wishlist-year')
const wishlistTitle = document.querySelector<HTMLInputElement>('#wishlist-title')
const wishlistDesc = document.querySelector<HTMLTextAreaElement>('#wishlist-desc')
const wishlistDefault = document.querySelector<HTMLInputElement>('#wishlist-default')
const wishlistActive = document.querySelector<HTMLInputElement>('#wishlist-active')
const wishlistVazgecBtn = document.querySelector<HTMLButtonElement>('#wishlist-vazgec')
const wishlistTableBody = document.querySelector<HTMLElement>('#wishlist-table-body')
const supportCancelBtn = document.querySelector<HTMLButtonElement>('.support-cancel')
const giftCreateForm = document.querySelector<HTMLFormElement>('#gift-create-form')
const giftAmountInput = document.querySelector<HTMLInputElement>('#gift-amount-input')
const giftStatus = document.querySelector<HTMLElement>('#gift-status')
const giftTotalPointsEl = document.querySelector<HTMLElement>('#gift-total-points')
const giftTotalAmountEl = document.querySelector<HTMLElement>('#gift-total-amount')
const profileCitySelect = document.querySelector<HTMLInputElement>('#profile-city')
const profileDistrictSelect = document.querySelector<HTMLSelectElement>('#profile-district')
const addressCitySelect = document.querySelector<HTMLSelectElement>('#address-city')
const addressDistrictSelect = document.querySelector<HTMLSelectElement>('#address-district')
const cityDropdown = document.querySelector<HTMLElement>('#city-dropdown')
const profileCityTrigger = document.querySelector<HTMLButtonElement>('#profile-city-trigger')
const profileCityMenu = document.querySelector<HTMLElement>('#profile-city-menu')
const supportForm = document.querySelector<HTMLFormElement>('#support-form')
const newSupportBtn = document.querySelector<HTMLButtonElement>('#new-support-btn')
const supportSubject = document.querySelector<HTMLSelectElement>('#support-subject')
const supportTitle = document.querySelector<HTMLInputElement>('#support-title')
const supportDetail = document.querySelector<HTMLTextAreaElement>('#support-detail')
const supportHistoryList = document.querySelector<HTMLElement>('#support-history-list')
const addressCreateButtons = document.querySelectorAll<HTMLElement>('.address-create-open')
const addressForm = document.querySelector<HTMLFormElement>('#address-form')
const addressEmpty = document.querySelector<HTMLElement>('#address-empty')
const addressCancelBtn = document.querySelector<HTMLButtonElement>('.address-cancel-btn')
const addressSuccess = document.querySelector<HTMLElement>('#address-success')
const cartOpenBtn = document.querySelector<HTMLButtonElement>('.cart-open')
const cartPanel = document.querySelector<HTMLElement>('#cart-panel')
const cartItemsEl = document.querySelector<HTMLElement>('#cart-items')
const cartTotalEl = document.querySelector<HTMLElement>('#cart-total')
const cartCloseBtn = document.querySelector<HTMLButtonElement>('#cart-close-btn')
const cartBadgeEl = document.querySelector<HTMLElement>('#cart-badge')
const shoppingCartSection = document.querySelector<HTMLElement>('#shopping-cart-section')
const shoppingCartItemsEl = document.querySelector<HTMLElement>('#shopping-cart-items')
const shoppingCartCountEl = document.querySelector<HTMLElement>('#shopping-cart-count')
const shoppingCartSubtotalEl = document.querySelector<HTMLElement>('#shopping-cart-subtotal')
const shoppingCartShippingPriceEl = document.querySelector<HTMLElement>('#shopping-cart-shipping-price')
const shoppingCartTotalEl = document.querySelector<HTMLElement>('#shopping-cart-total')
const shoppingCartShippingNotice = document.querySelector<HTMLElement>('#shopping-cart-shipping')
const shoppingCartClearBtn = document.querySelector<HTMLButtonElement>('#shopping-cart-clear')
const shoppingCartCompleteBtn = document.querySelector<HTMLButtonElement>('.shopping-cart-complete')
const ordersSection = document.querySelector<HTMLElement>('#orders-section')
const ordersListEl = document.querySelector<HTMLElement>('#orders-list')
const favoritesSection = document.querySelector<HTMLElement>('#favorites-section')
const priceAlarmSection = document.querySelector<HTMLElement>('#price-alarm-section')
const adminSection = document.querySelector<HTMLElement>('#admin-section')
const adminLoginGate = document.querySelector<HTMLElement>('#admin-login-gate')
const adminPanelBody = document.querySelector<HTMLElement>('#admin-panel-body')
const adminLoginEmail = document.querySelector<HTMLInputElement>('#admin-login-email')
const adminLoginPassword = document.querySelector<HTMLInputElement>('#admin-login-password')
const adminLoginStatus = document.querySelector<HTMLElement>('#admin-login-status')
const adminCloseBtn = document.querySelector<HTMLButtonElement>('#admin-close-btn')
const adminStatsEl = document.querySelector<HTMLElement>('#admin-stats')
const adminChartDay = document.querySelector<HTMLElement>('#admin-chart-day')
const adminChartWeek = document.querySelector<HTMLElement>('#admin-chart-week')
const adminChartMonth = document.querySelector<HTMLElement>('#admin-chart-month')
const adminAlertsBody = document.querySelector<HTMLElement>('#admin-alerts-body')
const adminProductsBody = document.querySelector<HTMLElement>('#admin-products-body')
const adminOrdersBody = document.querySelector<HTMLElement>('#admin-orders-body')
const adminBulkPercent = document.querySelector<HTMLInputElement>('#admin-bulk-percent')
const adminBulkPriceBtn = document.querySelector<HTMLButtonElement>('#admin-bulk-price-btn')
const adminSyncCatalogBtn = document.querySelector<HTMLButtonElement>('#admin-sync-catalog-btn')
const adminExcelHint = document.querySelector<HTMLElement>('#admin-excel-hint')
const adminInvoiceHint = document.querySelector<HTMLElement>('#admin-invoice-hint')
const favoritesListEl = document.querySelector<HTMLElement>('#favorites-list')
const priceAlarmListEl = document.querySelector<HTMLElement>('#price-alarm-list')
const priceAlarmForm = document.querySelector<HTMLFormElement>('#price-alarm-form')
const priceAlarmProductSelect = document.querySelector<HTMLSelectElement>('#price-alarm-product')
const priceAlarmTargetInput = document.querySelector<HTMLInputElement>('#price-alarm-target')
const priceAlarmFormStatus = document.querySelector<HTMLElement>('#price-alarm-form-status')
const checkoutModal = document.querySelector<HTMLElement>('#checkout-modal')
const checkoutForm = document.querySelector<HTMLFormElement>('#checkout-form')
const checkoutName = document.querySelector<HTMLInputElement>('#checkout-name')
const checkoutCardNumber = document.querySelector<HTMLInputElement>('#checkout-card-number')
const checkoutExpiry = document.querySelector<HTMLInputElement>('#checkout-expiry')
const checkoutCvv = document.querySelector<HTMLInputElement>('#checkout-cvv')
const checkoutTerms = document.querySelector<HTMLInputElement>('#checkout-terms')
const checkoutTotalEl = document.querySelector<HTMLElement>('#checkout-total')
const checkoutStatusEl = document.querySelector<HTMLElement>('#checkout-status')
const productDetailSection = document.querySelector<HTMLElement>('#product-detail-section')
const productDetailBackBtn = document.querySelector<HTMLButtonElement>('#product-detail-back')
const productDetailImageWrap = document.querySelector<HTMLElement>('#product-detail-image-wrap')
const productDetailImage = document.querySelector<HTMLImageElement>('#product-detail-image')
const productDetailBrand = document.querySelector<HTMLElement>('#product-detail-brand')
const productDetailModel = document.querySelector<HTMLElement>('#product-detail-model')
const productDetailPrice = document.querySelector<HTMLElement>('#product-detail-price')
const productDetailEkartman = document.querySelector<HTMLElement>('#product-detail-ekartman')
const productDetailFrameColor = document.querySelector<HTMLElement>('#product-detail-frame-color')
const productDetailBridge = document.querySelector<HTMLElement>('#product-detail-bridge')
const productDetailTemple = document.querySelector<HTMLElement>('#product-detail-temple')
const productDetailLensSize = document.querySelector<HTMLElement>('#product-detail-lens-size')
const productDetailPriceRange = document.querySelector<HTMLElement>('#product-detail-price-range')
const productDetailRecommended = document.querySelector<HTMLElement>('#product-detail-recommended')
const productDetailLensType = document.querySelector<HTMLElement>('#product-detail-lens-type')
const productDetailLensColor = document.querySelector<HTMLElement>('#product-detail-lens-color')
const productDetailFrameShape = document.querySelector<HTMLElement>('#product-detail-frame-shape')
const productDetailFrameMaterial = document.querySelector<HTMLElement>('#product-detail-frame-material')
const productDetailYear = document.querySelector<HTMLElement>('#product-detail-year')
const productDetailAddCart = document.querySelector<HTMLButtonElement>('#product-detail-add-cart')
let editingSupportIndex: number | null = null
let currentCategoryView: CategoryKey = 'kadin'
const categoryProducts = document.querySelector<HTMLElement>('#category-products')
let activeProductDetail: CatalogItem | null = null

type CategoryFilterState = {
  brand: string
  frameShape: string
  frameColor: string
  lensSize: string
  priceRange: string
  recommended: string
}

const categoryFilters: CategoryFilterState = {
  brand: '',
  frameShape: '',
  frameColor: '',
  lensSize: '',
  priceRange: '',
  recommended: '',
}

type User = {
  name: string
  surname: string
  email: string
  password: string
}

type UserProfile = Omit<User, 'password'>

type SupportRecord = {
  id: number
  subject: string
  title: string
  detail: string
  createdAt: string
}

type CategoryKey = 'kadin' | 'erkek' | 'cocuk'

type CatalogItem = {
  category: CategoryKey
  brand: string
  model: string
  price: string
  image: string
}

type ProductSpecs = {
  ekartman: string
  frameColor: string
  bridge: string
  temple: string
  lensSize: string
  priceRange: string
  recommended: string
  lensType: string
  lensColor: string
  frameShape: string
  frameMaterial: string
  year: string
}

type OrderRecord = {
  id: string
  createdAt: string
  total: string
  itemCount: number
  items: Array<{ brand: string; model: string; quantity: number; priceText: string }>
  status?: string
  trackingCode?: string
  fulfillmentUpdatedAt?: string | null
}

type CancelRequestRecord = {
  id: string
  orderId: string
  note: string
  createdAt: string
  status: string
}

type WishlistEntryRecord = {
  id: string
  importance: string
  day: string
  month: string
  year: string
  title: string
  description: string
  isDefault: boolean
  isActive: boolean
  createdAt: string
}

type FavoriteRecord = {
  id: string
  brand: string
  model: string
  price: string
  image: string
  category: CategoryKey
}

type PriceAlertRecord = {
  id: string
  brand: string
  model: string
  price: string
  image: string
  category: CategoryKey
  targetPriceTl: number
  addedAt: string
}

type CartItem = {
  id: string
  brand: string
  model: string
  priceText: string
  price: number
  image: string
  quantity: number
}

const catalogItems: CatalogItem[] = [
  {
    category: 'kadin',
    brand: 'Bottega Veneta',
    model: 'BV1440SA Kahve Gold Kadin Gunes Gozlugu',
    price: '29.950 TL',
    image: '/products-kadin-1.png',
  },
  {
    category: 'kadin',
    brand: 'Olivio & Co',
    model: 'Sport Flamingo Pink Yarim Cerceveli Unisex Outdoor Gunes Gozlugu',
    price: '2.749,90 TL',
    image: '/products-kadin-2.png',
  },
  {
    category: 'kadin',
    brand: 'Prada',
    model: 'PR 14WS Kahverengi Kadin Gunes Gozlugu',
    price: '16.860 TL',
    image: '/products-kadin-3.png',
  },
  {
    category: 'kadin',
    brand: 'Mess Frames',
    model: 'Half Moon Sari Gunes Gozlugu',
    price: '1.890 TL',
    image: '/products-kadin-4.png',
  },
  {
    category: 'kadin',
    brand: 'Prada',
    model: 'PR 14WS Siyah Kadin Gunes Gozlugu',
    price: '16.860 TL',
    image: '/products-kadin-5.png',
  },
  {
    category: 'kadin',
    brand: 'Miu Miu',
    model: 'MU A5S Light Gold Kadin Gunes Gozlugu',
    price: '21.720 TL',
    image: '/products-kadin-6.png',
  },
  {
    category: 'kadin',
    brand: 'Gast',
    model: 'Lunar Altin Rengi Mavi Kadin Gunes Gozlugu',
    price: '11.990 TL',
    image: '/products-kadin-7.png',
  },
  {
    category: 'kadin',
    brand: 'Gucci',
    model: 'Siyah Kadin Gunes Gozlugu',
    price: '17.500 TL',
    image: '/products-kadin-8.png',
  },
  {
    category: 'kadin',
    brand: 'Saint Laurent',
    model: 'YS000128 Siyah Kadin Gunes Gozlugu',
    price: '20.500 TL',
    image: '/products-kadin-9.png',
  },
  {
    category: 'kadin',
    brand: 'Mess Frames',
    model: 'Serpenti Siyah Kadin Gunes Gozlugu',
    price: '1.990 TL',
    image: '/products-kadin-10.png',
  },
  {
    category: 'kadin',
    brand: 'Mess Frames',
    model: 'Silhouette Kahverengi Kadin Gunes Gozlugu',
    price: '1.990 TL',
    image: '/products-kadin-11.png',
  },
  {
    category: 'kadin',
    brand: 'Mess Frames',
    model: 'Indoor Siyah Gunes Gozlugu',
    price: '2.190 TL',
    image: '/products-kadin-12.png',
  },
  {
    category: 'kadin',
    brand: 'Mess Frames',
    model: 'Muse Demi Amber Kadin Gunes Gozlugu',
    price: '1.990 TL',
    image: '/products-kadin-13.png',
  },
  {
    category: 'kadin',
    brand: 'Loewe',
    model: 'Koyu Yesil Kadin Gunes Gozlugu',
    price: '14.195 TL',
    image: '/products-kadin-14.png',
  },
  {
    category: 'kadin',
    brand: 'Ray-Ban',
    model: 'RB2198 Kahverengi Unisex Gunes Gozlugu',
    price: '10.050 TL',
    image: '/products/product-1.png',
  },
  {
    category: 'kadin',
    brand: 'Ray-Ban',
    model: 'RB3547 Siyah Kadin Gunes Gozlugu',
    price: '10.050 TL',
    image: '/products/product-2.png',
  },
  {
    category: 'kadin',
    brand: 'Miu Miu',
    model: 'MU 56ZS Gold Kadin Gunes Gozlugu',
    price: '20.610 TL',
    image: '/products/product-4.png',
  },
  {
    category: 'kadin',
    brand: 'Versace',
    model: 'VE2198 Siyah Kadin Gunes Gozlugu',
    price: '15.710 TL',
    image: '/products/product-5.png',
  },
  {
    category: 'kadin',
    brand: 'Mess Frames',
    model: 'Indoor Kahverengi Unisex Gunes Gozlugu',
    price: '2.190 TL',
    image: '/products/product-6.png',
  },
  {
    category: 'kadin',
    brand: 'Bottega Veneta',
    model: 'Kahverengi Kadin Gunes Gozlugu',
    price: '19.950 TL',
    image: '/products-kadin-16.png',
  },
  {
    category: 'erkek',
    brand: 'Ray-Ban',
    model: 'RB2140 Siyah Unisex Gunes Gozlugu',
    price: '12.380 TL',
    image: '/products-erkek-1.png',
  },
  {
    category: 'erkek',
    brand: 'Gucci',
    model: 'GC001245 Gold Erkek Gunes Gozlugu',
    price: '19.750 TL',
    image: '/products-erkek-2.png',
  },
  {
    category: 'erkek',
    brand: 'Prada Linea Rossa',
    model: 'PS 01US Siyah Erkek Gunes Gozlugu',
    price: '12.810 TL',
    image: '/products-erkek-3.png',
  },
  {
    category: 'erkek',
    brand: 'Dolce&Gabbana',
    model: 'DG2220 Siyah Antrasit Erkek Gunes Gozlugu',
    price: '16.880 TL',
    image: '/products-erkek-4.png',
  },
  {
    category: 'erkek',
    brand: 'Persol',
    model: 'PO3210S Siyah Erkek Gunes Gozlugu',
    price: '15.870 TL',
    image: '/products-erkek-5.png',
  },
  {
    category: 'erkek',
    brand: 'Matsuda',
    model: 'Silver Erkek Gunes Gozlugu',
    price: '81.950 TL',
    image: '/products-erkek-6.png',
  },
  {
    category: 'erkek',
    brand: 'Ray-Ban',
    model: 'RBR0502S Lacivert Unisex Gunes Gozlugu',
    price: '10.690 TL',
    image: '/products-erkek-7.png',
  },
  {
    category: 'erkek',
    brand: 'Mess Frames',
    model: 'Rockstar Siyah Gunes Gozlugu',
    price: '1.990 TL',
    image: '/products-erkek-8.png',
  },
  {
    category: 'erkek',
    brand: 'Hermossa',
    model: 'Dreamer HM 1710 C2 Siyah Asetat Unisex Gunes Gozlugu',
    price: '5.525 TL',
    image: '/products-erkek-9.png',
  },
  {
    category: 'erkek',
    brand: 'Mess Frames',
    model: 'Senior Siyah Asetat Unisex Gunes Gozlugu',
    price: '2.740 TL',
    image: '/products-erkek-10.png',
  },
  {
    category: 'erkek',
    brand: 'Prada',
    model: 'Gunes Gozlugu',
    price: '19.180 TL',
    image: '/products-erkek-11.png',
  },
  {
    category: 'erkek',
    brand: 'Burberry',
    model: 'BE4349 Yesil Erkek Gunes Gozlugu',
    price: '12.310 TL',
    image: '/products-erkek-12.png',
  },
  {
    category: 'erkek',
    brand: 'Burberry',
    model: 'BE4437U Kahverengi Erkek Gunes Gozlugu',
    price: '15.820 TL',
    image: '/products/product-3.png',
  },
  {
    category: 'erkek',
    brand: 'Dolce&Gabbana',
    model: 'DG2328 Silver Erkek Gunes Gozlugu',
    price: '19.330 TL',
    image: '/products-erkek-13.png',
  },
  {
    category: 'erkek',
    brand: 'Off-White',
    model: 'OERI14H 7650 Altin Sarisi Metal Erkek Gunes Gozlugu',
    price: '17.316 TL',
    image: '/products-erkek-14.png',
  },
  {
    category: 'erkek',
    brand: 'Persol',
    model: 'PO3210S Kahverengi Erkek Gunes Gozlugu',
    price: '18.660 TL',
    image: '/products-erkek-15.png',
  },
  {
    category: 'erkek',
    brand: 'Izipizi',
    model: 'Sun #C Moonlight Grey Gri Unisex Gunes Gozlugu',
    price: '4.049 TL',
    image: '/products-erkek-16.png',
  },
  {
    category: 'cocuk',
    brand: 'Roshambo Eyewear',
    model: 'Round Model Poyple Aynali Mor Lens Kiz Cocuk Gunes Gozlugu',
    price: '2.349 TL',
    image: '/products-cocuk-1.png',
  },
  {
    category: 'cocuk',
    brand: 'Olivio & Co',
    model: 'Cactus Green Classic Round Toddler 1-3 Yas Unisex Cocuk Gunes Gozlugu',
    price: '1.624,90 TL',
    image: '/products-cocuk-2.png',
  },
  {
    category: 'cocuk',
    brand: 'Olivio & Co',
    model: 'Classic Round Citrus Yellow 3-7 Yas Unisex Cocuk Gunes Gozlugu',
    price: '1.924,90 TL',
    image: '/products-cocuk-3.png',
  },
  {
    category: 'cocuk',
    brand: 'Looklight',
    model: 'Fox Matte Hunter Unisex Cocuk Gunes Gozlugu',
    price: '2.100 TL',
    image: '/products-cocuk-4.png',
  },
  {
    category: 'cocuk',
    brand: 'Babiators',
    model: 'Original Hearts Silver Shimmer 0-2 Yas Kiz Cocuk Gunes Gozlugu',
    price: '3.200 TL',
    image: '/products-cocuk-5.png',
  },
  {
    category: 'cocuk',
    brand: 'Looklight',
    model: 'Will Mat Hardal Cocuk Gunes Gozlugu',
    price: '2.100 TL',
    image: '/products-cocuk-6.png',
  },
  {
    category: 'cocuk',
    brand: 'Olivio & Co',
    model: 'Classic Round Squid Black 3-7 Yas Unisex Cocuk Gunes Gozlugu',
    price: '1.974,90 TL',
    image: '/products-cocuk-7.png',
  },
  {
    category: 'cocuk',
    brand: 'Olivio & Co',
    model: 'Creative Shell Sailing Blue 3 Yas Cocuk Gunes Gozlugu',
    price: '2.174,90 TL',
    image: '/products-cocuk-8.png',
  },
  {
    category: 'cocuk',
    brand: 'Babiators',
    model: 'Polarize Heart Frosted Pink 0-2 Yas Bebek Gunes Gozlugu',
    price: '3.450 TL',
    image: '/products-cocuk-9.png',
  },
  {
    category: 'cocuk',
    brand: 'Babiators',
    model: 'Polarize Flower Daisy 0-2 Yas Kiz Cocuk Gunes Gozlugu',
    price: '3.450 TL',
    image: '/products-cocuk-10.png',
  },
  {
    category: 'cocuk',
    brand: 'Babiators',
    model: 'Polarize Keyhole Pretty in Pink 0-2 Yas Bebek Gunes Gozlugu',
    price: '3.200 TL',
    image: '/products-cocuk-11.png',
  },
  {
    category: 'cocuk',
    brand: 'Kietla',
    model: 'Ourson Light Pink 2-4 Yas Kiz Cocuk Gunes Gozlugu',
    price: '3.990 TL',
    image: '/products-cocuk-12.png',
  },
  {
    category: 'cocuk',
    brand: 'Looklight',
    model: 'Boo Mat Jel Kirmizi Bebek Gunes Gozlugu',
    price: '2.100 TL',
    image: '/products-cocuk-13.png',
  },
  {
    category: 'cocuk',
    brand: 'Kietla',
    model: 'Lion Bubble Gum 1-2 Yas Kiz Cocuk Gunes Gozlugu',
    price: '3.990 TL',
    image: '/products-cocuk-14.png',
  },
  {
    category: 'cocuk',
    brand: 'Looklight',
    model: 'Will Pumpkin 2-6 Yas Cocuk Gunes Gozlugu',
    price: '2.100 TL',
    image: '/products-cocuk-15.png',
  },
  {
    category: 'cocuk',
    brand: 'Looklight',
    model: 'Alpha Crystal Unisex Cocuk Gunes Gozlugu',
    price: '2.100 TL',
    image: '/products-cocuk-16.png',
  },
]

const SESSION_KEY = 'di_session'
const USER_INFO_KEY = 'di_user_info'
const REMEMBER_KEY = 'di_remembered'
const CART_KEY = 'di_cart'
const ORDERS_KEY = 'di_orders'
const FAVORITES_KEY = 'di_favorites'
const PRICE_ALERTS_KEY = 'di_price_alerts'
const CANCEL_REQUESTS_KEY = 'di_cancel_requests'
const WISHLISTS_KEY = 'di_wishlist_entries'
const GIFT_POINTS_KEY = 'di_gift_points'
const GIFT_MIN_AMOUNT = 20
const GIFT_STEP = 10
const CART_GIFT_THRESHOLD = 10000
const FREE_SHIPPING_THRESHOLD = 1000
const DEFAULT_SHIPPING_PRICE = 149
const resolveApiBaseUrl = (): string => {
  const raw = (import.meta.env.VITE_API_URL as string | undefined)?.trim()
  if (!raw) return '/api'
  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    try {
      const u = new URL(raw)
      const path = u.pathname.replace(/\/$/, '')
      if (!path || path === '/') {
        u.pathname = '/api'
      }
      return `${u.origin}${u.pathname.replace(/\/$/, '')}`
    } catch {
      return '/api'
    }
  }
  const rel = raw.replace(/\/$/, '')
  return rel || '/api'
}

const API_BASE_URL = resolveApiBaseUrl()
const ADMIN_TOKEN_KEY = 'di_admin_token'
let pendingResetEmail = ''

let csrfTokenCache: string | null = null

const fetchCsrfToken = async (): Promise<string> => {
  if (csrfTokenCache) return csrfTokenCache
  const res = await fetch(`${API_BASE_URL}/csrf-token`)
  if (!res.ok) throw new Error('CSRF token alınamadı')
  const body = (await res.json()) as { token?: string }
  if (!body.token) throw new Error('CSRF token alınamadı')
  csrfTokenCache = body.token
  return csrfTokenCache
}

const invalidateCsrfToken = () => {
  csrfTokenCache = null
}

const getSessionEmail = (): string => (localStorage.getItem(SESSION_KEY) ?? '').trim().toLowerCase()

const pushCommerceStateToBackend = async () => {
  const email = getSessionEmail()
  if (!email) return

  const cart = JSON.parse(localStorage.getItem(CART_KEY) ?? '[]')
  const orders = JSON.parse(localStorage.getItem(ORDERS_KEY) ?? '[]')
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]')
  const giftPoints = Number(localStorage.getItem(GIFT_POINTS_KEY) ?? 0)

  try {
    const csrf = await fetchCsrfToken()
    await fetch(`${API_BASE_URL}/state`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
      body: JSON.stringify({ email, cart, orders, favorites, giftPoints }),
    })
  } catch {
    // Keep UX smooth when backend is temporarily offline.
  }
}

const pullCommerceStateFromBackend = async () => {
  const email = getSessionEmail()
  if (!email) return

  try {
    const response = await fetch(`${API_BASE_URL}/state?email=${encodeURIComponent(email)}`)
    if (!response.ok) return
    const data = (await response.json()) as {
      cart?: CartItem[]
      orders?: OrderRecord[]
      favorites?: FavoriteRecord[]
      giftPoints?: number
    }
    if (Array.isArray(data.cart)) localStorage.setItem(CART_KEY, JSON.stringify(data.cart))
    if (Array.isArray(data.orders)) localStorage.setItem(ORDERS_KEY, JSON.stringify(data.orders))
    if (Array.isArray(data.favorites)) localStorage.setItem(FAVORITES_KEY, JSON.stringify(data.favorites))
    if (typeof data.giftPoints === 'number' && Number.isFinite(data.giftPoints)) {
      localStorage.setItem(GIFT_POINTS_KEY, String(Math.max(0, Math.floor(data.giftPoints))))
    }
  } catch {
    // Offline fallback: keep local data.
  }
}

const reserveCheckoutStock = async (items: CartItem[]): Promise<{ ok: true } | { ok: false; message: string }> => {
  if (!items.length) return { ok: false, message: 'Sepetiniz boş.' }
  try {
    const csrf = await fetchCsrfToken()
    const response = await fetch(`${API_BASE_URL}/checkout/stock`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
      body: JSON.stringify({
        items: items.map((item) => ({ brand: item.brand, model: item.model, quantity: Math.max(1, Math.floor(item.quantity || 1)) })),
      }),
    })
    if (response.ok) return { ok: true }
    if (response.status === 409) {
      let message = 'Bazi urunlerde stok yetersiz.'
      try {
        const data = (await response.json()) as {
          items?: Array<{ brand?: string; model?: string; requested?: number; available?: number }>
        }
        const first = data.items?.[0]
        if (first?.brand && first?.model) {
          message = `${first.brand} ${first.model} icin stok yetersiz (istenen: ${first.requested ?? '-'}, mevcut: ${first.available ?? 0}).`
        }
      } catch {
        // fallback message above
      }
      return { ok: false, message }
    }
    return { ok: false, message: 'Stok kontrolu yapilamadi. Lutfen tekrar deneyin.' }
  } catch {
    return { ok: false, message: 'Sunucuya ulasilamadi. Lutfen tekrar deneyin.' }
  }
}

const readUserInfo = (): UserProfile | undefined => {
  const raw = localStorage.getItem(USER_INFO_KEY)
  if (!raw) return undefined
  try {
    const info = JSON.parse(raw) as UserProfile
    if (!info?.email) return undefined
    return info
  } catch {
    return undefined
  }
}

const syncAccountDashboardGreeting = () => {
  if (!accountNameEl) return
  const email = getSessionEmail()
  const info = readUserInfo()
  if (email && info && info.email.trim().toLowerCase() === email) {
    const first = (info.name ?? '').trim()
    if (first) {
      accountNameEl.textContent = first.toLocaleUpperCase('tr-TR')
      return
    }
    const sur = (info.surname ?? '').trim()
    if (sur) {
      accountNameEl.textContent = sur.toLocaleUpperCase('tr-TR')
      return
    }
    accountNameEl.textContent = 'KULLANICI'
    return
  }
  accountNameEl.textContent = 'MİSAFİR'
}

const writeUserInfo = (user: UserProfile) => {
  localStorage.setItem(USER_INFO_KEY, JSON.stringify(user))
  syncAccountDashboardGreeting()
}

const pullUserProfileFromBackend = async () => {
  const email = getSessionEmail()
  if (!email) return
  try {
    const user = await authApiRequest<UserProfile>('/auth/me', 'GET', { email })
    writeUserInfo(user)
  } catch {
    localStorage.removeItem(USER_INFO_KEY)
    syncAccountDashboardGreeting()
  }
}

const getAdminToken = (): string => sessionStorage.getItem(ADMIN_TOKEN_KEY) ?? ''
const setAdminToken = (token: string) => {
  sessionStorage.setItem(ADMIN_TOKEN_KEY, token)
}

type AdminLoginPostResult =
  | { ok: true; token: string }
  | { ok: false; status: number; error?: string; networkError: boolean }

const postAdminLogin = async (email: string, password: string): Promise<AdminLoginPostResult> => {
  try {
    const csrf = await fetchCsrfToken()
    const res = await fetch(`${API_BASE_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': csrf },
      body: JSON.stringify({ email, password }),
    })
    const text = await res.text()
    let body: { error?: string; token?: string } = {}
    if (text) {
      try {
        body = JSON.parse(text) as { error?: string; token?: string }
      } catch {
        body = {}
      }
    }
    if (!res.ok) {
      return {
        ok: false,
        status: res.status,
        error: typeof body.error === 'string' && body.error.length > 0 ? body.error : undefined,
        networkError: false,
      }
    }
    if (body.token) return { ok: true, token: body.token }
    return { ok: false, status: res.status, networkError: false }
  } catch {
    return { ok: false, status: 0, networkError: true }
  }
}

const adminFetch = async (path: string, init?: RequestInit): Promise<Response> => {
  const method = (init?.method ?? 'GET').toUpperCase()
  const headers = new Headers(init?.headers)
  headers.set('x-admin-token', getAdminToken())
  if (init?.body != null && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  if (method !== 'GET' && method !== 'HEAD' && method !== 'OPTIONS') {
    headers.set('X-CSRF-Token', await fetchCsrfToken())
  }
  return fetch(`${API_BASE_URL}${path}`, { ...init, headers })
}

const authApiRequest = async <T>(path: string, method: 'GET' | 'POST', payload?: Record<string, unknown>): Promise<T> => {
  const requestUrl = method === 'GET' && payload ? `${API_BASE_URL}${path}?${new URLSearchParams(payload as Record<string, string>).toString()}` : `${API_BASE_URL}${path}`
  let response: Response
  try {
    const headers: Record<string, string> =
      method === 'POST' ? { 'Content-Type': 'application/json', 'X-CSRF-Token': await fetchCsrfToken() } : {}
    response = await fetch(requestUrl, {
      method,
      headers: method === 'POST' ? headers : undefined,
      body: method === 'POST' ? JSON.stringify(payload ?? {}) : undefined,
    })
  } catch {
    throw new Error(
      'Sunucuya baglanilamadi. API ayakta mi? Proje klasorunde: npm run dev:all (veya ayri: npm run dev:api + npm run dev).',
    )
  }
  const text = await response.text()
  let data = {} as { error?: string } & Partial<T>
  if (text) {
    try {
      data = JSON.parse(text) as { error?: string } & Partial<T>
    } catch {
      data = {}
    }
  }
  if (!response.ok) {
    const apiErr = typeof data.error === 'string' && data.error.length > 0 ? data.error : ''
    const fallback =
      response.status === 502 || response.status === 503 || response.status === 504
        ? 'API sunucusuna ulaşılamadı. Proje klasöründe: npm run dev:all (veya ayrı terminallerde npm run dev:api ve npm run dev)'
        : `İstek başarısız (HTTP ${response.status})`
    throw new Error(apiErr || fallback)
  }
  return data as T
}

const supportApiRequest = async <T>(
  path: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  payload?: Record<string, unknown>,
): Promise<T> => {
  const requestUrl =
    method === 'GET' || method === 'DELETE'
      ? `${API_BASE_URL}${path}${payload ? `?${new URLSearchParams(payload as Record<string, string>).toString()}` : ''}`
      : `${API_BASE_URL}${path}`

  const hdrs: Record<string, string> = {}
  if (method === 'POST' || method === 'PUT') {
    hdrs['Content-Type'] = 'application/json'
    hdrs['X-CSRF-Token'] = await fetchCsrfToken()
  }
  if (method === 'DELETE') {
    hdrs['X-CSRF-Token'] = await fetchCsrfToken()
  }
  const response = await fetch(requestUrl, {
    method,
    headers: Object.keys(hdrs).length ? hdrs : undefined,
    body: method === 'POST' || method === 'PUT' ? JSON.stringify(payload ?? {}) : undefined,
  })
  const text = await response.text()
  let data = {} as { error?: string } & Partial<T>
  if (text) {
    try {
      data = JSON.parse(text) as { error?: string } & Partial<T>
    } catch {
      data = {}
    }
  }
  if (!response.ok) {
    const apiErr = typeof data.error === 'string' && data.error.length > 0 ? data.error : ''
    const fallback =
      response.status === 502 || response.status === 503 || response.status === 504
        ? 'API sunucusuna ulaşılamadı. npm run dev:all veya npm run dev:api + npm run dev'
        : `İstek başarısız (HTTP ${response.status})`
    throw new Error(apiErr || fallback)
  }
  return data as T
}

const closeMenuPanel = () => {
  menuPanel?.classList.remove('is-open')
  menuTrigger?.setAttribute('aria-expanded', 'false')
}

const closeAccountMenu = () => {
  accountMenuWrap?.classList.remove('is-open')
  accountMenu?.setAttribute('aria-hidden', 'true')
}

const closeCartPanel = () => {
  cartPanel?.classList.remove('is-open')
}

const parsePrice = (priceText: string): number => {
  const numeric = Number(priceText.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.'))
  return Number.isNaN(numeric) ? 0 : numeric
}

const formatPrice = (price: number): string =>
  `${price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL`

const toAsciiLower = (value: string): string =>
  value
    .toLocaleLowerCase('tr-TR')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const pickByHash = <T,>(items: T[], hash: number): T => items[Math.abs(hash) % items.length]

const inferFrameColor = (text: string): string => {
  if (text.includes('siyah') || text.includes('black')) return 'Siyah'
  if (text.includes('kahve') || text.includes('kahverengi') || text.includes('brown')) return 'Kahverengi'
  if (text.includes('yesil') || text.includes('green') || text.includes('hunter')) return 'Yeşil'
  if (text.includes('mavi') || text.includes('blue')) return 'Mavi'
  if (text.includes('pembe') || text.includes('pink')) return 'Pembe'
  if (text.includes('kirmizi') || text.includes('red')) return 'Kırmızı'
  if (text.includes('sari') || text.includes('yellow') || text.includes('hardal')) return 'Sarı'
  if (text.includes('mor') || text.includes('purple')) return 'Mor'
  if (text.includes('bej') || text.includes('beige') || text.includes('cream')) return 'Bej'
  if (text.includes('turuncu') || text.includes('orange')) return 'Turuncu'
  if (text.includes('gold') || text.includes('altin')) return 'Gold'
  if (text.includes('silver') || text.includes('gumus')) return 'Silver'
  if (text.includes('crystal') || text.includes('seffaf') || text.includes('clear')) return 'Şeffaf'
  return 'Siyah'
}

const inferLensColor = (text: string): string => {
  if (text.includes('siyah') || text.includes('black')) return 'Siyah'
  if (text.includes('kahve') || text.includes('kahverengi') || text.includes('brown')) return 'Kahverengi'
  if (text.includes('yesil') || text.includes('green')) return 'Yeşil'
  if (text.includes('mavi') || text.includes('blue')) return 'Mavi'
  if (text.includes('pembe') || text.includes('pink')) return 'Pembe'
  if (text.includes('fume') || text.includes('gri') || text.includes('grey') || text.includes('antrasit')) return 'Füme'
  return 'Füme'
}

const inferFrameShape = (text: string): string => {
  if (text.includes('round') || text.includes('yuvarlak')) return 'Yuvarlak'
  if (text.includes('hearts') || text.includes('heart')) return 'Kalp'
  if (text.includes('flower')) return 'Çiçek'
  if (text.includes('keyhole')) return 'Geometrik'
  if (text.includes('aviator') || text.includes('pilot')) return 'Aviator'
  if (text.includes('cat') || text.includes('kedi')) return 'Kedi Gözü'
  if (text.includes('sport') || text.includes('outdoor')) return 'Siperlik'
  if (text.includes('classic') || text.includes('wayfarer')) return 'Kare'
  return ''
}

const inferFrameMaterial = (text: string): string => {
  if (text.includes('metal') || text.includes('gold') || text.includes('silver') || text.includes('altin')) return 'Metal'
  if (text.includes('asetat') || text.includes('acetate')) return 'Asetat'
  if (text.includes('tr90')) return 'TR90'
  if (text.includes('polarize')) return 'TR90'
  return 'Asetat'
}

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value))

const inferBridgeLength = (category: CategoryKey, frameShape: string, text: string, seed: number): number => {
  const byCategory: Record<CategoryKey, { min: number; max: number; base: number }> = {
    kadin: { min: 15, max: 20, base: 17 },
    erkek: { min: 16, max: 21, base: 18 },
    cocuk: { min: 13, max: 17, base: 14 },
  }
  const cfg = byCategory[category]
  let bridge = cfg.base

  if (frameShape === 'Aviator' || frameShape === 'Geometrik') bridge += 1
  if (frameShape === 'Yuvarlak' || frameShape === 'Oval') bridge -= 1
  if (frameShape === 'Siperlik') bridge += 1

  if (text.includes('metal') || text.includes('gold') || text.includes('silver') || text.includes('altin')) bridge += 1
  if (text.includes('classic') || text.includes('round') || text.includes('hearts')) bridge -= 1
  if (text.includes('sport') || text.includes('outdoor') || text.includes('keyhole')) bridge += 1

  bridge += seed % 2
  return clamp(bridge, cfg.min, cfg.max)
}

/** Ana sayfa "Çok Satanlar" ve Önerilen filtresinde bu ürünler "Çok Satan" olarak geçer. */
const BEST_SELLER_PCM_KEYS = new Set(
  [
    'ray-ban__rb2198 kahverengi unisex gunes gozlugu',
    'ray-ban__rb3547 siyah kadin gunes gozlugu',
    'burberry__be4437u kahverengi erkek gunes gozlugu',
    'miu miu__mu 56zs gold kadin gunes gozlugu',
    'versace__ve2198 siyah kadin gunes gozlugu',
    'mess frames__indoor kahverengi unisex gunes gozlugu',
  ].map((k) => k.toLowerCase()),
)

const buildProductSpecs = (product: CatalogItem): ProductSpecs => {
  const text = toAsciiLower(`${product.brand} ${product.model}`)
  const seed = [...text].reduce((sum, ch) => sum + ch.charCodeAt(0), 0)
  const years = ['2021', '2022', '2023', '2024', '2025']
  const rangesByCategory: Record<CategoryKey, { lensMin: number; lensMax: number; bridgeMin: number; bridgeMax: number; templeMin: number; templeMax: number }> = {
    kadin: { lensMin: 52, lensMax: 58, bridgeMin: 16, bridgeMax: 19, templeMin: 135, templeMax: 145 },
    erkek: { lensMin: 54, lensMax: 62, bridgeMin: 17, bridgeMax: 20, templeMin: 140, templeMax: 150 },
    cocuk: { lensMin: 40, lensMax: 49, bridgeMin: 13, bridgeMax: 16, templeMin: 120, templeMax: 132 },
  }
  const range = rangesByCategory[product.category]
  const baseLensSize = range.lensMin + (seed % (range.lensMax - range.lensMin + 1))
  const temple = range.templeMin + (seed % (range.templeMax - range.templeMin + 1))
  const numericPrice = parsePrice(product.price)
  const priceRange = numericPrice < 5000 ? '0-5.000 TL' : numericPrice < 10000 ? '5.000-10.000 TL' : '10.000+ TL'
  const lensType = text.includes('polarize')
    ? 'Polarize'
    : text.includes('ayna') || text.includes('mirrored')
      ? 'Aynalı'
      : text.includes('degrade')
        ? 'Degrade'
        : 'UV400'
  const pcmKey = `${product.brand}__${product.model}`.toLowerCase()
  const recommended = BEST_SELLER_PCM_KEYS.has(pcmKey)
    ? 'Çok Satan'
    : numericPrice >= 20000
      ? 'Editör Seçimi'
      : numericPrice >= 10000
        ? 'Trend'
        : product.category === 'cocuk'
          ? 'Popüler'
          : 'Çok Satan'
  const fallbackShapes = ['Kare', 'Oval', 'Yuvarlak', 'Aviator', 'Kedi Gözü', 'Dikdörtgen', 'Geometrik']
  const inferredShape = inferFrameShape(text)
  const frameShape = inferredShape || pickByHash(fallbackShapes, seed)
  const bridge = inferBridgeLength(product.category, frameShape, text, seed)
  const shapeLensOffset: Record<string, number> = {
    Yuvarlak: -1,
    Oval: -2,
    Kare: 1,
    Dikdörtgen: 2,
    Aviator: 1,
    'Kedi Gözü': 0,
    Geometrik: 1,
    Siperlik: 2,
    Kalp: -1,
    Çiçek: -1,
  }
  const lensSize = clamp(baseLensSize + (shapeLensOffset[frameShape] ?? 0), range.lensMin, range.lensMax)

  return {
    ekartman: `${lensSize}-${temple}-${bridge}`,
    frameColor: inferFrameColor(text),
    bridge: String(bridge),
    temple: String(temple),
    lensSize: String(lensSize),
    priceRange,
    recommended,
    lensType,
    lensColor: inferLensColor(text),
    frameShape,
    frameMaterial: inferFrameMaterial(text),
    year: pickByHash(years, seed),
  }
}

const getProductId = (brand: string, model: string): string => `${brand}__${model}`.toLowerCase()

const readCart = (): CartItem[] => {
  const raw = localStorage.getItem(CART_KEY)
  if (!raw) return []
  try {
    const items = JSON.parse(raw) as CartItem[]
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

const writeCart = (items: CartItem[]) => {
  localStorage.setItem(CART_KEY, JSON.stringify(items))
  void pushCommerceStateToBackend()
}

const getCartTotal = (items: CartItem[]): number => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
const getCartCount = (items: CartItem[]): number => items.reduce((sum, item) => sum + item.quantity, 0)

const renderCartBadge = (count: number) => {
  if (!cartBadgeEl) return
  cartBadgeEl.textContent = String(count)
  cartBadgeEl.classList.toggle('is-visible', count > 0)
}

const renderCart = () => {
  if (!cartItemsEl || !cartTotalEl) return
  const items = readCart()
  renderCartBadge(getCartCount(items))
  if (!items.length) {
    cartItemsEl.innerHTML = '<p class="cart-empty">Sepetin şu an boş.</p>'
    cartTotalEl.textContent = formatPrice(0)
    return
  }
  const subtotal = getCartTotal(items)
  const hasFreeGift = subtotal >= CART_GIFT_THRESHOLD
  cartItemsEl.innerHTML = items
    .map(
      (item) => `
        <article class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.brand} ${item.model}" onerror="this.onerror=null;this.src='/products/product-2.png';" />
          <div class="cart-item-info">
            <strong>${item.brand}</strong>
            <p>${item.model}</p>
            <span>${item.priceText}</span>
            <div class="cart-item-actions">
              <button type="button" class="cart-qty-btn" data-action="decrease" data-id="${item.id}">-</button>
              <span class="cart-qty">${item.quantity}</span>
              <button type="button" class="cart-qty-btn" data-action="increase" data-id="${item.id}">+</button>
              <button type="button" class="cart-remove-btn" data-id="${item.id}" aria-label="Urunu sil">🗑</button>
            </div>
          </div>
        </article>
      `,
    )
    .join('') +
    (hasFreeGift
      ? `
      <article class="cart-gift-item">
        <div class="cart-gift-thumb" aria-hidden="true">🧴</div>
        <div class="cart-gift-info">
          <strong>Temizleme Kiti</strong>
          <span>Ucretsiz</span>
        </div>
      </article>
    `
      : '')
  cartTotalEl.textContent = formatPrice(subtotal)
  renderShoppingCartPage()
}

const renderShoppingCartPage = () => {
  if (!shoppingCartItemsEl || !shoppingCartCountEl || !shoppingCartSubtotalEl || !shoppingCartShippingPriceEl || !shoppingCartTotalEl) return
  const items = readCart()
  const subtotal = getCartTotal(items)
  const count = getCartCount(items)
  const shippingPrice = count === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_PRICE
  const total = subtotal + shippingPrice
  const hasFreeGift = subtotal >= CART_GIFT_THRESHOLD

  shoppingCartCountEl.textContent = String(count)
  shoppingCartSubtotalEl.textContent = formatPrice(subtotal)
  shoppingCartShippingPriceEl.textContent = shippingPrice === 0 ? 'Ucretsiz' : formatPrice(shippingPrice)
  shoppingCartTotalEl.textContent = formatPrice(total)

  if (shoppingCartShippingNotice) {
    shoppingCartShippingNotice.style.display = shippingPrice === 0 && count > 0 ? 'block' : 'none'
  }

  if (!items.length) {
    shoppingCartItemsEl.innerHTML = '<p class="shopping-cart-empty">Sepetin su an bos.</p>'
    return
  }

  shoppingCartItemsEl.innerHTML = items
    .map(
      (item) => `
        <article class="shopping-cart-item">
          <img src="${item.image}" alt="${item.brand} ${item.model}" onerror="this.onerror=null;this.src='/products/product-2.png';" />
          <div class="shopping-cart-item-info">
            <strong>${item.brand} ${item.model}</strong>
            <p>Marka: ${item.brand}</p>
            <div class="shopping-cart-item-bottom">
              <div class="shopping-cart-qty-wrap">
                <button type="button" class="shopping-cart-qty-btn" data-action="decrease" data-id="${item.id}">-</button>
                <span>${item.quantity} adet</span>
                <button type="button" class="shopping-cart-qty-btn" data-action="increase" data-id="${item.id}">+</button>
              </div>
              <button type="button" class="shopping-cart-remove" data-id="${item.id}">Sil</button>
            </div>
          </div>
          <p class="shopping-cart-item-price">${formatPrice(item.price * item.quantity)}</p>
        </article>
      `,
    )
    .join('') +
    (hasFreeGift
      ? `
      <article class="shopping-cart-item shopping-cart-item--gift">
        <div class="shopping-cart-gift-thumb">🧴</div>
        <div class="shopping-cart-item-info">
          <strong>Temizleme Kiti</strong>
          <p>10.000 TL ustu siparis hediyesi</p>
        </div>
        <p class="shopping-cart-item-price shopping-cart-item-price--gift">Ucretsiz</p>
      </article>
    `
      : '')
}

const addToCart = (brand: string, model: string, priceText: string, image: string) => {
  const items = readCart()
  const id = getProductId(brand, model)
  const existing = items.find((item) => item.id === id)
  if (existing) {
    existing.quantity += 1
  } else {
    items.push({
      id,
      brand,
      model,
      priceText,
      price: parsePrice(priceText),
      image,
      quantity: 1,
    })
  }
  writeCart(items)
  renderCart()
}

const updateCartQuantity = (id: string, increase: boolean) => {
  const items = readCart()
  const target = items.find((item) => item.id === id)
  if (!target) return
  target.quantity += increase ? 1 : -1
  if (target.quantity <= 0) {
    const nextItems = items.filter((item) => item.id !== id)
    writeCart(nextItems)
    renderCart()
    return
  }
  writeCart(items)
  renderCart()
}

const removeFromCart = (id: string) => {
  const items = readCart().filter((item) => item.id !== id)
  writeCart(items)
  renderCart()
}

const readOrders = (): OrderRecord[] => {
  const raw = localStorage.getItem(ORDERS_KEY)
  if (!raw) return []
  try {
    const items = JSON.parse(raw) as OrderRecord[]
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;')

const writeOrders = (orders: OrderRecord[]) => {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
  void pushCommerceStateToBackend()
}

const readCancelRequests = (): CancelRequestRecord[] => {
  const raw = localStorage.getItem(CANCEL_REQUESTS_KEY)
  if (!raw) return []
  try {
    const items = JSON.parse(raw) as CancelRequestRecord[]
    if (!Array.isArray(items)) return []
    return items.filter((x) => x && typeof x.id === 'string' && typeof x.orderId === 'string')
  } catch {
    return []
  }
}

const writeCancelRequests = (rows: CancelRequestRecord[]) => {
  localStorage.setItem(CANCEL_REQUESTS_KEY, JSON.stringify(rows))
}

const escapeCancelNote = (s: string): string =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;')

const populateCancelOrderSelect = () => {
  if (!cancelOrderSelect) return
  const prev = cancelOrderSelect.value
  const orders = readOrders()
  cancelOrderSelect.innerHTML =
    '<option value="">Seçiniz</option>' +
    orders.map((o) => `<option value="${o.id}">${o.id} — ${o.total}</option>`).join('')
  if (prev && orders.some((o) => o.id === prev)) cancelOrderSelect.value = prev
}

const closeCancelFormPanel = () => {
  if (cancelFormPanel) cancelFormPanel.style.display = 'none'
  cancelRequestForm?.reset()
  const tb = document.querySelector<HTMLElement>('#cancel-toolbar')
  if (tb) tb.style.display = 'flex'
}

const renderCancelSection = () => {
  populateCancelOrderSelect()
  const rows = readCancelRequests()
  if (!rows.length) {
    if (cancelEmptyEl) cancelEmptyEl.style.display = 'block'
    if (cancelListWrap) cancelListWrap.style.display = 'none'
    if (cancelListEl) cancelListEl.innerHTML = ''
    closeCancelFormPanel()
    return
  }
  if (cancelEmptyEl) cancelEmptyEl.style.display = 'none'
  if (cancelListWrap) cancelListWrap.style.display = 'block'
  if (!cancelListEl) return
  cancelListEl.innerHTML = rows
    .map(
      (r) => `
    <li class="cancel-list-item">
      <div>
        <strong>Sipariş ${r.orderId}</strong>
        <p class="cancel-list-meta">${new Date(r.createdAt).toLocaleString('tr-TR')} · ${r.status}</p>
        ${r.note ? `<p class="cancel-list-note">${escapeCancelNote(r.note)}</p>` : ''}
      </div>
      <button type="button" class="cancel-remove-btn" data-id="${r.id}">Kaldır</button>
    </li>`,
    )
    .join('')
}

const saveCurrentCartAsOrder = () => {
  const items = readCart()
  if (!items.length) return
  const subtotal = getCartTotal(items)
  const shippingPrice = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_PRICE
  const total = subtotal + shippingPrice
  const orders = readOrders()
  const orderId = `SP-${Date.now().toString().slice(-6)}`
  const order: OrderRecord = {
    id: orderId,
    createdAt: new Date().toLocaleString('tr-TR'),
    total: formatPrice(total),
    itemCount: getCartCount(items),
    items: items.map((item) => ({
      brand: item.brand,
      model: item.model,
      quantity: item.quantity,
      priceText: item.priceText,
    })),
    status: 'Yeni',
    trackingCode: orderId,
    fulfillmentUpdatedAt: null,
  }
  orders.unshift(order)
  writeOrders(orders)
}

const formatOrderTrackingHtml = (raw: string): string => {
  const t = raw.trim()
  if (!t) return '<span class="order-tracking-empty">—</span>'
  if (/^https?:\/\//i.test(t)) {
    try {
      const u = new URL(t)
      if (u.protocol !== 'http:' && u.protocol !== 'https:') return escapeHtml(t)
      const href = escapeHtml(u.href)
      const label = escapeHtml(t)
      return `<a href="${href}" class="order-tracking-link" target="_blank" rel="noopener noreferrer">${label}</a>`
    } catch {
      return escapeHtml(t)
    }
  }
  return `<span class="order-tracking-code">${escapeHtml(t)}</span>`
}

const renderOrders = () => {
  if (!ordersListEl) return
  const orders = readOrders()
  if (!orders.length) {
    ordersListEl.innerHTML = '<p class="orders-empty">Henuz tamamlanmis siparisiniz bulunmuyor.</p>'
    return
  }
  ordersListEl.innerHTML = orders
    .map(
      (order) => `
      <article class="order-card">
        <div class="order-card-head">
          <strong>${escapeHtml(order.id)}</strong>
          <span>${escapeHtml(order.createdAt)}</span>
        </div>
        <dl class="order-card-status">
          <div><dt>Durum</dt><dd>${escapeHtml(order.status ?? 'Yeni')}</dd></div>
          <div><dt>Takip no</dt><dd>${formatOrderTrackingHtml((order.trackingCode ?? '').trim() || order.id)}</dd></div>
        </dl>
        <p class="order-card-meta">Toplam Urun: ${order.itemCount} - Toplam Tutar: ${escapeHtml(order.total)}</p>
        <ul>
          ${order.items
            .map(
              (item) =>
                `<li>${escapeHtml(item.brand)} ${escapeHtml(item.model)} x${item.quantity} <span>${escapeHtml(item.priceText)}</span></li>`,
            )
            .join('')}
        </ul>
      </article>
    `,
    )
    .join('')
}

const readFavorites = (): FavoriteRecord[] => {
  const raw = localStorage.getItem(FAVORITES_KEY)
  if (!raw) return []
  try {
    const items = JSON.parse(raw) as FavoriteRecord[]
    return Array.isArray(items) ? items : []
  } catch {
    return []
  }
}

const writeFavorites = (items: FavoriteRecord[]) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(items))
  void pushCommerceStateToBackend()
}

const getFavoriteId = (brand: string, model: string): string => `${brand}__${model}`.toLowerCase()

const isFavorite = (brand: string, model: string): boolean =>
  readFavorites().some((item) => item.id === getFavoriteId(brand, model))

const renderFavoriteButtons = () => {
  document.querySelectorAll<HTMLElement>('.product-card, .category-product-card').forEach((card) => {
    if (!card.querySelector('.favorite-btn')) {
      const favoriteBtn = document.createElement('button')
      favoriteBtn.type = 'button'
      favoriteBtn.className = 'favorite-btn'
      favoriteBtn.setAttribute('aria-label', 'Favorilere ekle')
      favoriteBtn.textContent = '♡'
      card.prepend(favoriteBtn)
    }
    const product = getCardProduct(card)
    const btn = card.querySelector<HTMLButtonElement>('.favorite-btn')
    if (!product || !btn) return
    const active = isFavorite(product.brand, product.model)
    btn.classList.toggle('is-active', active)
    btn.textContent = active ? '♥' : '♡'
  })
}

const renderFavorites = () => {
  if (!favoritesListEl) return
  const items = readFavorites()
  if (!items.length) {
    favoritesListEl.innerHTML = '<p class="favorites-empty">Henuz favori urununuz yok.</p>'
    return
  }
  favoritesListEl.innerHTML = items
    .map(
      (item) => `
      <article class="favorite-card">
        <img src="${item.image}" alt="${item.brand} ${item.model}" />
        <div class="favorite-card-info">
          <strong>${item.brand}</strong>
          <p>${item.model}</p>
          <span>${item.price}</span>
        </div>
        <button type="button" class="favorite-remove-btn" data-id="${item.id}">Kaldir</button>
      </article>
    `,
    )
    .join('')
}

const toggleFavorite = (product: CatalogItem) => {
  const items = readFavorites()
  const id = getFavoriteId(product.brand, product.model)
  const exists = items.some((item) => item.id === id)
  const next = exists
    ? items.filter((item) => item.id !== id)
    : [
        ...items,
        { id, brand: product.brand, model: product.model, price: product.price, image: product.image, category: product.category },
      ]
  writeFavorites(next)
  renderFavoriteButtons()
  renderFavorites()
}

const getCatalogItemByAlertId = (id: string): CatalogItem | undefined =>
  catalogItems.find((p) => getFavoriteId(p.brand, p.model) === id)

/** Demo kampanya fiyati: liste fiyatina gore; hedef TL ile karsilastirma icin. */
const demoOfferPriceTl = (id: string, listPriceTl: number): number => {
  if (!Number.isFinite(listPriceTl) || listPriceTl <= 0) return 0
  let h = 0
  for (let i = 0; i < id.length; i++) h = (Math.imul(31, h) + id.charCodeAt(i)) | 0
  const u = Math.abs(h) % 38
  const factor = 0.57 + u / 100
  return Math.round(listPriceTl * factor * 100) / 100
}

const readPriceAlerts = (): PriceAlertRecord[] => {
  const raw = localStorage.getItem(PRICE_ALERTS_KEY)
  if (!raw) return []
  try {
    const items = JSON.parse(raw) as PriceAlertRecord[]
    if (!Array.isArray(items)) return []
    return items.filter(
      (x) =>
        x &&
        typeof x.id === 'string' &&
        typeof x.targetPriceTl === 'number' &&
        Number.isFinite(x.targetPriceTl) &&
        x.targetPriceTl >= 1,
    )
  } catch {
    return []
  }
}

const writePriceAlerts = (items: PriceAlertRecord[]) => {
  localStorage.setItem(PRICE_ALERTS_KEY, JSON.stringify(items))
}

const populatePriceAlarmSelect = () => {
  if (!priceAlarmProductSelect) return
  const prev = priceAlarmProductSelect.value
  priceAlarmProductSelect.innerHTML = [
    '<option value="">Ürün seçin…</option>',
    ...catalogItems.map((item) => {
      const pid = getFavoriteId(item.brand, item.model)
      return `<option value="${pid}">${item.brand} — ${item.model}</option>`
    }),
  ].join('')
  if (prev && catalogItems.some((p) => getFavoriteId(p.brand, p.model) === prev)) {
    priceAlarmProductSelect.value = prev
  }
}

const renderPriceAlerts = () => {
  if (!priceAlarmListEl) return
  const rows = readPriceAlerts()
  if (!rows.length) {
    priceAlarmListEl.innerHTML = '<p class="favorites-empty">Henüz fiyat alarmınız yok.</p>'
    return
  }
  priceAlarmListEl.innerHTML = rows
    .map((row) => {
      const listTl = parsePrice(row.price)
      const demo = demoOfferPriceTl(row.id, listTl)
      const isAlert = demo > 0 && demo <= row.targetPriceTl
      return `
      <article class="favorite-card stock-alarm-card${isAlert ? ' stock-alarm-card--alert' : ''}">
        <img src="${row.image}" alt="${row.brand} ${row.model}" />
        <div class="favorite-card-info">
          <strong>${row.brand}</strong>
          <p>${row.model}</p>
          <span>${row.price}</span>
          <p class="stock-alarm-meta">Hedef: <strong>${formatPrice(row.targetPriceTl)}</strong> · Örnek kampanya: <strong>${formatPrice(demo)}</strong></p>
          ${isAlert ? '<p class="stock-alarm-badge">Hedef fiyatın altında (örnek)</p>' : ''}
        </div>
        <button type="button" class="price-alarm-remove-btn" data-id="${row.id}">Kaldır</button>
      </article>
    `
    })
    .join('')
}

const openCheckoutModal = () => {
  if (!checkoutModal) return
  const items = readCart()
  if (!items.length) {
    if (checkoutStatusEl) checkoutStatusEl.textContent = 'Sepetiniz bosken odeme yapilamaz.'
    return
  }
  const subtotal = getCartTotal(items)
  const shippingPrice = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_PRICE
  const total = subtotal + shippingPrice
  if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(total)
  if (checkoutStatusEl) checkoutStatusEl.textContent = ''
  checkoutModal.classList.add('is-open')
  checkoutModal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
  checkoutName?.focus()
}

const closeCheckoutModal = () => {
  if (!checkoutModal) return
  checkoutModal.classList.remove('is-open')
  checkoutModal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
  checkoutForm?.reset()
}

menuTrigger?.addEventListener('click', () => {
  const isOpen = menuPanel?.classList.toggle('is-open') ?? false
  menuTrigger.setAttribute('aria-expanded', String(isOpen))
})

document.addEventListener('pointerdown', (event) => {
  const target = event.target as Node
  if (menuPanel?.classList.contains('is-open')) {
    const menuDropdown = document.querySelector<HTMLElement>('.menu-dropdown')
    if (!menuDropdown?.contains(target)) closeMenuPanel()
  }
  if (cartPanel?.classList.contains('is-open')) {
    const isInsideCart = cartPanel.contains(target)
    const isCartOpenButton = cartOpenBtn?.contains(target) ?? false
    if (!isInsideCart && !isCartOpenButton) closeCartPanel()
  }
})

const openAuthModal = () => {
  if (!authModal) return
  document.querySelectorAll<HTMLInputElement>('#login-pane input, #register-pane input').forEach((input) => {
    if (input.type === 'checkbox') input.checked = false
    else input.value = ''
  })
  authModal.classList.add('is-open')
  authModal.setAttribute('aria-hidden', 'false')
  document.body.classList.add('modal-open')
  document.querySelector<HTMLInputElement>('#login-email')?.focus()
}

const closeAuthModal = () => {
  if (!authModal) return
  authModal.classList.remove('is-open')
  authModal.setAttribute('aria-hidden', 'true')
  document.body.classList.remove('modal-open')
}

authOpenBtn?.addEventListener('click', () => {
  const currentUser = getCurrentUser()
  if (currentUser) {
    accountMenuWrap?.classList.toggle('is-open')
    const isOpen = accountMenuWrap?.classList.contains('is-open')
    accountMenu?.setAttribute('aria-hidden', isOpen ? 'false' : 'true')
    return
  }
  closeAccountMenu()
  setAccountVisible(false)
  setActiveTab('login')
  openAuthModal()
})

authModal?.querySelectorAll<HTMLElement>('[data-close-auth]').forEach((el) => {
  el.addEventListener('click', () => closeAuthModal())
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuPanel?.classList.contains('is-open')) {
    closeMenuPanel()
  }
  if (event.key === 'Escape' && accountMenuWrap?.classList.contains('is-open')) {
    closeAccountMenu()
  }
  if (event.key === 'Escape' && cartPanel?.classList.contains('is-open')) {
    closeCartPanel()
  }
  if (event.key === 'Escape' && checkoutModal?.classList.contains('is-open')) {
    closeCheckoutModal()
  }
  if (event.key === 'Escape' && authModal?.classList.contains('is-open')) {
    closeAuthModal()
  }
})

document.addEventListener('pointerdown', (event) => {
  const target = event.target as Node
  if (!accountMenuWrap?.contains(target)) {
    closeAccountMenu()
  }
})

document.querySelectorAll<HTMLButtonElement>('.password-toggle').forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const targetId = toggle.dataset.target
    if (!targetId) return
    const input = document.querySelector<HTMLInputElement>(`#${targetId}`)
    if (!input) return
    const shouldShow = input.type === 'password'
    input.type = shouldShow ? 'text' : 'password'
    toggle.classList.toggle('is-visible', shouldShow)
    toggle.setAttribute('aria-label', shouldShow ? 'Şifreyi gizle' : 'Şifreyi göster')
  })
})

document.querySelector<HTMLInputElement>('#register-password')?.addEventListener('input', (event) => {
  const value = (event.target as HTMLInputElement).value
  updatePasswordRuleUI(value)
})

const setStatus = (message: string) => {
  if (statusEl) statusEl.textContent = message
}

const translations: Record<string, string> = {
  'top.searchPlaceholder': 'Ürün ara...',
  'auth.loggedOut': 'Üye Girişi / Üye Ol',
  'auth.loggedIn': 'Hesabım',
  'menu.contents': 'İçerikler',
  'menu.home': 'Anasayfa',
  'menu.categories': 'Kategoriler',
  'menu.women': 'Kadın',
  'menu.men': 'Erkek',
  'menu.kids': 'Çocuk',
  'menu.popularBrands': 'Popüler Markalar',
  'menu.help': 'Yardım & Destek',
  'menu.contact': 'İletişim',
  'menu.orderTracking': 'Sipariş Takibi',
  'top.myOrders': 'Tüm Siparişlerim',
  'hero.caption': 'Minimal ve Zamansız',
  'hero.title': 'Kadın, Erkek ve Çocuk Gözlük Modelleri',
  'hero.intro':
    'Kadın, erkek ve çocuk seçkimizde siyahın asaleti beyazın yalınlığıyla buluşuyor. Gün boyu konfor sunan premium çerçevelerle stilinizi rafine bir dokunuşla tamamlayın.',
  'hero.cta': 'Alışverişe Başla',
}

const t = (key: string): string => translations[key] ?? key

const applyTranslations = () => {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (!key) return
    el.textContent = t(key)
  })
  document.querySelectorAll<HTMLInputElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder
    if (!key) return
    el.placeholder = t(key)
  })

  const bestSellersTitle = document.querySelector<HTMLElement>('.best-sellers-head h2')
  if (bestSellersTitle) bestSellersTitle.textContent = '🔥 Çok Satanlar'

  const seeAllLink = document.querySelector<HTMLElement>('.see-all')
  if (seeAllLink) seeAllLink.textContent = 'Tümünü Gör'

  const menuBtn = document.querySelector<HTMLButtonElement>('.menu-trigger')
  if (menuBtn) menuBtn.setAttribute('aria-label', 'Menü')

  document.querySelector<HTMLElement>('.favorites-open')?.setAttribute('aria-label', 'Favoriler')
  document.querySelector<HTMLElement>('.cart-open')?.setAttribute('aria-label', 'Sepetim')

  document.documentElement.lang = 'tr'
}

const syncCategoryTitle = () => {
  const categoryMap: Record<CategoryKey, string> = {
    kadin: 'KADIN GÜNEŞ GÖZLÜKLERİ',
    erkek: 'ERKEK GÜNEŞ GÖZLÜKLERİ',
    cocuk: 'ÇOCUK GÜNEŞ GÖZLÜKLERİ',
  }
  if (!categoryTitle) return
  const baseTitle = categoryMap[currentCategoryView]
  const brandSuffix = (filterBrand?.value ?? categoryFilters.brand ?? '').trim()
  categoryTitle.textContent = brandSuffix ? `${baseTitle} - ${brandSuffix.toUpperCase()}` : baseTitle
}

const evaluatePasswordRules = (password: string) => {
  const length = password.length >= 8
  const upper = /[A-Z]/.test(password)
  const lower = /[a-z]/.test(password)
  const digit = /[0-9]/.test(password)
  const special = /[!@#$]/.test(password)
  return { length, upper, lower, digit, special }
}

const isPasswordValid = (password: string): boolean => {
  const checks = evaluatePasswordRules(password)
  return checks.length && checks.upper && checks.lower && checks.digit && checks.special
}

const updatePasswordRuleUI = (password: string) => {
  const checks = evaluatePasswordRules(password)
  ;(Object.keys(checks) as Array<keyof typeof checks>).forEach((rule) => {
    const item = document.querySelector<HTMLElement>(`.password-rules li[data-rule="${rule}"]`)
    if (!item) return
    item.classList.toggle('met', checks[rule])
  })
}

const readGiftPoints = (): number => {
  const raw = Number(localStorage.getItem(GIFT_POINTS_KEY) ?? 0)
  if (Number.isNaN(raw) || raw < 0) return 0
  return Math.floor(raw)
}

const writeGiftPoints = (points: number) => {
  localStorage.setItem(GIFT_POINTS_KEY, String(Math.max(0, Math.floor(points))))
  void pushCommerceStateToBackend()
}

const refreshGiftSummary = () => {
  const points = readGiftPoints()
  if (giftTotalPointsEl) giftTotalPointsEl.textContent = String(points)
  if (giftTotalAmountEl) giftTotalAmountEl.textContent = String(points)
}

const getCurrentUser = (): User | undefined => {
  const sessionEmail = (localStorage.getItem(SESSION_KEY) ?? '').toLowerCase()
  if (!sessionEmail) return undefined
  const info = readUserInfo()
  if (!info || info.email !== sessionEmail) return undefined
  return { ...info, password: '' }
}

const hideAdminPanel = () => {
  clearAdminAppHashIfPresent()
  if (adminSection) adminSection.style.display = 'none'
}

const hideFavoritesAndAlarmSections = () => {
  if (favoritesSection) favoritesSection.style.display = 'none'
  if (priceAlarmSection) priceAlarmSection.style.display = 'none'
}

const hideReturnAndCancelSections = () => {
  if (returnSection) returnSection.style.display = 'none'
  if (cancelSection) cancelSection.style.display = 'none'
  if (reviewsSection) reviewsSection.style.display = 'none'
  if (wishlistSection) wishlistSection.style.display = 'none'
}

const setAccountVisible = (isVisible: boolean) => {
  if (accountSection) accountSection.style.display = isVisible ? 'grid' : 'none'
  if (isVisible) {
    hideAdminPanel()
    if (heroSection) heroSection.style.display = 'none'
    if (categorySection) categorySection.style.display = 'none'
    if (homeShopRibbon) homeShopRibbon.style.display = 'none'
    if (supportSection) supportSection.style.display = 'none'
    hideReturnAndCancelSections()
    if (profileSection) profileSection.style.display = 'none'
    if (addressSection) addressSection.style.display = 'none'
    if (giftSection) giftSection.style.display = 'none'
    if (shoppingCartSection) shoppingCartSection.style.display = 'none'
    if (productDetailSection) productDetailSection.style.display = 'none'
    if (ordersSection) ordersSection.style.display = 'none'
    hideFavoritesAndAlarmSections()
  } else {
    const categoryOpen = Boolean(categorySection && categorySection.style.display === 'block')
    if (heroSection) heroSection.style.display = categoryOpen ? 'none' : 'block'
    if (homeShopRibbon && !categoryOpen) homeShopRibbon.style.display = 'block'
  }
}

const setCategoryVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (categorySection) categorySection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection && isVisible) accountSection.style.display = 'none'
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : 'block'
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setSupportVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (supportSection) supportSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setReturnVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (returnSection) returnSection.style.display = isVisible ? 'block' : 'none'
  if (isVisible && cancelSection) cancelSection.style.display = 'none'
  if (isVisible && reviewsSection) reviewsSection.style.display = 'none'
  if (isVisible && wishlistSection) wishlistSection.style.display = 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setCancelVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (cancelSection) cancelSection.style.display = isVisible ? 'block' : 'none'
  if (isVisible && returnSection) returnSection.style.display = 'none'
  if (isVisible && reviewsSection) reviewsSection.style.display = 'none'
  if (isVisible && wishlistSection) wishlistSection.style.display = 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) {
    hideFavoritesAndAlarmSections()
    renderCancelSection()
  } else {
    closeCancelFormPanel()
  }
}

const setReviewsVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (reviewsSection) reviewsSection.style.display = isVisible ? 'block' : 'none'
  if (isVisible && returnSection) returnSection.style.display = 'none'
  if (isVisible && cancelSection) cancelSection.style.display = 'none'
  if (isVisible && wishlistSection) wishlistSection.style.display = 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setWishlistVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (wishlistSection) wishlistSection.style.display = isVisible ? 'block' : 'none'
  if (isVisible && returnSection) returnSection.style.display = 'none'
  if (isVisible && cancelSection) cancelSection.style.display = 'none'
  if (isVisible && reviewsSection) reviewsSection.style.display = 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) {
    hideFavoritesAndAlarmSections()
    populateWishlistDateSelects()
    renderWishlistTable()
  }
}

const setProfileVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (profileSection) profileSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setAddressVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (addressSection) addressSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setGiftVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (giftSection) giftSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) hideFavoritesAndAlarmSections()
}

const setShoppingCartVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (shoppingCartSection) shoppingCartSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) {
    hideFavoritesAndAlarmSections()
    renderShoppingCartPage()
  }
}

const setOrdersVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (ordersSection) ordersSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  hideFavoritesAndAlarmSections()
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) void pullCommerceStateFromBackend().then(() => renderOrders())
}

const setFavoritesVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (favoritesSection) favoritesSection.style.display = isVisible ? 'block' : 'none'
  if (isVisible && priceAlarmSection) priceAlarmSection.style.display = 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) renderFavorites()
}

const setPriceAlarmVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (priceAlarmSection) priceAlarmSection.style.display = isVisible ? 'block' : 'none'
  if (isVisible && favoritesSection) favoritesSection.style.display = 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
  if (isVisible) {
    populatePriceAlarmSelect()
    if (priceAlarmFormStatus) priceAlarmFormStatus.textContent = ''
    renderPriceAlerts()
  }
}

const setProductDetailVisible = (isVisible: boolean) => {
  if (isVisible) hideAdminPanel()
  if (productDetailSection) productDetailSection.style.display = isVisible ? 'block' : 'none'
  if (heroSection) heroSection.style.display = isVisible ? 'none' : 'block'
  if (accountSection) accountSection.style.display = isVisible ? 'none' : accountSection.style.display
  if (categorySection) categorySection.style.display = isVisible ? 'none' : categorySection.style.display
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  hideFavoritesAndAlarmSections()
  if (homeShopRibbon) homeShopRibbon.style.display = isVisible ? 'none' : homeShopRibbon.style.display
}

const ORDER_STATUS_OPTIONS = ['Yeni', 'Hazırlanıyor', 'Kargolandı', 'Teslim Edildi', 'İptal', 'İade']

const BEST_SELLER_HOME_ORDER: ReadonlyArray<readonly [string, string]> = [
  ['Ray-Ban', 'RB2198 Kahverengi Unisex Gunes Gozlugu'],
  ['Ray-Ban', 'RB3547 Siyah Kadin Gunes Gozlugu'],
  ['Burberry', 'BE4437U Kahverengi Erkek Gunes Gozlugu'],
  ['Miu Miu', 'MU 56ZS Gold Kadin Gunes Gozlugu'],
  ['Versace', 'VE2198 Siyah Kadin Gunes Gozlugu'],
  ['Mess Frames', 'Indoor Kahverengi Unisex Gunes Gozlugu'],
]

const renderBestSellersHome = () => {
  const grid = document.querySelector<HTMLElement>('#best-sellers-grid')
  if (!grid) return
  const parts: string[] = []
  for (const [brand, model] of BEST_SELLER_HOME_ORDER) {
    const item = catalogItems.find((p) => p.brand === brand && p.model === model)
    if (!item) continue
    parts.push(`
      <article class="product-card">
        <span class="product-badge">Çok Satan</span>
        <div class="product-image">
          <img src="${escapeHtml(item.image)}" alt="${escapeHtml(`${item.brand} ${item.model}`)}" onerror="this.onerror=null;this.src='/products/product-2.png';" />
        </div>
        <h3>${escapeHtml(item.brand)}</h3>
        <p class="product-model">${escapeHtml(item.model)}</p>
        <p class="product-price">${escapeHtml(item.price)}</p>
        <button type="button" class="add-to-cart-btn" data-brand="${escapeHtml(item.brand)}" data-model="${escapeHtml(item.model)}" data-price="${escapeHtml(item.price)}" data-image="${escapeHtml(item.image)}">Sepete Ekle</button>
      </article>
    `)
  }
  grid.innerHTML = parts.join('')
}

const readWishlistEntries = (): WishlistEntryRecord[] => {
  const raw = localStorage.getItem(WISHLISTS_KEY)
  if (!raw) return []
  try {
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed
      .filter((row): row is WishlistEntryRecord => {
        return (
          typeof row === 'object' &&
          row !== null &&
          typeof (row as WishlistEntryRecord).id === 'string' &&
          typeof (row as WishlistEntryRecord).title === 'string'
        )
      })
      .map((row) => ({
        ...row,
        importance: String(row.importance ?? ''),
        day: String(row.day ?? ''),
        month: String(row.month ?? ''),
        year: String(row.year ?? ''),
        title: String(row.title ?? ''),
        description: String(row.description ?? ''),
        isDefault: Boolean(row.isDefault),
        isActive: row.isActive !== false,
        createdAt: String(row.createdAt ?? ''),
      }))
  } catch {
    return []
  }
}

const writeWishlistEntries = (rows: WishlistEntryRecord[]) => {
  localStorage.setItem(WISHLISTS_KEY, JSON.stringify(rows))
}

const WISHLIST_TURKISH_MONTHS = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık',
]

const populateWishlistDateSelects = () => {
  if (!wishlistDay || !wishlistMonth || !wishlistYear) return
  if (wishlistDay.options.length > 0) return

  const addPlaceholder = (select: HTMLSelectElement, label: string) => {
    const opt = document.createElement('option')
    opt.value = ''
    opt.disabled = true
    opt.selected = true
    opt.textContent = label
    select.appendChild(opt)
  }

  addPlaceholder(wishlistDay, 'Gün')
  for (let d = 1; d <= 31; d += 1) {
    const opt = document.createElement('option')
    opt.value = String(d)
    opt.textContent = String(d)
    wishlistDay.appendChild(opt)
  }

  addPlaceholder(wishlistMonth, 'Ay')
  WISHLIST_TURKISH_MONTHS.forEach((name, i) => {
    const opt = document.createElement('option')
    opt.value = String(i + 1)
    opt.textContent = name
    wishlistMonth.appendChild(opt)
  })

  addPlaceholder(wishlistYear, 'Yıl')
  const y = new Date().getFullYear()
  for (let yr = y - 2; yr <= y + 6; yr += 1) {
    const opt = document.createElement('option')
    opt.value = String(yr)
    opt.textContent = String(yr)
    wishlistYear.appendChild(opt)
  }
}

const resetWishlistForm = () => {
  wishlistForm?.reset()
  if (wishlistActive) wishlistActive.checked = true
}

const renderWishlistTable = () => {
  if (!wishlistTableBody) return
  const rows = readWishlistEntries().sort((a, b) => {
    const ta = new Date(a.createdAt).getTime()
    const tb = new Date(b.createdAt).getTime()
    return (Number.isFinite(tb) ? tb : 0) - (Number.isFinite(ta) ? ta : 0)
  })
  if (rows.length === 0) {
    wishlistTableBody.innerHTML =
      '<tr><td colspan="5" class="wishlist-empty-cell">Henüz kayıt yok.</td></tr>'
    return
  }
  wishlistTableBody.innerHTML = rows
    .map((r) => {
      const status = r.isActive ? 'Aktif' : 'Pasif'
      const safeId = escapeHtml(r.id)
      return `<tr>
        <td class="wishlist-td-check"><input type="checkbox" disabled aria-hidden="true" /></td>
        <td>${escapeHtml(r.title)}</td>
        <td>${escapeHtml(status)}</td>
        <td>${escapeHtml(r.importance)}</td>
        <td class="wishlist-td-action"><button type="button" class="wishlist-remove-btn" data-wishlist-id="${safeId}">Sil</button></td>
      </tr>`
    })
    .join('')
}

/** Yonetim paneli yalnizca bu hash ile acilir; magaza sayfasinda gorunmez. */
const ADMIN_APP_HASH = '#admin'

const normalizeLocationHash = () => location.hash.split('?')[0].toLowerCase()

const isAdminAppHash = (): boolean => {
  const h = normalizeLocationHash()
  return h === '#admin' || h === '#/admin'
}

const clearAdminAppHashIfPresent = () => {
  if (!isAdminAppHash()) return
  history.replaceState(null, '', `${location.pathname}${location.search}`)
}

const setAdminVisible = (isVisible: boolean) => {
  if (!adminSection) return
  if (!isVisible) {
    clearAdminAppHashIfPresent()
    adminSection.style.display = 'none'
    if (heroSection) heroSection.style.display = 'block'
    if (homeShopRibbon) homeShopRibbon.style.display = 'block'
    return
  }
  if (!isAdminAppHash()) {
    location.hash = ADMIN_APP_HASH
    return
  }
  adminSection.style.display = 'block'
  if (heroSection) heroSection.style.display = 'none'
  if (accountSection) accountSection.style.display = 'none'
  if (categorySection) categorySection.style.display = 'none'
  if (supportSection) supportSection.style.display = 'none'
  hideReturnAndCancelSections()
  if (profileSection) profileSection.style.display = 'none'
  if (addressSection) addressSection.style.display = 'none'
  if (giftSection) giftSection.style.display = 'none'
  if (shoppingCartSection) shoppingCartSection.style.display = 'none'
  if (productDetailSection) productDetailSection.style.display = 'none'
  if (ordersSection) ordersSection.style.display = 'none'
  hideFavoritesAndAlarmSections()
  if (homeShopRibbon) homeShopRibbon.style.display = 'none'
  closeMenuPanel()
  closeAuthModal()
  switchAdminTab('dashboard')
  updateAdminGate()
  void refreshAdminData()
}

const applyAdminRoute = () => {
  if (isAdminAppHash()) {
    setAdminVisible(true)
    return
  }
  setAdminVisible(false)
}

const switchAdminTab = (tab: string) => {
  document.querySelectorAll<HTMLElement>('.admin-nav').forEach((el) => {
    el.classList.toggle('active', el.dataset.adminTab === tab)
  })
  document.querySelectorAll<HTMLElement>('.admin-tab-pane').forEach((el) => {
    el.classList.toggle('active', el.dataset.adminPane === tab)
  })
}

const updateAdminGate = () => {
  const token = getAdminToken()
  if (adminLoginGate) adminLoginGate.style.display = token ? 'none' : 'block'
  if (adminPanelBody) adminPanelBody.style.display = token ? 'block' : 'none'
}

const clearAdminTokenIfAuthError = (res: Response) => {
  if (res.status === 401 || res.status === 503) {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    invalidateCsrfToken()
    updateAdminGate()
  }
}

const renderAdminBarChart = (container: HTMLElement | null, rows: Array<{ label: string; amount: number }>) => {
  if (!container) return
  const max = Math.max(...rows.map((r) => r.amount), 1)
  container.innerHTML = rows
    .map(
      (r) => `
        <div class="admin-bar-row">
          <span class="admin-bar-label">${escapeHtml(r.label)}</span>
          <div class="admin-bar-track"><div class="admin-bar-fill" style="width:${Math.min(100, (r.amount / max) * 100)}%"></div></div>
          <span class="admin-bar-value">${r.amount.toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} TL</span>
        </div>`,
    )
    .join('')
}

const syncAdminCatalogIfNeeded = async () => {
  if (!getAdminToken()) return
  const res = await adminFetch('/admin/products')
  if (!res.ok) return
  const list = (await res.json()) as unknown[]
  if (Array.isArray(list) && list.length > 0) return
  await adminFetch('/admin/sync-catalog', {
    method: 'POST',
    body: JSON.stringify({
      products: catalogItems.map((p) => ({
        brand: p.brand,
        model: p.model,
        category: p.category,
        price: p.price,
      })),
    }),
  })
}

const renderAdminProducts = async () => {
  if (!adminProductsBody || !getAdminToken()) return
  const res = await adminFetch('/admin/products')
  if (!res.ok) return
  const products = (await res.json()) as Array<{
    sku: string
    brand: string
    model: string
    category: string
    priceText: string
    stock: number
    vatRate?: number
    variants: unknown
    digitalUrl: string
  }>
  const variantsText = (v: unknown) => {
    try {
      return escapeHtml(JSON.stringify(v ?? []))
    } catch {
      return '[]'
    }
  }
  const vatOpts = (current: number | undefined) =>
    [1, 10, 20]
      .map(
        (v) =>
          `<option value="${v}"${(current ?? 20) === v ? ' selected' : ''}>${v}</option>`,
      )
      .join('')
  adminProductsBody.innerHTML = products
    .map(
      (p) => `
      <tr data-sku="${escapeHtml(p.sku)}">
        <td>${escapeHtml(p.brand)}</td>
        <td>${escapeHtml(p.model)}</td>
        <td>${escapeHtml(p.category)}</td>
        <td><input type="text" class="admin-inp-price" value="${escapeHtml(p.priceText)}" /></td>
        <td><input type="number" class="admin-inp-stock" value="${p.stock}" min="0" /></td>
        <td><select class="admin-inp-vat">${vatOpts(p.vatRate)}</select></td>
        <td><input type="text" class="admin-inp-variants" value="${variantsText(p.variants)}" /></td>
        <td><input type="url" class="admin-inp-digital" value="${escapeHtml(p.digitalUrl ?? '')}" placeholder="https://..." /></td>
        <td><button type="button" class="admin-save-row">Kaydet</button></td>
      </tr>`,
    )
    .join('')
}

type AdminOrderRow = OrderRecord & { customerEmail: string; status: string; trackingCode: string }

const renderAdminOrders = async () => {
  if (!adminOrdersBody || !getAdminToken()) return
  const res = await adminFetch('/admin/orders')
  if (!res.ok) return
  const orders = (await res.json()) as AdminOrderRow[]
  adminOrdersBody.innerHTML = orders
    .map(
      (o) => `
      <tr data-order-id="${escapeHtml(o.id)}" data-customer="${escapeHtml(o.customerEmail)}">
        <td>${escapeHtml(o.id)}</td>
        <td>${escapeHtml(o.customerEmail)}</td>
        <td>${escapeHtml(o.createdAt)}</td>
        <td>${escapeHtml(o.total)}</td>
        <td><select class="admin-order-status">${ORDER_STATUS_OPTIONS.map((s) => `<option value="${escapeHtml(s)}"${s === o.status ? ' selected' : ''}>${escapeHtml(s)}</option>`).join('')}</select></td>
        <td><input type="text" class="admin-tracking" value="${escapeHtml(o.trackingCode ?? '')}" placeholder="Takip no" /></td>
        <td><button type="button" class="admin-save-order">Kaydet</button></td>
      </tr>`,
    )
    .join('')
}

const MEMBERSHIP_TIERS = ['standart', 'vip', 'bayi'] as const

type SiteConfigMarketingCampaign = {
  id?: string
  type?: string
  label?: string
  active?: boolean
  thresholdTl?: number
  note?: string
}

let lastCmsPages: Array<{ slug: string; title: string; body: string }> = []

const fillAdminCmsPageEditor = (slug: string) => {
  const p = lastCmsPages.find((x) => x.slug === slug)
  const titleEl = document.querySelector<HTMLInputElement>('#admin-cms-page-title')
  const bodyEl = document.querySelector<HTMLTextAreaElement>('#admin-cms-page-body')
  if (!p || !titleEl || !bodyEl) return
  titleEl.value = p.title
  bodyEl.value = p.body
}

const loadAdminTabData = (tab: string) => {
  if (!getAdminToken()) return
  switch (tab) {
    case 'products':
      void renderAdminProducts()
      break
    case 'orders':
      void renderAdminOrders()
      break
    case 'customers':
      void renderAdminCustomers()
      void renderAdminReviews()
      break
    case 'marketing':
      void renderAdminMarketing()
      break
    case 'finance':
      void renderAdminFinance()
      break
    case 'cms':
      void renderAdminCms()
      break
    case 'technical':
      void renderAdminTechnical()
      void renderAdminAudit()
      break
    default:
      break
  }
}

const renderAdminCustomers = async () => {
  const body = document.querySelector<HTMLElement>('#admin-customers-body')
  if (!body || !getAdminToken()) return
  const res = await adminFetch('/admin/customers')
  if (!res.ok) return
  const rows = (await res.json()) as Array<{
    email: string
    name: string
    surname: string
    orderCount: number
    totalSpend: number
    cartItemCount: number
    cartPreview: Array<{ brand: string; model: string; quantity: number }>
    tier: string
    discountPercent: number
  }>
  body.innerHTML =
    rows.length === 0
      ? '<tr><td colspan="8">Kayıtlı müşteri yok</td></tr>'
      : rows
          .map((c) => {
            const previewRaw =
              c.cartPreview?.length > 0
                ? c.cartPreview.map((x) => `${x.quantity}× ${x.brand} ${x.model}`).join('; ')
                : '—'
            const preview = previewRaw === '—' ? '—' : previewRaw.slice(0, 240)
            const tierOpts = MEMBERSHIP_TIERS.map(
              (t) =>
                `<option value="${t}"${c.tier === t || String(c.tier).toLowerCase() === t ? ' selected' : ''}>${t === 'standart' ? 'Standart' : t === 'vip' ? 'VIP' : 'Bayi'}</option>`,
            ).join('')
            return `
      <tr data-customer-email="${escapeHtml(c.email)}">
        <td>${escapeHtml(c.name)} ${escapeHtml(c.surname)}<br /><small>${escapeHtml(c.email)}</small></td>
        <td>${c.orderCount}</td>
        <td>${c.totalSpend.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</td>
        <td>${c.cartItemCount}</td>
        <td><small>${escapeHtml(preview)}</small></td>
        <td><select class="admin-tier-select">${tierOpts}</select></td>
        <td><input type="number" class="admin-discount-inp" min="0" max="100" step="0.1" value="${c.discountPercent}" /></td>
        <td><button type="button" class="admin-save-customer">Kaydet</button></td>
      </tr>`
          })
          .join('')
}

const REVIEW_STATUS_OPTS = ['beklemede', 'onaylandi', 'reddedildi'] as const

const renderAdminReviews = async () => {
  const body = document.querySelector<HTMLElement>('#admin-reviews-body')
  if (!body || !getAdminToken()) return
  const res = await adminFetch('/admin/reviews')
  if (!res.ok) return
  const rows = (await res.json()) as Array<{
    id: string
    email: string
    sku: string
    rating: number
    comment: string
    status: string
    reply: string
    createdAt: string
  }>
  body.innerHTML =
    rows.length > 0
      ? rows
          .map(
            (r) => `
      <tr data-review-id="${escapeHtml(r.id)}">
        <td>${escapeHtml(r.createdAt)}</td>
        <td>${escapeHtml(r.email)}</td>
        <td><small>${escapeHtml(r.sku)}</small></td>
        <td>${r.rating}</td>
        <td>${escapeHtml(r.comment)}</td>
        <td><select class="admin-review-status">${REVIEW_STATUS_OPTS.map((s) => `<option value="${s}"${r.status === s ? ' selected' : ''}>${s}</option>`).join('')}</select></td>
        <td><input type="text" class="admin-review-reply" value="${escapeHtml(r.reply)}" placeholder="Yanıt" /></td>
        <td><button type="button" class="admin-save-review">Kaydet</button></td>
      </tr>`,
          )
          .join('')
      : `<tr><td colspan="8"></td></tr>`
}

const renderAdminMarketing = async () => {
  if (!getAdminToken()) return
  const [cfgRes, coupRes] = await Promise.all([adminFetch('/admin/site-config'), adminFetch('/admin/coupons')])
  if (!cfgRes.ok) return
  const cfg = (await cfgRes.json()) as {
    marketing: { campaigns: SiteConfigMarketingCampaign[] }
    cartReminder: { enabled?: boolean; hoursSinceCartEdit?: number; lastDryRunInfo?: string }
  }
  const editor = document.querySelector<HTMLElement>('#admin-campaigns-editor')
  if (editor) {
    const camps = cfg.marketing?.campaigns ?? []
    editor.innerHTML = camps
      .map((c) => {
        const id = escapeHtml(String(c.id ?? ''))
        const shipping = c.type === 'shipping'
        return `
        <div class="admin-campaign-row" data-campaign-id="${id}">
          <label class="admin-check">
            <input type="checkbox" class="admin-camp-active" ${c.active ? 'checked' : ''} />
            <strong>${escapeHtml(String(c.label ?? ''))}</strong>
          </label>
          ${
            shipping
              ? `<label class="admin-threshold-label">Eşik (TL)
            <input type="number" class="admin-camp-threshold" min="0" step="1" value="${Number(c.thresholdTl ?? 1000)}" />
          </label>`
              : ''
          }
          ${c.note ? `<p class="admin-muted">${escapeHtml(String(c.note))}</p>` : ''}
        </div>`
      })
      .join('')
  }
  const st = document.querySelector<HTMLElement>('#admin-cart-reminder-status')
  if (st) {
    st.textContent = cfg.cartReminder?.lastDryRunInfo
      ? cfg.cartReminder.lastDryRunInfo
      : 'Önizleme veya gönderim sonrası bilgi burada görünür.'
  }
  const hoursEl = document.querySelector<HTMLInputElement>('#admin-cart-reminder-hours')
  if (hoursEl && cfg.cartReminder?.hoursSinceCartEdit) hoursEl.value = String(cfg.cartReminder.hoursSinceCartEdit)

  const coupBody = document.querySelector<HTMLElement>('#admin-coupons-body')
  if (coupRes.ok && coupBody) {
    const coupons = (await coupRes.json()) as Array<{
      code: string
      kind: string
      value: number
      minCart: number
      expiresAt: string | null
      active: boolean
    }>
    coupBody.innerHTML = coupons.length
      ? coupons
          .map(
            (x) => `
      <tr>
        <td><strong>${escapeHtml(x.code)}</strong></td>
        <td>${escapeHtml(x.kind)}</td>
        <td>${x.value}</td>
        <td>${x.minCart}</td>
        <td>${x.expiresAt ? escapeHtml(x.expiresAt.slice(0, 10)) : '—'}</td>
        <td>${x.active ? 'Aktif' : 'Pasif'}</td>
        <td><button type="button" class="admin-delete-coupon" data-code="${escapeHtml(x.code)}">Sil</button></td>
      </tr>`,
          )
          .join('')
      : '<tr><td colspan="7">Kayıtlı kupon yok</td></tr>'
  }
}

const renderAdminFinance = async () => {
  if (!getAdminToken()) return
  const res = await adminFetch('/admin/site-config')
  if (!res.ok) return
  const cfg = (await res.json()) as {
    payment: {
      virtualPosProvider?: string
      bankTransfer?: boolean
      cashOnDelivery?: boolean
      notes?: string
    }
    finance: { installments?: unknown[]; defaultVatPercent?: number }
  }
  const prov = document.querySelector<HTMLInputElement>('#admin-pay-provider')
  if (prov) prov.value = cfg.payment?.virtualPosProvider ?? ''
  const bank = document.querySelector<HTMLInputElement>('#admin-pay-bank')
  if (bank) bank.checked = cfg.payment?.bankTransfer !== false
  const cod = document.querySelector<HTMLInputElement>('#admin-pay-cod')
  if (cod) cod.checked = cfg.payment?.cashOnDelivery !== false
  const notes = document.querySelector<HTMLTextAreaElement>('#admin-pay-notes')
  if (notes) notes.value = cfg.payment?.notes ?? ''
  const inst = document.querySelector<HTMLTextAreaElement>('#admin-installments-json')
  if (inst) {
    try {
      inst.value = JSON.stringify(cfg.finance?.installments ?? [], null, 2)
    } catch {
      inst.value = '[]'
    }
  }
  const dv = document.querySelector<HTMLInputElement>('#admin-default-vat')
  if (dv) dv.value = String(cfg.finance?.defaultVatPercent ?? 20)
}

const renderAdminTechnical = async () => {
  if (!getAdminToken()) return
  const res = await adminFetch('/admin/site-config')
  if (!res.ok) return
  const cfg = (await res.json()) as {
    seo: { siteTitle?: string; metaDescription?: string; robotsTxt?: string; sitemapNote?: string }
    security: { rolesDescription?: string; backupNote?: string }
  }
  const t = document.querySelector<HTMLInputElement>('#admin-seo-title')
  if (t) t.value = cfg.seo?.siteTitle ?? ''
  const d = document.querySelector<HTMLTextAreaElement>('#admin-seo-desc')
  if (d) d.value = cfg.seo?.metaDescription ?? ''
  const r = document.querySelector<HTMLTextAreaElement>('#admin-robots')
  if (r) r.value = cfg.seo?.robotsTxt ?? ''
  const sm = document.querySelector<HTMLTextAreaElement>('#admin-sitemap-note')
  if (sm) sm.value = cfg.seo?.sitemapNote ?? ''
  const sr = document.querySelector<HTMLTextAreaElement>('#admin-security-roles')
  if (sr) sr.value = cfg.security?.rolesDescription ?? ''
  const bn = document.querySelector<HTMLTextAreaElement>('#admin-backup-note')
  if (bn) bn.value = cfg.security?.backupNote ?? ''
}

const renderAdminAudit = async () => {
  const body = document.querySelector<HTMLElement>('#admin-audit-body')
  if (!body || !getAdminToken()) return
  const res = await adminFetch('/admin/audit-log?limit=100')
  if (!res.ok) return
  const rows = (await res.json()) as Array<{ at: string; action: string; detail: unknown }>
  body.innerHTML = rows.length
    ? rows
        .map(
          (l) => `
    <tr>
      <td>${escapeHtml(l.at)}</td>
      <td><code>${escapeHtml(l.action)}</code></td>
      <td><small>${escapeHtml(JSON.stringify(l.detail))}</small></td>
    </tr>`,
        )
        .join('')
    : '<tr><td colspan="3">Kayıt yok</td></tr>'
}

const renderAdminCms = async () => {
  if (!getAdminToken()) return
  const [bRes, blRes, pRes] = await Promise.all([
    adminFetch('/admin/banners'),
    adminFetch('/admin/blog'),
    adminFetch('/admin/cms-pages'),
  ])
  const banBody = document.querySelector<HTMLElement>('#admin-banners-body')
  if (bRes.ok && banBody) {
    const banners = (await bRes.json()) as Array<{
      id: string
      title: string
      imageUrl: string
      linkUrl: string
      sortOrder: number
      active: boolean
    }>
    banBody.innerHTML = banners
      .map(
        (b) => `
      <tr data-banner-id="${escapeHtml(b.id)}">
        <td><input type="number" class="admin-bn-sort" value="${b.sortOrder}" /></td>
        <td><input type="text" class="admin-bn-title" value="${escapeHtml(b.title)}" /></td>
        <td><input type="text" class="admin-bn-img" value="${escapeHtml(b.imageUrl)}" /></td>
        <td><input type="text" class="admin-bn-link" value="${escapeHtml(b.linkUrl)}" /></td>
        <td><input type="checkbox" class="admin-bn-active" ${b.active ? 'checked' : ''} /></td>
        <td>
          <button type="button" class="admin-save-banner secondary">Kaydet</button>
          <button type="button" class="admin-delete-banner">Sil</button>
        </td>
      </tr>`,
      )
      .join('')
  }
  const blogBody = document.querySelector<HTMLElement>('#admin-blog-body-rows')
  if (blRes.ok && blogBody) {
    const posts = (await blRes.json()) as Array<{ id: string; title: string; slug: string; published: boolean }>
    blogBody.innerHTML = posts.length
      ? posts
          .map(
            (p) => `
      <tr data-blog-id="${escapeHtml(p.id)}">
        <td><input type="text" class="admin-bl-title" value="${escapeHtml(p.title)}" /></td>
        <td><code>${escapeHtml(p.slug)}</code></td>
        <td><input type="checkbox" class="admin-bl-pub" ${p.published ? 'checked' : ''} /></td>
        <td><button type="button" class="admin-save-blog">Kaydet</button></td>
      </tr>`,
          )
          .join('')
      : '<tr><td colspan="4">Blog yazısı yok</td></tr>'
  }
  const sel = document.querySelector<HTMLSelectElement>('#admin-cms-page-slug')
  if (pRes.ok && sel) {
    lastCmsPages = (await pRes.json()) as Array<{ slug: string; title: string; body: string }>
    sel.innerHTML = lastCmsPages.map((p) => `<option value="${escapeHtml(p.slug)}">${escapeHtml(p.title)}</option>`).join('')
    if (lastCmsPages[0]) fillAdminCmsPageEditor(lastCmsPages[0].slug)
  }
}

const refreshAdminData = async () => {
  if (!getAdminToken()) return
  if (adminLoginStatus) adminLoginStatus.textContent = ''
  try {
    const dashRes = await adminFetch('/admin/dashboard')
    const dashBody = (await dashRes.json().catch(() => ({}))) as { error?: string }
    if (!dashRes.ok) {
      if (dashRes.status === 401 || dashRes.status === 503) {
        sessionStorage.removeItem(ADMIN_TOKEN_KEY)
        invalidateCsrfToken()
        updateAdminGate()
      }
      throw new Error(dashBody.error ?? 'Dashboard yuklenemedi')
    }
    const dash = dashBody as unknown as {
      stats: { totalSales: number; orderCount: number; registeredCustomers: number }
      charts: {
        revenueByDay: Array<{ label: string; amount: number }>
        revenueByWeek: Array<{ label: string; amount: number }>
        revenueByMonth: Array<{ label: string; amount: number }>
      }
      alerts: {
        lowStock: Array<{ sku: string; brand: string; model: string; stock: number }>
        pendingOrders: number
        returnRequests: number
      }
    }
    if (adminStatsEl) {
      adminStatsEl.innerHTML = `
        <div class="admin-stat-card"><span>Toplam satış</span><strong>${dash.stats.totalSales.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} TL</strong></div>
        <div class="admin-stat-card"><span>Sipariş sayısı</span><strong>${dash.stats.orderCount}</strong></div>
        <div class="admin-stat-card"><span>Kayıtlı müşteri</span><strong>${dash.stats.registeredCustomers}</strong></div>`
    }
    renderAdminBarChart(adminChartDay, dash.charts.revenueByDay)
    renderAdminBarChart(adminChartWeek, dash.charts.revenueByWeek)
    renderAdminBarChart(adminChartMonth, dash.charts.revenueByMonth)
    if (adminAlertsBody) {
      adminAlertsBody.innerHTML = `
        <p><strong>Bekleyen sipariş (Yeni / Hazırlanıyor):</strong> ${dash.alerts.pendingOrders}</p>
        <p><strong>İade / destek kayıtları (konu başlığında "iade"):</strong> ${dash.alerts.returnRequests}</p>
        <ul class="admin-alert-list">${dash.alerts.lowStock.map((p) => `<li>${escapeHtml(p.brand)} ${escapeHtml(p.model)} — stok: ${p.stock}</li>`).join('') || '<li>Düşük stok uyarısı yok</li>'}</ul>`
    }
    if (adminExcelHint) adminExcelHint.textContent = ''
    if (adminInvoiceHint) adminInvoiceHint.textContent = ''
  } catch (e) {
    if (adminLoginStatus) adminLoginStatus.textContent = e instanceof Error ? e.message : 'Hata oluştu'
  }

  await syncAdminCatalogIfNeeded()
  await renderAdminProducts()
  await renderAdminOrders()
}

const openProductDetail = (product: CatalogItem) => {
  activeProductDetail = product
  const specs = buildProductSpecs(product)
  if (productDetailBrand) productDetailBrand.textContent = product.brand
  if (productDetailModel) productDetailModel.textContent = product.model
  if (productDetailPrice) productDetailPrice.textContent = product.price
  if (productDetailImage) {
    productDetailImage.src = product.image
    productDetailImage.alt = `${product.brand} ${product.model}`
  }
  if (productDetailEkartman) productDetailEkartman.textContent = specs.ekartman
  if (productDetailFrameColor) productDetailFrameColor.textContent = specs.frameColor
  if (productDetailBridge) productDetailBridge.textContent = specs.bridge
  if (productDetailTemple) productDetailTemple.textContent = specs.temple
  if (productDetailLensSize) productDetailLensSize.textContent = specs.lensSize
  if (productDetailPriceRange) productDetailPriceRange.textContent = specs.priceRange
  if (productDetailRecommended) productDetailRecommended.textContent = specs.recommended
  if (productDetailLensType) productDetailLensType.textContent = specs.lensType
  if (productDetailLensColor) productDetailLensColor.textContent = specs.lensColor
  if (productDetailFrameShape) productDetailFrameShape.textContent = specs.frameShape
  if (productDetailFrameMaterial) productDetailFrameMaterial.textContent = specs.frameMaterial
  if (productDetailYear) productDetailYear.textContent = specs.year
  setProductDetailVisible(true)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const TOP_SEARCH_DEBOUNCE_MS = 200
const TOP_SEARCH_MAX = 12
let topSearchDebounce: ReturnType<typeof setTimeout> | null = null
let topSearchMatchBuffer: CatalogItem[] = []

const filterCatalogForTopSearch = (q: string): CatalogItem[] => {
  const needle = q.trim().toLowerCase()
  if (needle.length < 1) return []
  const out: CatalogItem[] = []
  for (const item of catalogItems) {
    const hay = `${item.brand} ${item.model}`.toLowerCase()
    if (hay.includes(needle)) {
      out.push(item)
      if (out.length >= TOP_SEARCH_MAX) break
    }
  }
  return out
}

const closeTopSearchResults = () => {
  if (topSearchResults) {
    topSearchResults.hidden = true
    topSearchResults.innerHTML = ''
  }
  topSearchMatchBuffer = []
}

const renderTopSearchResults = (items: CatalogItem[]) => {
  if (!topSearchResults) return
  topSearchMatchBuffer = items
  if (!items.length) {
    topSearchResults.hidden = true
    topSearchResults.innerHTML = ''
    return
  }
  topSearchResults.hidden = false
  topSearchResults.innerHTML = items
    .map(
      (item, idx) => `
    <button type="button" class="top-search-result" data-idx="${idx}">
      <img src="${escapeHtml(item.image)}" alt="" class="top-search-result-img" width="44" height="36" loading="lazy" onerror="this.onerror=null;this.src='/products/product-2.png';" />
      <span class="top-search-result-text">
        <strong>${escapeHtml(item.brand)}</strong>
        <span class="top-search-result-model">${escapeHtml(item.model)}</span>
        <span class="top-search-result-price">${escapeHtml(item.price)}</span>
      </span>
    </button>`,
    )
    .join('')
}

const scheduleTopSearch = () => {
  if (topSearchDebounce) clearTimeout(topSearchDebounce)
  topSearchDebounce = setTimeout(() => {
    topSearchDebounce = null
    const q = topProductSearch?.value ?? ''
    const items = filterCatalogForTopSearch(q)
    renderTopSearchResults(items)
  }, TOP_SEARCH_DEBOUNCE_MS)
}

const getCardProduct = (card: HTMLElement): CatalogItem | null => {
  const brand = card.querySelector<HTMLElement>('h3')?.textContent?.trim() ?? ''
  const model = card.querySelector<HTMLElement>('.product-model')?.textContent?.trim() ?? ''
  const price = card.querySelector<HTMLElement>('.product-price')?.textContent?.trim() ?? ''
  const image = card.querySelector<HTMLImageElement>('img')?.getAttribute('src') ?? ''
  if (!brand || !model || !price || !image) return null

  const catalogMatch = catalogItems.find((item) => item.brand === brand && item.model === model)
  if (catalogMatch) return catalogMatch

  return {
    category: currentCategoryView,
    brand,
    model,
    price,
    image,
  }
}

const setSelectOptions = (selectEl: HTMLSelectElement | null, placeholder: string, values: string[]) => {
  if (!selectEl) return
  const currentValue = selectEl.value
  const uniqueSorted = Array.from(new Set(values.filter(Boolean))).sort((a, b) => a.localeCompare(b, 'tr'))
  selectEl.innerHTML = [
    `<option value="">${escapeHtml(placeholder)}</option>`,
    ...uniqueSorted.map((value) => `<option value="${escapeHtml(value)}">${escapeHtml(value)}</option>`),
  ].join('')
  if (currentValue && uniqueSorted.includes(currentValue)) selectEl.value = currentValue
}

const getItemsInCategory = (category: CategoryKey): CatalogItem[] =>
  catalogItems.filter((item) => item.category === category)

/** Seçili markaya göre (varsa) filtre seçenekleri; marka seçili değilse tüm kategori. */
const getItemsForFilterContext = (category: CategoryKey): CatalogItem[] => {
  const brandVal = (filterBrand?.value ?? '').trim()
  const inCat = getItemsInCategory(category)
  if (!brandVal) return inCat
  const lower = brandVal.toLowerCase()
  return inCat.filter((item) => item.brand.toLowerCase() === lower)
}

const hydrateCategoryFilterOptions = (category: CategoryKey) => {
  const allInCategory = getItemsInCategory(category)
  const brandOptions = Array.from(new Set(allInCategory.map((item) => item.brand)))
  setSelectOptions(filterBrand, 'Marka', brandOptions)

  const items = getItemsForFilterContext(category)
  const specsList = items.map((item) => buildProductSpecs(item))
  setSelectOptions(filterShape, 'Çerçeve Şekli', specsList.map((specs) => specs.frameShape))
  setSelectOptions(filterFrameColor, 'Çerçeve Rengi', specsList.map((specs) => specs.frameColor))
  setSelectOptions(filterLensSize, 'Cam Ölçüsü', specsList.map((specs) => specs.lensSize))
  setSelectOptions(filterPriceRange, 'Fiyat Aralığı', specsList.map((specs) => specs.priceRange))
  setSelectOptions(filterRecommended, 'Önerilen', specsList.map((specs) => specs.recommended))
}

const syncFiltersFromControls = () => {
  categoryFilters.brand = filterBrand?.value ?? ''
  categoryFilters.frameShape = filterShape?.value ?? ''
  categoryFilters.frameColor = filterFrameColor?.value ?? ''
  categoryFilters.lensSize = filterLensSize?.value ?? ''
  categoryFilters.priceRange = filterPriceRange?.value ?? ''
  categoryFilters.recommended = filterRecommended?.value ?? ''
}

const resetCategoryFilters = () => {
  categoryFilters.brand = ''
  categoryFilters.frameShape = ''
  categoryFilters.frameColor = ''
  categoryFilters.lensSize = ''
  categoryFilters.priceRange = ''
  categoryFilters.recommended = ''
  ;[filterBrand, filterShape, filterFrameColor, filterLensSize, filterPriceRange, filterRecommended].forEach((selectEl) => {
    if (selectEl) selectEl.value = ''
  })
}

const renderCategoryProducts = (category: CategoryKey) => {
  if (!categoryProducts) return
  const brandFilterLower = categoryFilters.brand.trim().toLowerCase()
  const items = getItemsInCategory(category).filter((item) => {
    const specs = buildProductSpecs(item)
    if (brandFilterLower && item.brand.toLowerCase() !== brandFilterLower) return false
    if (categoryFilters.frameShape && specs.frameShape !== categoryFilters.frameShape) return false
    if (categoryFilters.frameColor && specs.frameColor !== categoryFilters.frameColor) return false
    if (categoryFilters.lensSize && specs.lensSize !== categoryFilters.lensSize) return false
    if (categoryFilters.priceRange && specs.priceRange !== categoryFilters.priceRange) return false
    if (categoryFilters.recommended && specs.recommended !== categoryFilters.recommended) return false
    return true
  })
  categoryProducts.innerHTML = items
    .map(
      (item) => {
        const specs = buildProductSpecs(item)
        return `
        <article class="category-product-card">
          <span class="product-badge">Çok Satan</span>
          <div class="product-image"><img src="${item.image}" alt="${item.brand} ${item.model}" onerror="this.onerror=null;this.src='/products/product-2.png';" /></div>
          <h3>${item.brand}</h3>
          <p class="product-model">${item.model}</p>
          <p class="product-meta">Çerçeve: ${specs.frameShape} · Cam: ${specs.lensSize}</p>
          <p class="product-price">${item.price}</p>
          <button type="button" class="add-to-cart-btn" data-brand="${item.brand}" data-model="${item.model}" data-price="${item.price}" data-image="${item.image}">Sepete Ekle</button>
        </article>
      `
      },
    )
    .join('')
  if (!items.length) {
    categoryProducts.innerHTML = `<p class="category-empty">Bu marka için ürün bulunamadı.</p>`
  }
  renderFavoriteButtons()
}

const renderSupportHistory = async () => {
  if (!supportHistoryList) return
  const email = getSessionEmail()
  if (!email) {
    supportHistoryList.innerHTML = '<li>Destek gecmisi icin giris yapin.</li>'
    return
  }
  let items: SupportRecord[] = []
  try {
    items = await supportApiRequest<SupportRecord[]>('/support', 'GET', { email })
  } catch {
    supportHistoryList.innerHTML = '<li>Destek gecmisi su an yuklenemiyor.</li>'
    return
  }
  if (!items.length) {
    supportHistoryList.innerHTML = '<li>Henüz destek talebi oluşturulmadı.</li>'
    return
  }
  supportHistoryList.innerHTML = items
    .map(
      (item) => `
        <li>
          <strong>${item.subject}</strong> - ${item.title}<br>
          <span>${item.detail || 'Detay girilmedi.'}</span><br>
          <small>${item.createdAt}</small>
          <div class="history-actions">
            <button type="button" class="history-edit" data-id="${item.id}">Düzenle</button>
            <button type="button" class="history-delete" data-id="${item.id}">Sil</button>
          </div>
        </li>
      `,
    )
    .join('')
  ;(supportHistoryList as HTMLElement).dataset.items = JSON.stringify(items)
}

const setupCityDistrictSelects = async () => {
  if (!profileCitySelect || !profileDistrictSelect || !profileCityMenu || !profileCityTrigger || !cityDropdown) return
  try {
    const response = await fetch('/tr-cities-districts.json')
    const json = await response.json()
    const cities: Array<{ il_adi: string; ilceler: Array<{ ilce_adi: string }> }> = json.data ?? []
    const sortedCities = [...cities].sort((a, b) => a.il_adi.localeCompare(b.il_adi, 'tr'))

    profileCityMenu.innerHTML = sortedCities
      .map((city) => `<li><button type="button" data-city="${city.il_adi}">${city.il_adi}</button></li>`)
      .join('')

    const fillDistricts = (cityName: string) => {
      profileDistrictSelect.innerHTML = '<option value="">İlçe Seçiniz</option>'
      const selectedCity = sortedCities.find((city) => city.il_adi === cityName)
      if (!selectedCity) return
      const districts = [...selectedCity.ilceler].sort((a, b) => a.ilce_adi.localeCompare(b.ilce_adi, 'tr'))
      districts.forEach((district) => {
        const option = document.createElement('option')
        option.value = district.ilce_adi
        option.textContent = district.ilce_adi
        profileDistrictSelect.appendChild(option)
      })
    }

    profileCityTrigger.addEventListener('click', () => {
      cityDropdown.classList.toggle('open')
    })

    profileCityMenu.addEventListener('click', (event) => {
      const target = event.target as HTMLElement
      const button = target.closest<HTMLButtonElement>('button[data-city]')
      if (!button) return
      const cityName = button.dataset.city ?? ''
      profileCitySelect.value = cityName
      profileCityTrigger.textContent = cityName || 'Şehir Seçiniz'
      cityDropdown.classList.remove('open')
      fillDistricts(cityName)
    })

    document.addEventListener('click', (event) => {
      const target = event.target as Node
      if (!cityDropdown.contains(target)) {
        cityDropdown.classList.remove('open')
      }
    })
  } catch {
    profileCityTrigger.textContent = 'Şehir verisi yüklenemedi'
    profileDistrictSelect.innerHTML = '<option value="">İlçe verisi yüklenemedi</option>'
  }
}

const setupAddressCityDistrictSelects = async () => {
  if (!addressCitySelect || !addressDistrictSelect) return
  try {
    const response = await fetch('/tr-cities-districts.json')
    const json = await response.json()
    const cities: Array<{ il_adi: string; ilceler: Array<{ ilce_adi: string }> }> = json.data ?? []
    const sortedCities = [...cities].sort((a, b) => a.il_adi.localeCompare(b.il_adi, 'tr'))

    addressCitySelect.innerHTML = '<option value="">Şehir Seçiniz</option>'
    sortedCities.forEach((city) => {
      const option = document.createElement('option')
      option.value = city.il_adi
      option.textContent = city.il_adi
      addressCitySelect.appendChild(option)
    })

    const fillAddressDistricts = (cityName: string) => {
      addressDistrictSelect.innerHTML = '<option value="">İlçe Seçiniz</option>'
      const selectedCity = sortedCities.find((city) => city.il_adi === cityName)
      if (!selectedCity) return
      const districts = [...selectedCity.ilceler].sort((a, b) => a.ilce_adi.localeCompare(b.ilce_adi, 'tr'))
      districts.forEach((district) => {
        const option = document.createElement('option')
        option.value = district.ilce_adi
        option.textContent = district.ilce_adi
        addressDistrictSelect.appendChild(option)
      })
    }

    addressCitySelect.addEventListener('change', () => fillAddressDistricts(addressCitySelect.value))
  } catch {
    addressCitySelect.innerHTML = '<option value="">Şehir verisi yüklenemedi</option>'
    addressDistrictSelect.innerHTML = '<option value="">İlçe verisi yüklenemedi</option>'
  }
}

const refreshAuthButton = () => {
  syncAccountDashboardGreeting()
  const currentUser = getCurrentUser()
  if (!authOpenBtn) return
  authOpenBtn.textContent = currentUser ? t('auth.loggedIn') : t('auth.loggedOut')
}

const setActiveTab = (tab: 'login' | 'register') => {
  authTabs.forEach((btn) => btn.classList.toggle('active', btn.dataset.tab === tab))
  Object.values(panes).forEach((pane) => pane?.classList.remove('active'))
  panes[tab]?.classList.add('active')
  setStatus('')
}

authTabs.forEach((tabBtn) => {
  tabBtn.addEventListener('click', () => {
    setActiveTab((tabBtn.dataset.tab as 'login' | 'register') ?? 'login')
  })
})

loginSubmitBtn?.addEventListener('click', () => {
  loginPaneForm?.requestSubmit()
})

document.querySelector<HTMLButtonElement>('#forgot-btn')?.addEventListener('click', () => {
  Object.values(panes).forEach((pane) => pane?.classList.remove('active'))
  panes.forgot?.classList.add('active')
  pendingResetEmail = ''
  setStatus('')
})

googleSigninButtons.forEach((btn) => {
  btn.disabled = true
  btn.title = 'Google ile baglanma devre disi'
})

document.querySelector<HTMLFormElement>('#register-pane')?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const name = (document.querySelector<HTMLInputElement>('#register-name')?.value ?? '').trim()
  const surname = (document.querySelector<HTMLInputElement>('#register-surname')?.value ?? '').trim()
  const email = (document.querySelector<HTMLInputElement>('#register-email')?.value ?? '').trim().toLowerCase()
  const password = (document.querySelector<HTMLInputElement>('#register-password')?.value ?? '').trim()
  const registerTermsAccepted = Boolean(document.querySelector<HTMLInputElement>('#register-terms')?.checked)

  if (!name || !surname || !email || !password) {
    setStatus('Lutfen tum alanlari doldurun.')
    return
  }
  if (!isPasswordValid(password)) {
    setStatus('Sifre kriterlere uygun olmali: En az 8 karakter + Buyuk harf + Kucuk harf + Rakam + Ozel karakter (!,@,#,$).')
    return
  }
  if (!registerTermsAccepted) {
    setStatus('Uyelik icin kosullari kabul etmelisiniz.')
    return
  }
  try {
    const response = await authApiRequest<{ user: UserProfile }>('/auth/register', 'POST', { name, surname, email, password })
    writeUserInfo(response.user)
  } catch (error) {
    setStatus(error instanceof Error ? error.message : 'Kayit sirasinda bir hata olustu.')
    return
  }
  localStorage.setItem(SESSION_KEY, email)
  void pullCommerceStateFromBackend().then(() => {
    renderCart()
    renderOrders()
    renderFavorites()
    renderFavoriteButtons()
    refreshGiftSummary()
  })
  setStatus('Kayit basarili. Otomatik giris yapildi.')
  refreshAuthButton()
  closeAuthModal()
  setAccountVisible(true)
  setActiveTab('login')
})

document.querySelector<HTMLFormElement>('#login-pane')?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const email = (document.querySelector<HTMLInputElement>('#login-email')?.value ?? '').trim().toLowerCase()
  const password = (document.querySelector<HTMLInputElement>('#login-password')?.value ?? '').trim()
  const termsAccepted = Boolean(document.querySelector<HTMLInputElement>('#login-terms')?.checked)
  let loggedUserName = ''

  if (!termsAccepted) {
    setStatus('Giris icin uyelik kosullarini kabul etmelisiniz.')
    return
  }

  try {
    const response = await authApiRequest<{ user: UserProfile; adminToken?: string }>('/auth/login', 'POST', { email, password })
    if (response.adminToken) {
      setAdminToken(response.adminToken)
      updateAdminGate()
      setStatus('')
      closeAuthModal()
      setAccountVisible(false)
      location.hash = ADMIN_APP_HASH
      window.scrollTo({ top: 0, behavior: 'smooth' })
      void refreshAdminData()
      return
    }
    writeUserInfo(response.user)
    loggedUserName = response.user.name
  } catch (error) {
    const raw = error instanceof Error ? error.message : ''
    const isNetwork =
      raw.includes('Failed to fetch') ||
      raw.includes('NetworkError') ||
      raw.toLowerCase().includes('network') ||
      error instanceof TypeError
    setStatus(
      isNetwork
        ? 'Sunucuya baglanilamadi. API ayakta mi? Proje klasorunde: npm run dev:all (veya ayri: npm run dev:api + npm run dev).'
        : raw || 'E-posta veya sifre hatali.',
    )
    return
  }

  localStorage.setItem(SESSION_KEY, email)
  void pullCommerceStateFromBackend().then(() => {
    renderCart()
    renderOrders()
    renderFavorites()
    renderFavoriteButtons()
    refreshGiftSummary()
  })
  setStatus(`Hos geldin ${loggedUserName}, giris basarili.`)
  refreshAuthButton()
  closeAuthModal()
  setAccountVisible(true)
})

document.querySelector<HTMLFormElement>('#forgot-pane')?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const email = (document.querySelector<HTMLInputElement>('#forgot-email')?.value ?? '').trim().toLowerCase()
  try {
    await authApiRequest<{ message?: string }>('/auth/reset/request', 'POST', { email })
  } catch (error) {
    setStatus(error instanceof Error ? error.message : 'Kod gonderilemedi.')
    return
  }
  pendingResetEmail = email
  Object.values(panes).forEach((pane) => pane?.classList.remove('active'))
  panes.reset?.classList.add('active')
  setStatus(`Kod e-posta adresinize gonderildi: ${email}`)
})

document.querySelector<HTMLFormElement>('#reset-pane')?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const resetCode = (document.querySelector<HTMLInputElement>('#reset-code')?.value ?? '').trim()
  const newPassword = (document.querySelector<HTMLInputElement>('#reset-password')?.value ?? '').trim()

  if (!pendingResetEmail) {
    setStatus('Gecerli bir sifre sifirlama talebi bulunamadi.')
    return
  }

  const resetEmail = pendingResetEmail.trim().toLowerCase()
  try {
    const response = await authApiRequest<{ user?: UserProfile }>('/auth/reset/confirm', 'POST', {
      email: resetEmail,
      code: resetCode,
      password: newPassword,
    })
    localStorage.setItem(SESSION_KEY, resetEmail)
    if (response.user && response.user.email?.trim().toLowerCase() === resetEmail) {
      writeUserInfo(response.user)
    } else {
      await pullUserProfileFromBackend()
    }
  } catch (error) {
    setStatus(error instanceof Error ? error.message : 'Kullanici bulunamadi.')
    return
  }
  pendingResetEmail = ''
  void pullCommerceStateFromBackend().then(() => {
    renderCart()
    renderOrders()
    renderFavorites()
    renderFavoriteButtons()
    refreshGiftSummary()
  })
  refreshAuthButton()
  closeAuthModal()
  setAccountVisible(true)
  setActiveTab('login')
  setStatus('Sifre basariyla guncellendi, otomatik giris yapildi.')
})

localStorage.removeItem(REMEMBER_KEY)

if (!localStorage.getItem(GIFT_POINTS_KEY)) {
  writeGiftPoints(80)
}
refreshGiftSummary()

logoutBtn?.addEventListener('click', () => {
  closeAccountMenu()
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(USER_INFO_KEY)
  invalidateCsrfToken()
  refreshAuthButton()
  setAccountVisible(false)
})

topLogoutBtn?.addEventListener('click', () => {
  closeAccountMenu()
  localStorage.removeItem(SESSION_KEY)
  localStorage.removeItem(USER_INFO_KEY)
  invalidateCsrfToken()
  refreshAuthButton()
  setAccountVisible(false)
})

const goToHomepage = () => {
  closeMenuPanel()
  closeAuthModal()
  hideAdminPanel()
  setProductDetailVisible(false)
  setSupportVisible(false)
  setReturnVisible(false)
  setProfileVisible(false)
  setAddressVisible(false)
  setGiftVisible(false)
  setShoppingCartVisible(false)
  setOrdersVisible(false)
  setFavoritesVisible(false)
  setPriceAlarmVisible(false)
  setCancelVisible(false)
  setReviewsVisible(false)
  setWishlistVisible(false)
  setCategoryVisible(false)
  setAccountVisible(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

/** Hesap ozeti (MERHABA / kartlar); magaza vitrini degil. */
const goToAccountDashboard = () => {
  closeMenuPanel()
  closeAuthModal()
  hideAdminPanel()
  setProductDetailVisible(false)
  setSupportVisible(false)
  setReturnVisible(false)
  setProfileVisible(false)
  setAddressVisible(false)
  setGiftVisible(false)
  setShoppingCartVisible(false)
  setOrdersVisible(false)
  setFavoritesVisible(false)
  setPriceAlarmVisible(false)
  setCancelVisible(false)
  setReviewsVisible(false)
  setWishlistVisible(false)
  setCategoryVisible(false)
  setAccountVisible(true)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

brandLink?.addEventListener('click', (event) => {
  event.preventDefault()
  goToHomepage()
})

document.querySelector<HTMLButtonElement>('.account-home-btn')?.addEventListener('click', () => {
  goToAccountDashboard()
})

document.querySelector<HTMLAnchorElement>('.contents-home-link')?.addEventListener('click', (event) => {
  event.preventDefault()
  goToAccountDashboard()
})

adminCloseBtn?.addEventListener('click', () => setAdminVisible(false))

const performAdminLogin = async () => {
  const email = (adminLoginEmail?.value ?? '').trim().toLowerCase()
  const password = (adminLoginPassword?.value ?? '').trim()
  if (!email || !password) {
    if (adminLoginStatus) adminLoginStatus.textContent = 'E-posta ve şifre gerekli.'
    return
  }
  if (adminLoginStatus) adminLoginStatus.textContent = 'Giriş yapılıyor…'
  try {
    const result = await postAdminLogin(email, password)
    if (result.ok) {
      setAdminToken(result.token)
      if (adminLoginStatus) adminLoginStatus.textContent = ''
      if (adminLoginPassword) adminLoginPassword.value = ''
      updateAdminGate()
      void refreshAdminData()
      return
    }
    const apiErr = result.error ?? ''
    if (adminLoginStatus) {
      if (result.networkError) {
        adminLoginStatus.textContent =
          'Ağ hatası. npm run dev:all çalışıyor mu? Tarayıcıdaki adres çubuğundaki port (örn. 5173) ile Vite çıktısı aynı olmalı.'
      } else if (result.status === 503) {
        adminLoginStatus.textContent = `${apiErr || 'API yapılandırması eksik.'} .env ve npm run dev:all kontrol edin.`
      } else if (result.status === 502 || result.status === 504) {
        adminLoginStatus.textContent =
          'API sunucusu yanıt vermiyor (502). npm run dev:all veya npm run dev:api — ardından sayfayı yenileyin.'
      } else if (result.status === 404) {
        adminLoginStatus.textContent =
          '404: İstek yanlış sunucuya gitti veya rota yok. 4000 portunda eski Node süreci olabilir (Görev Yöneticisi). npm run dev:all ile yeniden başlatın. VITE_API_URL kullanıyorsanız sonda /api olmalı (veya yalnızca kök yazın, otomatik eklenir).'
      } else if (result.status === 401) {
        adminLoginStatus.textContent =
          apiErr ||
          'E-posta veya şifre hatalı. .env içindeki ADMIN_EMAIL ve ADMIN_PASSWORD ile birebir aynı olmalı (büyük-küçük harf e-postada önemli değil).'
      } else {
        adminLoginStatus.textContent = apiErr || `Sunucu hatası (HTTP ${result.status}).`
      }
    }
  } catch {
    if (adminLoginStatus)
      adminLoginStatus.textContent =
        'Ağ hatası. npm run dev:all çalışıyor mu? Tarayıcıdaki port ile terminaldeki Vite adresi aynı olmalı.'
  }
}

document.querySelector<HTMLFormElement>('#admin-login-form')?.addEventListener('submit', (ev) => {
  ev.preventDefault()
  void performAdminLogin()
})

document.querySelectorAll<HTMLButtonElement>('.admin-nav').forEach((btn) => {
  btn.addEventListener('click', () => {
    const t = btn.dataset.adminTab
    if (t) {
      switchAdminTab(t)
      loadAdminTabData(t)
    }
  })
})

adminBulkPriceBtn?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const pct = Number(adminBulkPercent?.value)
  if (!Number.isFinite(pct)) {
    if (adminExcelHint) adminExcelHint.textContent = 'Geçerli bir yüzde girin (örn. 5 veya -3).'
    return
  }
  if (adminExcelHint) adminExcelHint.textContent = 'Güncelleniyor…'
  const res = await adminFetch('/admin/products/bulk-price', {
    method: 'POST',
    body: JSON.stringify({ percent: pct }),
  })
  const body = (await res.json().catch(() => ({}))) as { error?: string; updated?: number }
  if (res.status === 401 || res.status === 503) {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    invalidateCsrfToken()
    updateAdminGate()
  }
  if (!res.ok) {
    if (adminExcelHint) adminExcelHint.textContent = body.error ?? 'Toplu fiyat başarısız.'
    return
  }
  if (adminExcelHint) adminExcelHint.textContent = `${body.updated ?? 0} ürünün fiyatı güncellendi.`
  void refreshAdminData()
})

adminSyncCatalogBtn?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  if (adminExcelHint) adminExcelHint.textContent = 'Senkronize ediliyor…'
  const res = await adminFetch('/admin/sync-catalog', {
    method: 'POST',
    body: JSON.stringify({
      products: catalogItems.map((p) => ({
        brand: p.brand,
        model: p.model,
        category: p.category,
        price: p.price,
      })),
    }),
  })
  const body = (await res.json().catch(() => ({}))) as { error?: string; synced?: number }
  if (res.status === 401 || res.status === 503) {
    sessionStorage.removeItem(ADMIN_TOKEN_KEY)
    invalidateCsrfToken()
    updateAdminGate()
  }
  if (!res.ok) {
    if (adminExcelHint) adminExcelHint.textContent = body.error ?? 'Senkron başarısız.'
    return
  }
  if (adminExcelHint) adminExcelHint.textContent = `${body.synced ?? 0} ürün senkronlandı.`
  void refreshAdminData()
})

adminSection?.addEventListener('click', async (ev) => {
  const target = ev.target as HTMLElement
  if (target.classList.contains('admin-save-row')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    if (!tr?.dataset.sku) return
    const sku = tr.dataset.sku
    const priceText = tr.querySelector<HTMLInputElement>('.admin-inp-price')?.value.trim() ?? ''
    const stock = Number(tr.querySelector<HTMLInputElement>('.admin-inp-stock')?.value ?? '0')
    const variantsRaw = tr.querySelector<HTMLInputElement>('.admin-inp-variants')?.value ?? '[]'
    let variants: unknown = []
    try {
      variants = JSON.parse(variantsRaw) as unknown
    } catch {
      if (adminExcelHint) adminExcelHint.textContent = 'Varyant alanı geçerli JSON olmalı.'
      return
    }
    const digitalUrl = tr.querySelector<HTMLInputElement>('.admin-inp-digital')?.value.trim() ?? ''
    const vatRate = Number(tr.querySelector<HTMLSelectElement>('.admin-inp-vat')?.value ?? '20')
    const res = await adminFetch(`/admin/products/${encodeURIComponent(sku)}`, {
      method: 'PATCH',
      body: JSON.stringify({ stock, priceText, variants, digitalUrl, vatRate }),
    })
    if (res.status === 401 || res.status === 503) {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY)
      invalidateCsrfToken()
      updateAdminGate()
    }
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      if (adminExcelHint) adminExcelHint.textContent = err.error ?? 'Kayıt başarısız.'
      return
    }
    if (adminExcelHint) adminExcelHint.textContent = `${sku} kaydedildi.`
  }
  if (target.classList.contains('admin-save-order')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    const orderId = tr?.dataset.orderId ?? ''
    const customerEmail = tr?.dataset.customer ?? ''
    const status = tr?.querySelector<HTMLSelectElement>('.admin-order-status')?.value ?? ''
    const trackingCode = tr?.querySelector<HTMLInputElement>('.admin-tracking')?.value.trim() ?? ''
    if (!orderId || !customerEmail || !status) return
    const res = await adminFetch(`/admin/orders/${encodeURIComponent(orderId)}`, {
      method: 'PATCH',
      body: JSON.stringify({ customerEmail, status, trackingCode }),
    })
    if (res.status === 401 || res.status === 503) {
      sessionStorage.removeItem(ADMIN_TOKEN_KEY)
      invalidateCsrfToken()
      updateAdminGate()
    }
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      if (adminInvoiceHint) adminInvoiceHint.textContent = err.error ?? 'Sipariş güncellenemedi.'
      return
    }
    void refreshAdminData()
  }

  if (target.classList.contains('admin-save-customer')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    if (!tr) return
    const email = tr.dataset.customerEmail?.trim()
    if (!email) return
    const tier = tr.querySelector<HTMLSelectElement>('.admin-tier-select')?.value ?? 'standart'
    const discountPercent = Number(tr.querySelector<HTMLInputElement>('.admin-discount-inp')?.value ?? '0')
    const res = await adminFetch(`/admin/customers/${encodeURIComponent(email)}`, {
      method: 'PATCH',
      body: JSON.stringify({ tier, discountPercent }),
    })
    clearAdminTokenIfAuthError(res)
    const err = (await res.json().catch(() => ({}))) as { error?: string }
    if (!res.ok) {
      alert(err.error ?? 'Kayıt başarısız')
      return
    }
    void renderAdminCustomers()
  }

  if (target.classList.contains('admin-save-review')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    if (!tr) return
    const id = tr.dataset.reviewId?.trim()
    if (!id) return
    const status = tr.querySelector<HTMLSelectElement>('.admin-review-status')?.value ?? ''
    const reply = tr.querySelector<HTMLInputElement>('.admin-review-reply')?.value ?? ''
    const res = await adminFetch(`/admin/reviews/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, reply }),
    })
    clearAdminTokenIfAuthError(res)
    if (!res.ok) {
      const err = (await res.json().catch(() => ({}))) as { error?: string }
      alert(err.error ?? 'Yorum güncellenemedi')
      return
    }
    void renderAdminReviews()
  }

  if (target.classList.contains('admin-delete-coupon')) {
    ev.preventDefault()
    const code = target.dataset.code?.trim()
    if (!code || !confirm(`Kupon silinsin mi: ${code}?`)) return
    const res = await adminFetch(`/admin/coupons/${encodeURIComponent(code)}`, { method: 'DELETE' })
    clearAdminTokenIfAuthError(res)
    void renderAdminMarketing()
  }

  if (target.classList.contains('admin-save-banner')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    if (!tr) return
    const id = tr.dataset.bannerId?.trim()
    if (!id) return
    const res = await adminFetch(`/admin/banners/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        sortOrder: Number(tr.querySelector<HTMLInputElement>('.admin-bn-sort')?.value ?? '0'),
        title: tr.querySelector<HTMLInputElement>('.admin-bn-title')?.value ?? '',
        imageUrl: tr.querySelector<HTMLInputElement>('.admin-bn-img')?.value ?? '',
        linkUrl: tr.querySelector<HTMLInputElement>('.admin-bn-link')?.value ?? '',
        active: tr.querySelector<HTMLInputElement>('.admin-bn-active')?.checked ?? false,
      }),
    })
    clearAdminTokenIfAuthError(res)
    if (res.ok) void renderAdminCms()
  }

  if (target.classList.contains('admin-delete-banner')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    const id = tr?.dataset.bannerId?.trim()
    if (!id || !confirm('Banner silinsin mi?')) return
    const res = await adminFetch(`/admin/banners/${encodeURIComponent(id)}`, { method: 'DELETE' })
    clearAdminTokenIfAuthError(res)
    void renderAdminCms()
  }

  if (target.classList.contains('admin-save-blog')) {
    ev.preventDefault()
    const tr = target.closest('tr')
    if (!tr) return
    const id = tr.dataset.blogId?.trim()
    if (!id) return
    const res = await adminFetch(`/admin/blog/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: tr.querySelector<HTMLInputElement>('.admin-bl-title')?.value ?? '',
        published: tr.querySelector<HTMLInputElement>('.admin-bl-pub')?.checked ?? false,
      }),
    })
    clearAdminTokenIfAuthError(res)
    if (res.ok) void renderAdminCms()
  }
})

adminSection?.addEventListener('change', (ev) => {
  const t = ev.target as HTMLElement
  if (t.id === 'admin-cms-page-slug') {
    fillAdminCmsPageEditor((t as HTMLSelectElement).value)
  }
})

document.querySelector<HTMLButtonElement>('#admin-save-marketing-btn')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const cfgRes = await adminFetch('/admin/site-config')
  if (!cfgRes.ok) return
  const cfg = (await cfgRes.json()) as {
    marketing: { campaigns: SiteConfigMarketingCampaign[] }
    cartReminder: Record<string, unknown>
  }
  const base = cfg.marketing?.campaigns ?? []
  const next = base.map((c) => {
    const row = document.querySelector(`[data-campaign-id="${String(c.id ?? '').replace(/"/g, '')}"]`)
    if (!row) return c
    const active = row.querySelector<HTMLInputElement>('.admin-camp-active')?.checked ?? false
    const th = row.querySelector<HTMLInputElement>('.admin-camp-threshold')
    const o: SiteConfigMarketingCampaign = { ...c, active }
    if (c.type === 'shipping' && th) o.thresholdTl = Number(th.value) || 0
    return o
  })
  const hours = Number(document.querySelector<HTMLInputElement>('#admin-cart-reminder-hours')?.value) || 24
  const cartReminder = { ...cfg.cartReminder, hoursSinceCartEdit: hours }
  const res = await adminFetch('/admin/site-config', {
    method: 'PATCH',
    body: JSON.stringify({ marketing: { campaigns: next }, cartReminder }),
  })
  clearAdminTokenIfAuthError(res)
  if (res.ok) void renderAdminMarketing()
})

document.querySelector<HTMLButtonElement>('#admin-cart-reminder-dry')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const hours = Number(document.querySelector<HTMLInputElement>('#admin-cart-reminder-hours')?.value) || 24
  const res = await adminFetch('/admin/cart-reminders', {
    method: 'POST',
    body: JSON.stringify({ dryRun: true, hours }),
  })
  clearAdminTokenIfAuthError(res)
  const body = (await res.json().catch(() => ({}))) as { count?: number; error?: string }
  const st = document.querySelector<HTMLElement>('#admin-cart-reminder-status')
  if (st) st.textContent = res.ok ? `Önizleme: ${body.count ?? 0} hesap uygun (≥${hours} saat).` : (body.error ?? 'İstek başarısız')
})

document.querySelector<HTMLButtonElement>('#admin-cart-reminder-send')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  if (!window.confirm('Uygun tüm hesaplara sepet hatırlatma e-postası gönderilsin mi?')) return
  const hours = Number(document.querySelector<HTMLInputElement>('#admin-cart-reminder-hours')?.value) || 24
  const res = await adminFetch('/admin/cart-reminders', {
    method: 'POST',
    body: JSON.stringify({ dryRun: false, hours }),
  })
  clearAdminTokenIfAuthError(res)
  const body = (await res.json().catch(() => ({}))) as { sent?: number; total?: number; error?: string }
  const st = document.querySelector<HTMLElement>('#admin-cart-reminder-status')
  if (st) {
    st.textContent = res.ok ? `Gönderildi: ${body.sent ?? 0} / ${body.total ?? 0}` : (body.error ?? 'Gönderim başarısız')
  }
  if (res.ok) void renderAdminMarketing()
})

document.querySelector<HTMLButtonElement>('#admin-save-payment-btn')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const res = await adminFetch('/admin/site-config', {
    method: 'PATCH',
    body: JSON.stringify({
      payment: {
        virtualPosProvider: document.querySelector<HTMLInputElement>('#admin-pay-provider')?.value ?? '',
        bankTransfer: document.querySelector<HTMLInputElement>('#admin-pay-bank')?.checked ?? false,
        cashOnDelivery: document.querySelector<HTMLInputElement>('#admin-pay-cod')?.checked ?? false,
        notes: document.querySelector<HTMLTextAreaElement>('#admin-pay-notes')?.value ?? '',
      },
    }),
  })
  clearAdminTokenIfAuthError(res)
  window.alert(res.ok ? 'Ödeme ayarları kaydedildi.' : 'Kayıt başarısız.')
})

document.querySelector<HTMLButtonElement>('#admin-save-finance-btn')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  let installments: unknown
  try {
    installments = JSON.parse(document.querySelector<HTMLTextAreaElement>('#admin-installments-json')?.value ?? '[]')
  } catch {
    window.alert('Taksit JSON geçersiz.')
    return
  }
  const res = await adminFetch('/admin/site-config', {
    method: 'PATCH',
    body: JSON.stringify({
      finance: {
        installments: Array.isArray(installments) ? installments : [],
        defaultVatPercent: Number(document.querySelector<HTMLInputElement>('#admin-default-vat')?.value) || 20,
      },
    }),
  })
  clearAdminTokenIfAuthError(res)
  window.alert(res.ok ? 'Finans ayarları kaydedildi.' : 'Kayıt başarısız.')
})

document.querySelector<HTMLButtonElement>('#admin-save-technical-btn')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const res = await adminFetch('/admin/site-config', {
    method: 'PATCH',
    body: JSON.stringify({
      seo: {
        siteTitle: document.querySelector<HTMLInputElement>('#admin-seo-title')?.value ?? '',
        metaDescription: document.querySelector<HTMLTextAreaElement>('#admin-seo-desc')?.value ?? '',
        robotsTxt: document.querySelector<HTMLTextAreaElement>('#admin-robots')?.value ?? '',
        sitemapNote: document.querySelector<HTMLTextAreaElement>('#admin-sitemap-note')?.value ?? '',
      },
      security: {
        rolesDescription: document.querySelector<HTMLTextAreaElement>('#admin-security-roles')?.value ?? '',
        backupNote: document.querySelector<HTMLTextAreaElement>('#admin-backup-note')?.value ?? '',
      },
    }),
  })
  clearAdminTokenIfAuthError(res)
  window.alert(res.ok ? 'Kaydedildi.' : 'Kayıt başarısız.')
})

document.querySelector<HTMLButtonElement>('#admin-audit-refresh')?.addEventListener('click', () => void renderAdminAudit())

document.querySelector<HTMLButtonElement>('#admin-coupon-add')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const code = (document.querySelector<HTMLInputElement>('#admin-coupon-code')?.value ?? '').trim().toUpperCase()
  const kind = document.querySelector<HTMLSelectElement>('#admin-coupon-kind')?.value ?? 'percent'
  const value = Number(document.querySelector<HTMLInputElement>('#admin-coupon-value')?.value)
  const minCart = Number(document.querySelector<HTMLInputElement>('#admin-coupon-min')?.value ?? '0')
  const exp = document.querySelector<HTMLInputElement>('#admin-coupon-expires')?.value
  const expiresAt = exp ? `${exp}T23:59:59.000Z` : undefined
  if (!code || !Number.isFinite(value) || value <= 0) {
    window.alert('Kod ve pozitif değer gerekli.')
    return
  }
  const res = await adminFetch('/admin/coupons', {
    method: 'POST',
    body: JSON.stringify({ code, kind, value, minCart, expiresAt }),
  })
  clearAdminTokenIfAuthError(res)
  const err = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) {
    window.alert(err.error ?? 'Kupon kaydedilemedi')
    return
  }
  void renderAdminMarketing()
})

document.querySelector<HTMLButtonElement>('#admin-banner-add')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const res = await adminFetch('/admin/banners', {
    method: 'POST',
    body: JSON.stringify({
      title: document.querySelector<HTMLInputElement>('#admin-banner-title')?.value ?? '',
      imageUrl: document.querySelector<HTMLInputElement>('#admin-banner-image')?.value ?? '',
      linkUrl: document.querySelector<HTMLInputElement>('#admin-banner-link')?.value ?? '',
      sortOrder: Number(document.querySelector<HTMLInputElement>('#admin-banner-sort')?.value ?? '0'),
      active: document.querySelector<HTMLInputElement>('#admin-banner-active')?.checked ?? true,
    }),
  })
  clearAdminTokenIfAuthError(res)
  if (res.ok) void renderAdminCms()
})

document.querySelector<HTMLButtonElement>('#admin-blog-add')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const title = (document.querySelector<HTMLInputElement>('#admin-blog-title')?.value ?? '').trim()
  if (!title) {
    window.alert('Başlık gerekli.')
    return
  }
  const slugRaw = (document.querySelector<HTMLInputElement>('#admin-blog-slug')?.value ?? '').trim()
  const res = await adminFetch('/admin/blog', {
    method: 'POST',
    body: JSON.stringify({
      title,
      slug: slugRaw || undefined,
      excerpt: document.querySelector<HTMLTextAreaElement>('#admin-blog-excerpt')?.value ?? '',
      body: document.querySelector<HTMLTextAreaElement>('#admin-blog-body')?.value ?? '',
      published: document.querySelector<HTMLInputElement>('#admin-blog-published')?.checked ?? false,
    }),
  })
  clearAdminTokenIfAuthError(res)
  const err = (await res.json().catch(() => ({}))) as { error?: string }
  if (!res.ok) {
    window.alert(err.error ?? 'Yazı oluşturulamadı')
    return
  }
  void renderAdminCms()
})

document.querySelector<HTMLButtonElement>('#admin-cms-page-save')?.addEventListener('click', async () => {
  if (!getAdminToken()) return
  const slug = document.querySelector<HTMLSelectElement>('#admin-cms-page-slug')?.value ?? ''
  if (!slug) return
  const res = await adminFetch(`/admin/cms-pages/${encodeURIComponent(slug)}`, {
    method: 'PATCH',
    body: JSON.stringify({
      title: document.querySelector<HTMLInputElement>('#admin-cms-page-title')?.value ?? '',
      body: document.querySelector<HTMLTextAreaElement>('#admin-cms-page-body')?.value ?? '',
    }),
  })
  clearAdminTokenIfAuthError(res)
  if (res.ok) void renderAdminCms()
})

supportOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setSupportVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

returnOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setReturnVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

cancelOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setCancelVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

reviewsOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setReviewsVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

wishlistOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setWishlistVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

profileOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setProfileVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

addressOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setAddressVisible(true)
    if (addressForm) addressForm.style.display = 'none'
    if (addressEmpty) addressEmpty.style.display = 'block'
    if (addressSuccess) addressSuccess.style.display = 'none'
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

giftOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setGiftVisible(true)
    refreshGiftSummary()
    if (giftStatus) giftStatus.textContent = ''
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

ordersOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setOrdersVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

favoritesOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setFavoritesVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

priceAlarmOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    setPriceAlarmVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

cartOpenBtn?.addEventListener('click', () => {
  closeAuthModal()
  closeCartPanel()
  setShoppingCartVisible(true)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

cartCloseBtn?.addEventListener('click', () => {
  closeCartPanel()
})

cartPageOpenItems.forEach((item) => {
  item.addEventListener('click', (event) => {
    event.preventDefault()
    closeAuthModal()
    closeCartPanel()
    setShoppingCartVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

shoppingCartClearBtn?.addEventListener('click', () => {
  writeCart([])
  renderCart()
})

shoppingCartCompleteBtn?.addEventListener('click', () => {
  openCheckoutModal()
})

checkoutModal?.querySelectorAll<HTMLElement>('[data-close-checkout]').forEach((el) => {
  el.addEventListener('click', () => closeCheckoutModal())
})

checkoutCardNumber?.addEventListener('input', () => {
  const raw = (checkoutCardNumber.value || '').replace(/\D/g, '').slice(0, 16)
  checkoutCardNumber.value = raw.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
})

checkoutExpiry?.addEventListener('input', () => {
  const raw = (checkoutExpiry.value || '').replace(/\D/g, '').slice(0, 4)
  checkoutExpiry.value = raw.length >= 3 ? `${raw.slice(0, 2)}/${raw.slice(2)}` : raw
})

checkoutCvv?.addEventListener('input', () => {
  checkoutCvv.value = (checkoutCvv.value || '').replace(/\D/g, '').slice(0, 4)
})

checkoutForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const name = (checkoutName?.value ?? '').trim()
  const card = (checkoutCardNumber?.value ?? '').replace(/\s/g, '')
  const expiry = (checkoutExpiry?.value ?? '').trim()
  const cvv = (checkoutCvv?.value ?? '').trim()
  const accepted = Boolean(checkoutTerms?.checked)

  if (!name || card.length !== 16 || !/^\d{2}\/\d{2}$/.test(expiry) || cvv.length < 3 || !accepted) {
    if (checkoutStatusEl) checkoutStatusEl.textContent = 'Lutfen tum kart bilgilerini dogru doldurup onay kutusunu isaretleyin.'
    return
  }

  if (checkoutStatusEl) checkoutStatusEl.textContent = 'Stok kontrol ediliyor...'
  const cartItems = readCart()
  const stockResult = await reserveCheckoutStock(cartItems)
  if (!stockResult.ok) {
    if (checkoutStatusEl) checkoutStatusEl.textContent = stockResult.message
    renderCart()
    return
  }

  if (checkoutStatusEl) checkoutStatusEl.textContent = 'Odeme basarili. Siparisiniz alinmistir.'
  saveCurrentCartAsOrder()
  writeCart([])
  renderCart()
  renderOrders()
  setTimeout(() => {
    closeCheckoutModal()
    setOrdersVisible(true)
  }, 1200)
})

productDetailBackBtn?.addEventListener('click', () => {
  setProductDetailVisible(false)
  setCategoryVisible(true)
})

productDetailAddCart?.addEventListener('click', () => {
  if (!activeProductDetail) return
  addToCart(activeProductDetail.brand, activeProductDetail.model, activeProductDetail.price, activeProductDetail.image)
})

productDetailImageWrap?.addEventListener('mousemove', (event) => {
  if (!productDetailImage) return
  const bounds = productDetailImageWrap.getBoundingClientRect()
  const x = ((event.clientX - bounds.left) / bounds.width) * 100
  const y = ((event.clientY - bounds.top) / bounds.height) * 100
  productDetailImage.style.transformOrigin = `${x}% ${y}%`
  productDetailImage.style.transform = 'scale(1.8)'
})

productDetailImageWrap?.addEventListener('mouseleave', () => {
  if (!productDetailImage) return
  productDetailImage.style.transform = 'scale(1)'
  productDetailImage.style.transformOrigin = 'center'
})

document.addEventListener('click', (event) => {
  const target = event.target as HTMLElement

  if (topSearchResults && !topSearchResults.hidden && !target.closest('#top-search')) {
    closeTopSearchResults()
  }

  const heroShopCta = target.closest<HTMLAnchorElement>('main.hero-content a.cta')
  if (heroShopCta) {
    event.preventDefault()
    currentCategoryView = 'kadin'
    resetCategoryFilters()
    hydrateCategoryFilterOptions(currentCategoryView)
    syncCategoryTitle()
    renderCategoryProducts(currentCategoryView)
    closeMenuPanel()
    setCategoryVisible(true)
    closeAuthModal()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const favoriteBtn = target.closest<HTMLButtonElement>('.favorite-btn')
  if (favoriteBtn) {
    const card = favoriteBtn.closest<HTMLElement>('.product-card, .category-product-card')
    if (!card) return
    const product = getCardProduct(card)
    if (!product) return
    toggleFavorite(product)
    return
  }

  const favoriteRemoveButton = target.closest<HTMLButtonElement>('.favorite-remove-btn')
  if (favoriteRemoveButton) {
    const id = favoriteRemoveButton.dataset.id ?? ''
    if (!id) return
    const items = readFavorites().filter((item) => item.id !== id)
    writeFavorites(items)
    renderFavorites()
    renderFavoriteButtons()
    return
  }

  const priceAlarmRemoveBtn = target.closest<HTMLButtonElement>('.price-alarm-remove-btn')
  if (priceAlarmRemoveBtn) {
    const id = priceAlarmRemoveBtn.dataset.id ?? ''
    if (!id) return
    writePriceAlerts(readPriceAlerts().filter((row) => row.id !== id))
    renderPriceAlerts()
    return
  }

  const cancelRemoveBtn = target.closest<HTMLButtonElement>('.cancel-remove-btn')
  if (cancelRemoveBtn) {
    const id = cancelRemoveBtn.dataset.id ?? ''
    if (!id) return
    writeCancelRequests(readCancelRequests().filter((row) => row.id !== id))
    renderCancelSection()
    return
  }

  const card = target.closest<HTMLElement>('.product-card, .category-product-card')
  const clickedAddBtn = target.closest('.add-to-cart-btn')
  if (card && !clickedAddBtn) {
    const product = getCardProduct(card)
    if (product) openProductDetail(product)
    return
  }

  const addButton = target.closest<HTMLButtonElement>('.add-to-cart-btn')
  if (addButton) {
    const brand = addButton.dataset.brand ?? ''
    const model = addButton.dataset.model ?? ''
    const priceText = addButton.dataset.price ?? ''
    const image = addButton.dataset.image ?? ''
    if (!brand || !model || !priceText) return
    addToCart(brand, model, priceText, image)
    return
  }

  const qtyButton = target.closest<HTMLButtonElement>('.cart-qty-btn')
  if (qtyButton) {
    const id = qtyButton.dataset.id ?? ''
    const action = qtyButton.dataset.action
    if (!id || !action) return
    updateCartQuantity(id, action === 'increase')
    return
  }

  const removeButton = target.closest<HTMLButtonElement>('.cart-remove-btn')
  if (removeButton) {
    const id = removeButton.dataset.id ?? ''
    if (!id) return
    removeFromCart(id)
    return
  }

  const pageQtyButton = target.closest<HTMLButtonElement>('.shopping-cart-qty-btn')
  if (pageQtyButton) {
    const id = pageQtyButton.dataset.id ?? ''
    const action = pageQtyButton.dataset.action
    if (!id || !action) return
    updateCartQuantity(id, action === 'increase')
    return
  }

  const pageRemoveButton = target.closest<HTMLButtonElement>('.shopping-cart-remove')
  if (pageRemoveButton) {
    const id = pageRemoveButton.dataset.id ?? ''
    if (!id) return
    removeFromCart(id)
  }
})

addressCreateButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (addressEmpty) addressEmpty.style.display = 'none'
    if (addressForm) addressForm.style.display = 'grid'
    if (addressSuccess) addressSuccess.style.display = 'none'
  })
})

addressCancelBtn?.addEventListener('click', () => {
  if (addressForm) {
    addressForm.reset()
    addressForm.style.display = 'none'
  }
  if (addressEmpty) addressEmpty.style.display = 'block'
  if (addressSuccess) addressSuccess.style.display = 'none'
})

addressForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  if (addressForm) {
    addressForm.reset()
    addressForm.style.display = 'none'
  }
  if (addressEmpty) addressEmpty.style.display = 'none'
  if (addressSuccess) addressSuccess.style.display = 'block'
})

priceAlarmForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const pid = priceAlarmProductSelect?.value?.trim() ?? ''
  const targetRaw = Number(priceAlarmTargetInput?.value ?? '')
  if (!pid) {
    if (priceAlarmFormStatus) priceAlarmFormStatus.textContent = 'Lütfen bir ürün seçin.'
    return
  }
  if (!Number.isFinite(targetRaw) || targetRaw < 1) {
    if (priceAlarmFormStatus) priceAlarmFormStatus.textContent = 'Hedef fiyat geçerli bir TL tutarı olmalıdır.'
    return
  }
  const product = getCatalogItemByAlertId(pid)
  if (!product) {
    if (priceAlarmFormStatus) priceAlarmFormStatus.textContent = 'Ürün bulunamadı.'
    return
  }
  const listTl = parsePrice(product.price)
  if (listTl <= 0) {
    if (priceAlarmFormStatus) priceAlarmFormStatus.textContent = 'Ürün fiyatı okunamadı.'
    return
  }
  const targetTl = Math.round(targetRaw * 100) / 100
  const existing = readPriceAlerts().filter((r) => r.id !== pid)
  const row: PriceAlertRecord = {
    id: pid,
    brand: product.brand,
    model: product.model,
    price: product.price,
    image: product.image,
    category: product.category,
    targetPriceTl: targetTl,
    addedAt: new Date().toISOString(),
  }
  writePriceAlerts([...existing, row])
  if (priceAlarmFormStatus) priceAlarmFormStatus.textContent = 'Fiyat alarmı listeye eklendi.'
  renderPriceAlerts()
})

giftCreateForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const amount = Number(giftAmountInput?.value ?? 0)
  const points = readGiftPoints()
  if (!giftStatus) return
  if (!Number.isInteger(amount)) {
    giftStatus.textContent = 'Lütfen tam sayı bir tutar girin.'
    return
  }
  if (amount < GIFT_MIN_AMOUNT) {
    giftStatus.textContent = `Minimum kupon tutarı ${GIFT_MIN_AMOUNT} TL olmalıdır.`
    return
  }
  if (amount % GIFT_STEP !== 0) {
    giftStatus.textContent = `Kupon tutarı ${GIFT_STEP} TL katları şeklinde olmalıdır.`
    return
  }
  if (points < GIFT_MIN_AMOUNT) {
    giftStatus.textContent = `Kupon için en az ${GIFT_MIN_AMOUNT} puan gerekir. Mevcut puanın: ${points}.`
    return
  }
  if (amount > points) {
    giftStatus.textContent = `Yetersiz puan. En fazla ${points} TL kupon oluşturabilirsin.`
    return
  }

  writeGiftPoints(points - amount)
  refreshGiftSummary()
  const couponCode = `DI${new Date().getTime().toString().slice(-6)}`
  giftStatus.textContent = `${amount} TL kupon başarıyla oluşturuldu. Kodun: ${couponCode}. Kalan puanın: ${readGiftPoints()}.`
  if (giftAmountInput) giftAmountInput.value = String(GIFT_MIN_AMOUNT)
})

returnShopBtn?.addEventListener('click', () => {
  setReturnVisible(false)
  setAccountVisible(false)
  setCategoryVisible(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

cancelShopBtn?.addEventListener('click', () => {
  setCancelVisible(false)
  setAccountVisible(false)
  setCategoryVisible(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

reviewsShopBtn?.addEventListener('click', () => {
  setReviewsVisible(false)
  setAccountVisible(false)
  setCategoryVisible(false)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

wishlistVazgecBtn?.addEventListener('click', () => {
  resetWishlistForm()
})

wishlistForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const importance = wishlistImportance?.value?.trim() ?? ''
  const day = wishlistDay?.value ?? ''
  const month = wishlistMonth?.value ?? ''
  const year = wishlistYear?.value ?? ''
  const title = wishlistTitle?.value?.trim() ?? ''
  if (!importance || !day || !month || !year || !title) return

  let list = readWishlistEntries()
  const isDefault = Boolean(wishlistDefault?.checked)
  if (isDefault) {
    list = list.map((e) => ({ ...e, isDefault: false }))
  }

  const row: WishlistEntryRecord = {
    id: crypto.randomUUID(),
    importance,
    day,
    month,
    year,
    title,
    description: wishlistDesc?.value?.trim() ?? '',
    isDefault,
    isActive: Boolean(wishlistActive?.checked),
    createdAt: new Date().toISOString(),
  }
  list.push(row)
  writeWishlistEntries(list)
  resetWishlistForm()
  renderWishlistTable()
})

wishlistTableBody?.addEventListener('click', (event) => {
  const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('.wishlist-remove-btn')
  const id = btn?.dataset.wishlistId
  if (!id) return
  const next = readWishlistEntries().filter((e) => e.id !== id)
  writeWishlistEntries(next)
  renderWishlistTable()
})

document.querySelector<HTMLFormElement>('#wishlist-newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault()
  const statusEl = document.querySelector<HTMLElement>('#wishlist-newsletter-status')
  const input = document.querySelector<HTMLInputElement>('#wishlist-newsletter-email')
  if (statusEl) statusEl.textContent = 'Teşekkürler, kaydınız alındı.'
  input?.blur()
})

document.querySelector<HTMLButtonElement>('#wishlist-scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

document.querySelector<HTMLFormElement>('#account-dashboard-newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault()
  const statusEl = document.querySelector<HTMLElement>('#account-dashboard-newsletter-status')
  const input = document.querySelector<HTMLInputElement>('#account-dashboard-newsletter-email')
  if (statusEl) statusEl.textContent = 'Teşekkürler, kaydınız alındı.'
  input?.blur()
})

document.querySelector<HTMLFormElement>('#home-bestsellers-newsletter-form')?.addEventListener('submit', (event) => {
  event.preventDefault()
  const statusEl = document.querySelector<HTMLElement>('#home-bestsellers-newsletter-status')
  const input = document.querySelector<HTMLInputElement>('#home-bestsellers-newsletter-email')
  if (statusEl) statusEl.textContent = 'Teşekkürler, kaydınız alındı.'
  input?.blur()
})

document.querySelector<HTMLButtonElement>('#account-dashboard-scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

cancelNewRequestBtn?.addEventListener('click', () => {
  populateCancelOrderSelect()
  if (cancelFormPanel) cancelFormPanel.style.display = 'block'
  const tb = document.querySelector<HTMLElement>('#cancel-toolbar')
  if (tb) tb.style.display = 'none'
  if (cancelEmptyEl && readCancelRequests().length === 0) cancelEmptyEl.style.display = 'none'
  cancelOrderSelect?.focus()
})

cancelFormDismissBtn?.addEventListener('click', () => {
  closeCancelFormPanel()
  if (cancelEmptyEl && readCancelRequests().length === 0) cancelEmptyEl.style.display = 'block'
})

cancelRequestForm?.addEventListener('submit', (event) => {
  event.preventDefault()
  const orderId = cancelOrderSelect?.value?.trim() ?? ''
  if (!orderId) return
  const orders = readOrders()
  if (!orders.some((o) => o.id === orderId)) return
  const note = ''
  const existing = readCancelRequests()
  if (existing.some((r) => r.orderId === orderId)) {
    closeCancelFormPanel()
    renderCancelSection()
    return
  }
  const row: CancelRequestRecord = {
    id: `cancel-${Date.now()}`,
    orderId,
    note,
    createdAt: new Date().toISOString(),
    status: 'İnceleniyor',
  }
  writeCancelRequests([row, ...existing])
  closeCancelFormPanel()
  renderCancelSection()
})

returnCancelBtn?.addEventListener('click', () => {
  setReturnVisible(false)
  setAccountVisible(true)
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

supportCancelBtn?.addEventListener('click', () => {
  setSupportVisible(false)
  setAccountVisible(true)
})

document.querySelectorAll<HTMLButtonElement>('.section-back-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    setSupportVisible(false)
    setReturnVisible(false)
    setProfileVisible(false)
    setAddressVisible(false)
    setGiftVisible(false)
    setOrdersVisible(false)
    setFavoritesVisible(false)
    setPriceAlarmVisible(false)
    setCancelVisible(false)
    setReviewsVisible(false)
    setWishlistVisible(false)
    setShoppingCartVisible(false)
    if ((btn.dataset.backTarget ?? 'account') === 'category') setCategoryVisible(true)
    else setAccountVisible(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

newSupportBtn?.addEventListener('click', () => {
  supportForm?.reset()
  editingSupportIndex = null
  const submitBtn = document.querySelector<HTMLButtonElement>('.support-submit')
  if (submitBtn) submitBtn.textContent = 'Gönder'
  setStatus('')
})

supportForm?.addEventListener('submit', async (event) => {
  event.preventDefault()
  const subject = supportSubject?.value.trim() ?? ''
  const title = supportTitle?.value.trim() ?? ''
  const detail = supportDetail?.value.trim() ?? ''
  const email = getSessionEmail()

  if (!subject || !title) {
    setStatus('Lütfen konu ve başlık alanını doldurun.')
    return
  }
  if (!email) {
    setStatus('Destek talebi icin once giris yapin.')
    return
  }

  const rawItems = (supportHistoryList as HTMLElement | null)?.dataset.items
  const items: SupportRecord[] = rawItems ? (JSON.parse(rawItems) as SupportRecord[]) : []
  try {
    if (editingSupportIndex !== null && items[editingSupportIndex]) {
      const target = items[editingSupportIndex]
      await supportApiRequest(`/support/${target.id}`, 'PUT', { email, subject, title, detail })
      setStatus('Destek talebi güncellendi.')
    } else {
      await supportApiRequest('/support', 'POST', { email, subject, title, detail })
      setStatus('Destek talebiniz gönderildi.')
    }
  } catch {
    setStatus('Destek talebi kaydedilemedi.')
    return
  }

  void renderSupportHistory()
  editingSupportIndex = null
  const submitBtn = document.querySelector<HTMLButtonElement>('.support-submit')
  if (submitBtn) submitBtn.textContent = 'Gönder'
  supportForm.reset()
})

supportHistoryList?.addEventListener('click', async (event) => {
  const target = event.target as HTMLElement
  const email = getSessionEmail()
  if (!email) return
  const rawItems = (supportHistoryList as HTMLElement | null)?.dataset.items
  const items: SupportRecord[] = rawItems ? (JSON.parse(rawItems) as SupportRecord[]) : []

  if (target.classList.contains('history-delete')) {
    const id = Number(target.dataset.id)
    if (Number.isNaN(id)) return
    try {
      await supportApiRequest(`/support/${id}`, 'DELETE', { email })
      void renderSupportHistory()
      setStatus('Talep silindi.')
    } catch {
      setStatus('Talep silinemedi.')
    }
    return
  }

  if (target.classList.contains('history-edit')) {
    const id = Number(target.dataset.id)
    if (Number.isNaN(id)) return
    const itemIndex = items.findIndex((entry) => entry.id === id)
    if (itemIndex < 0) return
    const item = items[itemIndex]
    if (supportSubject) supportSubject.value = item.subject
    if (supportTitle) supportTitle.value = item.title
    if (supportDetail) supportDetail.value = item.detail
    editingSupportIndex = itemIndex
    const submitBtn = document.querySelector<HTMLButtonElement>('.support-submit')
    if (submitBtn) submitBtn.textContent = 'Güncelle'
    setStatus('Talebi düzenleyip güncelleyebilirsiniz.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
})

topProductSearch?.addEventListener('input', () => {
  scheduleTopSearch()
})

topProductSearch?.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeTopSearchResults()
})

topProductSearch?.addEventListener('focus', () => {
  scheduleTopSearch()
})

topSearchResults?.addEventListener('click', (event) => {
  const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('.top-search-result')
  if (!btn) return
  event.preventDefault()
  event.stopPropagation()
  const idx = Number(btn.dataset.idx)
  const item = topSearchMatchBuffer[idx]
  if (!item) return
  closeTopSearchResults()
  if (topProductSearch) topProductSearch.value = ''
  closeMenuPanel()
  openProductDetail(item)
})

categoryLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const key = link.dataset.category ?? 'kadin'
    currentCategoryView = (key as CategoryKey) ?? 'kadin'
    resetCategoryFilters()
    hydrateCategoryFilterOptions(currentCategoryView)
    syncCategoryTitle()
    renderCategoryProducts(currentCategoryView)
    closeMenuPanel()
    setCategoryVisible(true)
    closeAuthModal()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

popularBrandLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault()
    const selectedBrand = (link.dataset.brand ?? '').trim()
    if (!selectedBrand) return

    const lowerBrand = selectedBrand.toLowerCase()
    const preferredCategory = catalogItems.some((item) => item.category === currentCategoryView && item.brand.toLowerCase() === lowerBrand)
      ? currentCategoryView
      : (catalogItems.find((item) => item.brand.toLowerCase() === lowerBrand)?.category ?? 'kadin')

    currentCategoryView = preferredCategory
    resetCategoryFilters()
    hydrateCategoryFilterOptions(currentCategoryView)
    if (filterBrand) {
      filterBrand.value = selectedBrand
      categoryFilters.brand = selectedBrand
    }
    hydrateCategoryFilterOptions(currentCategoryView)
    syncCategoryTitle()
    renderCategoryProducts(currentCategoryView)
    closeMenuPanel()
    setCategoryVisible(true)
    closeAuthModal()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
})

categorySection?.addEventListener('change', (event) => {
  const t = event.target
  if (!(t instanceof HTMLSelectElement)) return
  if (!t.closest('.category-filters')) return
  syncFiltersFromControls()
  hydrateCategoryFilterOptions(currentCategoryView)
  syncCategoryTitle()
  renderCategoryProducts(currentCategoryView)
})

setAccountVisible(false)
setCategoryVisible(false)
setSupportVisible(false)
setProfileVisible(false)
setAddressVisible(false)
setReturnVisible(false)
setCancelVisible(false)
setReviewsVisible(false)
setWishlistVisible(false)
setGiftVisible(false)
setShoppingCartVisible(false)
setOrdersVisible(false)
setFavoritesVisible(false)
applyTranslations()
syncCategoryTitle()
refreshAuthButton()
hydrateCategoryFilterOptions(currentCategoryView)
renderCategoryProducts(currentCategoryView)
renderSupportHistory()
renderOrders()
renderFavorites()
renderBestSellersHome()
renderFavoriteButtons()
setupCityDistrictSelects()
setupAddressCityDistrictSelects()
renderCart()
void pullUserProfileFromBackend().then(() => {
  refreshAuthButton()
})
void pullCommerceStateFromBackend().then(() => {
  renderCart()
  renderOrders()
  renderFavorites()
  renderFavoriteButtons()
  refreshGiftSummary()
})

applyAdminRoute()
window.addEventListener('hashchange', applyAdminRoute)
