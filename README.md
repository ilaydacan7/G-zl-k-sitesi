# D&I Eyewear - Gozluk Sitesi

Modern bir gozluk e-ticaret projesi. On yuz tarafinda Vite + TypeScript, arka planda Express + PostgreSQL kullanir.

## Sistem mimarisi (tablosuz ozet)

Uygulama **istemci–sunucu** modelindedir. Tarayicida calisan istemci, HTTP uzerinden Express API ile konusur; kalici veri **PostgreSQL** uzerindedir.

**On yuz:** Kaynak kod **TypeScript** ile yazilir; derleme ve gelistirme sunucusu **Vite** kullanilir. Bu sayede statik tip denetimi, daha guvenli refaktor ve IDE destegi saglanir. **React**, footer gibi bolumlerde `mount` ile **parca (island)** olarak kullanilir; ana etkilesim akisi buyuk olcude TypeScript ile DOM uzerinden yurutulur. Raporunuzda yalnizca “React SPA” demek yerine **“TypeScript tabanli istemci (Vite); React secili modullerde”** demek teknik olarak daha dogrudur ve projeyi bozmaz.

**Arka yuz:** **Node.js** + **Express** REST API; kimlik, sepet/ siparis durumu, admin islemleri vb.

## Hukuki moduller (KVKK, cerez, mesafeli satis) — neden gerekli?

- **KVKK (aydinlatma metni):** Kisisel veri (uye kaydi, siparis, iletisim) islenmeden once kullanicinin **hangi verinin hangi amacla islendigini** bilmesi ve hukuki dayanagin aciklanmasi gerekir.
- **Cerez politikasi:** Oturum, tercih veya analitik amacli cerez/ benzeri teknolojiler kullaniliyorsa **ne icin kullanildigi ve nasil yonetilecegi** seffaf sekilde bildirilmelidir.
- **Mesafeli satis sozlesmesi / on bilgilendirme:** Mesafeli satislarda (internet magazasi) tuketicinin **cayma, iade, odeme, teslimat** gibi haklari sozlesme ve on bilgilendirme ile duzenlenir; odeme oncesinde **onay** istenmesi beklenir (projede odeme modalinda ilgili onay kutusu vardir).

**Projede durum:** Footer’da kurumsal baglantilar (icerik henuz yer tutucu) ve admin **CMS → Kurumsal sayfalar** ile uzun metinler saklanabilir; canli ortamda KVKK / cerez / mesafeli satis metinleri avukat veya uyum ekibiyle netlestirilmelidir.

## Ozellikler

- Kullanici kayit / giris / sifre sifirlama akisi
- Hesap paneli (siparis, adres, iade, destek, favori, para puan)
- Admin girisi ve temel yonetim panelleri
- Vite proxy ile `/api` isteklerini backend'e yonlendirme

## Teknolojiler

- Frontend: `Vite`, `TypeScript` (secili parcalarda `React`)
- Backend: `Node.js`, `Express`
- Veritabani: `PostgreSQL` (`pg`)
- Diger: `dotenv`, `cors`, `nodemailer`, `concurrently`

## Proje Yapisi

```text
.
|-- src/              # frontend kaynak kodu
|-- public/           # statik dosyalar ve gorseller
|-- backend/          # Express API
|-- .env.example      # ornek ortam degiskenleri
|-- vite.config.ts    # Vite ayarlari
|-- package.json      # scriptler ve bagimliliklar
```

## Kurulum

1) Node.js 20+ kurulu olmali.  
2) Bagimliliklari yukleyin:

```bash
npm install
```

3) Ortam degiskenlerini hazirlayin:

```bash
copy .env.example .env
```

4) `.env` icinde ozellikle su alanlari doldurun:

- `DATABASE_URL`
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `ADMIN_SESSION_SECRET`
- Mail ayarlari (`SMTP_*`) gerekiyorsa

## Gelistirme Komutlari

```bash
npm run dev        # Sadece Vite (http://localhost:5173)
npm run dev:api    # Sadece API  (http://localhost:4000)
npm run dev:all    # Vite + API birlikte
npm run dev:fresh  # Portlari temizleyip Vite + API baslatir
```

Yardimci komutlar:

```bash
npm run ports:free
npm run open:site
npm run open:api
```

## Uretim Build

```bash
npm run build
npm run preview
```

## Guvenlik Notu

- `.env` dosyasini kesinlikle repoya eklemeyin.
- Sadece `.env.example` repoda tutulmalidir.
- Uretimde guclu bir `ADMIN_SESSION_SECRET` kullanin.

## Lisans

Bu proje kisisel / egitsel kullanim amacli hazirlanmistir.
