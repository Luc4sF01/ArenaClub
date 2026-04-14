/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: '#1a3a2a', light: '#2a5a3f', dark: '#0f2218' },
        accent:  { DEFAULT: '#84cc16', light: '#a3e635', dark: '#65a30d' },
      },
      fontFamily: {
        heading: ['Outfit', 'sans-serif'],
        body:    ['Inter',  'sans-serif'],
      },
    },
  },
  plugins: [],
}
