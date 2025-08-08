// Tailwind CDN runtime configuration
// Keep this loaded early in <head> after Tailwind CDN

tailwind.config = {
  theme: {
    extend: {
      colors: {
        'luyu-green': '#2ecc71',
        'luyu-gold': '#f1c40f',
        'luyu-blue': '#3498db',
        'luyu-red': '#e74c3c',
        'luyu-purple': '#9b59b6',
        'luyu-gray': '#95a5a6'
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    }
  }
};

