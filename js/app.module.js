// Module kecil untuk hooking navigasi ke halaman Analitik
// Tidak memutus showPage global; hanya membungkus untuk memicu inisialisasi analitik
import { ensureAnalyticsInitialized } from './modules/analytics.js';

function hookAnalyticsOnNavigation() {
  const originalShowPage = window.showPage;
  if (typeof originalShowPage !== 'function') return;

  window.showPage = function(pageId, ...rest) {
    const result = originalShowPage.apply(this, [pageId, ...rest]);
    if (pageId === 'analytics') {
      // Jalankan inisialisasi analitik berbasis modul
      ensureAnalyticsInitialized().catch(console.error);
    }
    return result;
  };
}

// DOM siap -> pasang hook, dan jika sudah berada di analitik, inisialisasi
window.addEventListener('DOMContentLoaded', () => {
  try {
    hookAnalyticsOnNavigation();
    // Jika aplikasi mengarahkan pertama kali ke analitik, tangkap juga
    const activeItem = document.querySelector('[data-page].bg-luyu-green\\/10');
    if (activeItem && activeItem.getAttribute('data-page') === 'analytics') {
      ensureAnalyticsInitialized().catch(console.error);
    }
  } catch (e) {
    console.error('Module hook analytics gagal:', e);
  }
});

