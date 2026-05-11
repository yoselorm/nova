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
    },
  },
  plugins: [],
}