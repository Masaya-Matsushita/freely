/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    // Mantineと一致させる
    screens: {
      xxs: '320px',
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1400px',
    },
  },
  plugins: [],
}
