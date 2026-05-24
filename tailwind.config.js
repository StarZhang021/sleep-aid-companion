/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0a0f2a',
        'primary-light': '#0d1b3e',
        accent: '#FFD966',
        'accent-dim': '#b8982e',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
