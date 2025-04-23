/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/pages/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // New wormhole-inspired color palette
        background: {
          dark: "#000000",
          light: "#0F0F14",
        },
        primary: {
          DEFAULT: "#3D84FD",
          hover: "#5A96FE",
        },
        accent: {
          DEFAULT: "#7C3AED",
          dark: "#5B21B6",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          tertiary: "#64748B"
        },
        border: "#1E2134",
        card: "#0F0F14",
        glow: {
          blue: "rgba(61, 132, 253, 0.5)",
          purple: "rgba(124, 58, 237, 0.5)",
        }
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.7s ease-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient-text': 'gradient-text 4s ease infinite',
        'blur-in': 'blur-in 0.7s cubic-bezier(0.11, 0, 0.5, 0)',
        'aurora': 'aurora 10s ease infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(61, 132, 253, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(61, 132, 253, 0.6)' },
        },
        'gradient-text': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'blur-in': {
          '0%': { filter: 'blur(12px)', opacity: '0' },
          '100%': { filter: 'blur(0)', opacity: '1' },
        },
        'aurora': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'noise': "url('/noise.png')",
        'grid-pattern': "linear-gradient(to right, rgba(30, 33, 52, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 33, 52, 0.1) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}