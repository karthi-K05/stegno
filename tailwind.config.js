/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FFF9E9',
          200: '#FFF3D3',
          300: '#FFECBC',
          400: '#FFE5A5',
          500: '#FFDE8E',
        },
      },
    },
  },
  plugins: [],
};