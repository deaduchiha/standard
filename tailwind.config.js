/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			vazir: [
  				'var(--font-vazirmatn)'
  			]
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			success: {
  				'25': '#F6FEF9',
  				'50': '#ECFDF3',
  				'100': '#D1FADF',
  				'200': '#A6F4C5',
  				'300': '#6CE9A6',
  				'400': '#32D583',
  				'500': '#12B76A',
  				'600': '#039855',
  				'700': '#027A48',
  				'800': '#05603A',
  				'900': '#054F31'
  			},
  			warning: {
  				'25': '#FFFCF5',
  				'50': '#FFFAEB',
  				'100': '#FEF0C7',
  				'200': '#FEDF89',
  				'300': '#FEC84B',
  				'400': '#FDB022',
  				'500': '#F79009',
  				'600': '#DC6803',
  				'700': '#B54708',
  				'800': '#93370D',
  				'900': '#7A2E0E'
  			},
  			error: {
  				'25': '#FFFBFA',
  				'50': '#FEF3F2',
  				'100': '#FEE4E2',
  				'200': '#FECDCA',
  				'300': '#FDA29B',
  				'400': '#F97066',
  				'500': '#F04438',
  				'600': '#D92D20',
  				'700': '#B42318',
  				'800': '#912018',
  				'900': '#7A271A'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			standard: {
  				'50': '#cdede9',
  				'100': '#cdede9',
  				'200': '#9bdbd4',
  				'300': '#69c9be',
  				'400': '#37b7a9',
  				'500': '#05a593',
  				'600': '#048476',
  				'700': '#036358',
  				'800': '#02423b',
  				'900': '#01211d'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
};
