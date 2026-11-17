/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#092957',
          'navy-deep': '#061B3A',
          'navy-dark': '#041126',
          'navy-light': '#143B73',
          orange: '#FF8A00',
          'orange-hover': '#E57A00',
          'orange-light': '#FFF5EB',
          'orange-subtle': '#FFF0E0',
          soft: '#F7F9FC',
          lightgrey: '#E9EEF5',
          border: '#E2E8F0',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(9, 41, 87, 0.05), 0 4px 6px -4px rgba(9, 41, 87, 0.03)',
        'card': '0 4px 20px -2px rgba(9, 41, 87, 0.06), 0 2px 6px -2px rgba(9, 41, 87, 0.04)',
        'card-hover': '0 12px 30px -4px rgba(9, 41, 87, 0.12), 0 4px 10px -2px rgba(9, 41, 87, 0.06)',
        'orange-glow': '0 8px 25px -4px rgba(255, 138, 0, 0.35)',
      }
    },
  },
  plugins: [],
}
