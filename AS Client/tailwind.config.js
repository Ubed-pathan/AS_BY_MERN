/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customYellow:'#FBFADA',
        customGreen:'#436850',
      },
      fontFamily: {
        'times': ['Times New Roman', 'serif'], // Add Times New Roman
      },
    },
  },
  plugins: [],
}

