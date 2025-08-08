// ES Module ringan untuk analitik
// Tujuan: mulai pemisahan logika tanpa memutus handler global

export async function ensureAnalyticsInitialized() {
  if (!('Chart' in window)) {
    await importChartJs();
  }
  if (typeof window.initializeAnalytics === 'function') {
    window.initializeAnalytics();
  }
}

export function getChartJsSrc() {
  return window.__CHARTJS_SRC__ || 'https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js';
}

async function importChartJs() {
  const src = getChartJsSrc();
  await new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = resolve;
    s.onerror = () => reject(new Error('Gagal memuat Chart.js'));
    document.head.appendChild(s);
  });
}

