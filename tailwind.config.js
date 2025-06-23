/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        
      }
    },
  },
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
    require('@tailwindcss/typography'),
  ],
}

