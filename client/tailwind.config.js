/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        kalam: ['Kalam', 'cursive'],
        caveat: ['Caveat', 'cursive'],
        patrick: ['"Patrick Hand"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        theme: {
          bg: 'var(--bg-main)',
          surface: 'var(--bg-surface)',
          secondary: 'var(--bg-surface-secondary)',
          border: 'var(--border-color)',
          primary: 'var(--text-primary)',
          muted: 'var(--text-secondary)',
          subtle: 'var(--text-muted)',
        },
        accent: {
          DEFAULT: '#4F46E5',
          hover: '#4338CA',
          light: '#EEF2FF',
          dark: '#3730A3',
        },
        charcoal: {
          DEFAULT: '#0F172A',
          secondary: '#334155',
          muted: '#64748B',
          light: '#94A3B8',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F8FAFC',
          subtle: '#F1F5F9',
          border: '#E2E8F0',
        },
        notebook: {
          paper: '#FFFFFF',
          line: '#E2E8F0',
          margin: '#E2E8F0',
          highlight: '#FEF3C7',
          ink: '#0F172A',
          blueink: '#0F172A'
        }
      }
    },
  },
  plugins: [],
}
