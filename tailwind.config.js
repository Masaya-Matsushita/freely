/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#B9BAC1',
          200: '#AFAFAF',
          300: '#999999',
          400: '#798087',
          500: '#495057',
          600: '#333333',
        },
        main: {
          100: '#F8F9FA',
          200: '#E1E5F0',
          300: '#EEF2FF',
          400: '#6C6DE4',
          500: '#6466F1',
        },
      },
      height: {
        screen: ['100vh', '100dvh'],
      },
      minHeight: {
        screen: ['100vh', '100dvh'],
      },
      maxHeight: {
        screen: ['100vh', '100dvh'],
      },
    },
    // Mantineと一致させる
    screens: {
      xxs: '340px',
      xs: '576px',
      sm: '768px',
      md: '992px',
      lg: '1200px',
      xl: '1400px',
    },
  },
  plugins: [],
}
