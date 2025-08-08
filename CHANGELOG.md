# Catatan Rilis

## v0.1.0 — LUYU Frontend

Ringkasan: Penyegaran UI bertema glassmorphism (light/dark), progres bar dengan animasi glow + shimmer, perbaikan UX sidebar mobile, dan modal yang kini dapat discroll. Struktur kode dirapikan (CSS/JS dipisah), dokumentasi diperbarui, serta Live Demo siap.

### Sorotan
- Glassmorphism: light mode lebih cerah; dark mode dengan blur lebih kuat.
- Progress Bar: animasi halus + efek glow; preset tema/kecepatan via CSS variables.
- Sidebar Mobile: klik area luar (overlay) untuk menutup.
- Modal Panjang: konten modal kini dapat discroll; tombol Close selalu dapat dijangkau.
- Live Demo: https://luyu-udo6o.kinsta.page/

### Perubahan Utama
- UI: perbarui latar dan permukaan glass (blur, opacity, shadow, border).
- Progress: tambah `progressShimmer` + “glow head” dan preset (`progress-theme-*`, `progress-speed-*`).
- Struktur: ekstrak CSS inline → `css/site.css`; JS inline → `js/main.js`; `js/tailwind-config.js`.
- Demo BEM: contoh `.card` untuk panduan kontribusi.

### Perbaikan Bug
- Navbar/Sidebar: tambah `#mobile-overlay` + handler klik untuk menutup di perangkat mobile.
- Modal (Keamanan & Privasi, Metode Pembayaran): atur `overflow-y: auto` pada overlay dan `max-height` pada konten modal.

### Aksesibilitas & Kinerja
- Hormati `prefers-reduced-motion`: mematikan animasi progres untuk pengguna yang memilih gerakan minimal.
- Tetap ringan (CDN + tanpa build step).

### Dokumentasi
- README: badges teknologi terpisah + badge demo (tautan langsung), Live Demo, rincian fitur.
- AGENTS.md: panduan kontribusi (struktur, style, testing, PR).

### Instruksi Upgrade
- Pull branch `main`.
- Tidak ada langkah build. Lakukan hard refresh browser bila gaya lama masih tercache.

