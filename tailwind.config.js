/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        nova: { blue: "#000E71", sky: "#39C0FF" },
        surgery: { main: "#7A1613", gold: "#9D793E" },
        fertility: { main: "#009774" },
        pharmacy: { main: "#5B2B97" },
      },
      fontFamily: { nova: ['proxima-nova', 'sans-serif'] },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.5s ease-out both',
        'scale-in': 'scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-right': 'slideInRight 0.35s cubic-bezier(0.16,1,0.3,1) both',
        'slide-in-left': 'slideInLeft 0.35s cubic-bezier(0.16,1,0.3,1) both',
      },
    },
  },
  plugins: [],
}