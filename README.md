# D&I Eyewear - Gozluk Sitesi

Modern bir gozluk e-ticaret projesi. On yuz tarafinda Vite + TypeScript, arka planda Express + PostgreSQL kullanir.

## Ozellikler

- Kullanici kayit / giris / sifre sifirlama akisi
- Hesap paneli (siparis, adres, iade, destek, favori, para puan)
- Admin girisi ve temel yonetim panelleri
- Vite proxy ile `/api` isteklerini backend'e yonlendirme

## Teknolojiler

- Frontend: `Vite`, `TypeScript`
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
