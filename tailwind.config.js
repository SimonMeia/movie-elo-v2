/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: ['./resources/**/*.edge', './inertia/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      fontFamily: {
        content: ['Satoshi', 'sans-serif'],
        titles: ['CabinetGrotesk-Extrabold', 'sans-serif'],
      },
      colors: {
        accent: 'rgb(var(--accent))',
      },
    },
  },
  plugins: [],
}
