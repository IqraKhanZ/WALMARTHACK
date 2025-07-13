/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'walmart-blue': '#0071CE',
        'walmart-blue-dark': '#005ba1',
        'walmart-yellow': '#FFC220',
        'walmart-gray': '#F5F5F5',
        'walmart-dark-gray': '#333333',
        'walmart-medium-gray': '#777777',
      },
    },
  },
  plugins: [],
};