/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#C7C1FF',
        secondary: '#5946FF',
        neutral: '#F5F5F5',
      },
    },
  },
  plugins: [],
}

