/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'midnightblue': '#05132E',
        'fruityorange': '#EFA25D',
      }
    },
  },
  spacing: {
    '7': '1.75rem',
    '9': '2.25rem'
  },
  plugins: [],
}
