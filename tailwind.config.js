/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Nunito: ['"Nunito"', ...defaultTheme.fontFamily.sans],
        NunitoSans: ['"Nunito Sans"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}

