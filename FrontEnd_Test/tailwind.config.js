/** @type {import('tailwindcss').Config} */
export default {
  testEnvironment: 'jsdom', 
  transform: {
    '^.+\\.jsx?$': 'babel-jest', 
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#27589E',
        customGreen: '#037954'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}