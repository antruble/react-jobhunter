/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo: ['Exo 2', 'sans-serif'],
        alegreya: ['Alegreya Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
