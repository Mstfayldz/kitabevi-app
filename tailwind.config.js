/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#C64B31',
        'secondary': '#3D2C1E',
        'base': '#FAF8F1',
        'surface': '#EBE0CF',
        'divider': '#7A6652',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      spacing: {
        'mobile-margin': '24px',
        'mobile-gutter': '16px',
      }
    },
  },
  plugins: [],
}