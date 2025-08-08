# LUYU — Platform Ojol Syariah (Frontend Demo)

![Status](https://img.shields.io/badge/status-active-success)
[![Demo](https://img.shields.io/badge/demo-live-blueviolet?logo=google-chrome&logoColor=white)](https://luyu-udo6o.kinsta.page/)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chartdotjs&logoColor=white)
![Design](https://img.shields.io/badge/design-Glassmorphism%20%2B%20Dark--Mode-6f42c1)

LUYU adalah prototipe antarmuka (single‑page style) untuk platform ojek online berbasis prinsip syariah. Proyek ini berfokus pada pengalaman pengguna yang modern: tema glassmorphism + blur, dark mode, progres bar animated glow, preloader interaktif, dan modul‑modul halaman seperti Dashboard, Peta Cluster, Pesanan, Dompet Syariah, Analitik, Zakat/Infaq, Wakaf, dan Kajian Online.

## Live Demo
- Production: https://luyu-udo6o.kinsta.page/

## Fitur Utama
- Preloader interaktif dengan progres bar animasi glow dan teks dinamis.
- Tema Glassmorphism dan Dark Mode yang konsisten di seluruh elemen (sidebar, header, card, modal, tabel).
- Navigasi mobile responsif (hamburger) + overlay klik‑untuk‑tutup.
- Komponen analitik dengan Chart.js (line, doughnut, bar) + pembaruan metrik berkala.
- Modul Dompet Syariah: auto‑zakat, auto‑infaq, notifikasi saldo.
- Komponen Maps/Cluster (template UI) + tooltip/aktivitas live simulatif.

## Rincian Fitur
- Dashboard & Navigasi
  - Sidebar responsif dengan highlight halaman aktif, hamburger untuk mobile, overlay klik‑untuk‑tutup, dan dukungan swipe.
  - Header dinamis (judul/subjudul) berganti sesuai halaman.
- Preloader & Progres
  - Preloader dengan teks berputar, progres bar smooth (glow + shimmer), auto hide, dan fallback progres manual.
  - Preset tema/kecepatan progres bar melalui kelas pada `<body>` (purple–gold, green–blue, gold–orange; slow/normal/fast).
- Analitik (Chart.js)
  - Grafik garis revenue vs zakat, doughnut per cluster (A/B/C) dengan label tengah, serta bar impact.
  - Update metrik berkala + formatter nilai (Rp/K/M) pada tooltip dan sumbu.
- Peta Cluster (template interaktif)
  - Zona/marker interaktif (hover/tooltip), filter cluster dan live activity yang diperbarui berkala.
- Dompet Syariah
  - Auto‑zakat 2.5%, auto‑infaq per trip, peringatan saldo, dan penyimpanan preferensi sederhana.
- Pesanan & Detail
  - Kartu status (pending/ongoing/completed/dll), detail pesanan, dan progres individual.
- Kajian Online (mock)
  - Modal live dengan chat simulatif, pesan masuk berkala, counter karakter, dan daftar rekaman kajian.

## Teknologi & Framework
- Tailwind CSS (via CDN) — utility classes; konfigurasi runtime diset pada `js/tailwind-config.js`.
- Chart.js — visualisasi grafik (line/doughnut/bar) di halaman Analitik.
- Vanilla JavaScript — logika aplikasi di `js/main.js`, bootstrap di `js/app.js` (stub `initializeApp`).
- HTML5 tunggal (`index.html`) — tanpa toolchain build (dapat ditambahkan sesuai kebutuhan).

## Struktur Proyek
```
index.html
css/
  ├─ site.css        # gaya utama (termasuk Glassmorphism + progress bar)
  └─ styles.css      # pola BEM ringan (.card, dll) + dark mode
js/
  ├─ main.js         # logika aplikasi (navigasi, charts, modul, ui)
  ├─ app.js          # bootstrap & inisialisasi global (initializeApp)
  └─ tailwind-config.js  # konfigurasi Tailwind CDN runtime
```

## Menjalankan Secara Lokal
- Python: `python3 -m http.server 8080` lalu buka `http://localhost:8080`
- Node (opsional): `npx serve .` atau `npx http-server .`

Tidak memerlukan build. Semua aset dimuat langsung dari file statis + CDN.

## Kustomisasi Tema & Progres Bar
- Glassmorphism aktif lewat kelas `glass` pada `<body>`.
- Preset progres bar (ubah kelas pada `<body>`):
  - Kecepatan: `progress-speed-slow` | `progress-speed-normal` | `progress-speed-fast`
  - Tema: `progress-theme-green-blue` | `progress-theme-purple-gold` | `progress-theme-gold-orange`
- Variabel CSS tersedia: `--progress-speed`, `--progress-start`, `--progress-mid`, `--progress-end`, `--progress-glow-a`, `--progress-glow-b`.

## Catatan Pengembangan
- Kode telah dipisah: CSS inline → `css/site.css`, JS inline → `js/main.js`.
- Mobile sidebar mendukung klik overlay untuk menutup; swipe gesture & resize guard disertakan.
- Aksesibilitas: hormati preferensi reduced‑motion (animasi progres bar dinonaktifkan otomatis).

## Lisensi
Belum ditentukan.
