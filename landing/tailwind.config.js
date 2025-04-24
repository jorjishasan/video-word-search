/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))',
  				hover: 'hsl(217, 99%, 68%)'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))',
  				dark: 'hsl(261, 70%, 42%)'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			text: {
  				primary: 'hsl(0, 0%, 100%)',
  				secondary: 'hsl(214, 16%, 65%)',
  				tertiary: 'hsl(215, 16%, 47%)'
  			},
  			glow: {
  				blue: 'hsla(217, 97%, 62%, 0.5)',
  				purple: 'hsla(262, 83%, 58%, 0.5)'
  			},
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
  				'system-ui',
  				'sans-serif'
  			],
  			mono: [
  				'var(--font-geist-mono)',
  				'monospace'
  			]
  		},
  		animation: {
  			marquee: 'marquee 25s linear infinite',
  			'marquee-reverse': 'marquee-reverse 25s linear infinite',
  			'fade-in': 'fade-in 0.5s ease-out',
  			'fade-in-up': 'fade-in-up 0.7s ease-out',
  			'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			float: 'float 6s ease-in-out infinite',
  			glow: 'glow 2s ease-in-out infinite alternate',
  			'gradient-text': 'gradient-text 8s ease infinite',
  			'blur-in': 'blur-in 0.7s cubic-bezier(0.11, 0, 0.5, 0)',
  			aurora: 'aurora 10s ease infinite',
  			'pulse-slower': 'pulse-slower 12s ease-in-out infinite',
  			'drift': 'drift 180s linear infinite',
  			'drift-reverse': 'drift-reverse 240s linear infinite',
  			'twinkle': 'twinkle 8s infinite alternate',
  			'nebula-pulse': 'nebula-pulse 25s ease infinite alternate',
  			'grid-rotate': 'grid-rotate 180s linear infinite',
  			'digital-float': 'digital-float 120s linear infinite',
  		},
  		keyframes: {
  			marquee: {
  				'0%': {
  					transform: 'translateX(0%)'
  				},
  				'100%': {
  					transform: 'translateX(-100%)'
  				}
  			},
  			'marquee-reverse': {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(0%)'
  				}
  			},
  			'fade-in': {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			'fade-in-up': {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(20px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			glow: {
  				'0%': {
  					boxShadow: '0 0 5px rgba(61, 132, 253, 0.3)'
  				},
  				'100%': {
  					boxShadow: '0 0 20px rgba(61, 132, 253, 0.6)'
  				}
  			},
  			'gradient-text': {
  				'0%, 100%': { backgroundPosition: '0% 50%' },
  				'50%': { backgroundPosition: '100% 50%' },
  			},
  			'blur-in': {
  				'0%': {
  					filter: 'blur(12px)',
  					opacity: '0'
  				},
  				'100%': {
  					filter: 'blur(0)',
  					opacity: '1'
  				}
  			},
  			aurora: {
  				'0%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				},
  				'100%': {
  					backgroundPosition: '0% 50%'
  				}
  			},
  			'pulse-slow': {
  				'0%, 100%': { opacity: '0.5', transform: 'scale(1)' },
  				'50%': { opacity: '0.7', transform: 'scale(1.05)' },
  			},
  			'pulse-slower': {
  				'0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
  				'50%': { opacity: '0.6', transform: 'scale(1.08)' },
  			},
  			'drift': {
  				'0%': { backgroundPosition: '0% 0%' },
  				'100%': { backgroundPosition: '100% 100%' },
  			},
  			'drift-reverse': {
  				'0%': { backgroundPosition: '100% 100%' },
  				'100%': { backgroundPosition: '0% 0%' },
  			},
  			'twinkle': {
  				'0%, 100%': { opacity: '0.4' },
  				'50%': { opacity: '0.9' },
  			},
  			'nebula-pulse': {
  				'0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
  				'50%': { opacity: '0.8', transform: 'scale(1.05)' },
  			},
  			'grid-rotate': {
  				'0%': { transform: 'rotate(0deg)' },
  				'100%': { transform: 'rotate(360deg)' },
  			},
  			'digital-float': {
  				'0%': { backgroundPosition: '0% 0%' },
  				'50%': { backgroundPosition: '100% 100%' },
  				'100%': { backgroundPosition: '0% 0%' },
  			},
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		}
  	}
  },
  plugins: []
}