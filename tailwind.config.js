/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: '#4CAF50',
        accent: '#ff0044',
        bg: {
          primary: '#1a1a1a',
          secondary: '#2a2a2a',
          highlight: '#2a363c',
          interactive: '#4a4a4a',
        },
        content: {
          primary: '#ffffff',
          secondary: '#8b9398',
          tertiary: '#666666',
        },
        feedback: {
          error: '#ff6b6b',
          success: '#4CAF50',
        }
      },
      borderRadius: {
        'sm': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      const newUtilities = {
        '.scrollbar': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#1a1a1a',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#2a363c',
            borderRadius: '4px',
          },
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

