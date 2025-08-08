// Minimal app scaffold
// Use ES module pattern if expanded later

// Global app bootstrap stub; called by Preloader onComplete
window.initializeApp = function initializeApp() {
  console.debug('[LUYU] initializeApp called');
  if (typeof window.showPage === 'function') {
    try { window.showPage('dashboard'); } catch (e) { console.debug('showPage not ready yet'); }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  console.debug('[LUYU] App initialized');
});
