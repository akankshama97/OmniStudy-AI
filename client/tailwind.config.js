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
          DEFAULT: '#4A6CF7',
          hover: '#3B5CE5',
          light: '#EEF2FF',
          dark: '#304FFE',
        },
        charcoal: {
          DEFAULT: '#1A1A1E',
          secondary: '#374151',
          muted: '#6B7280',
          light: '#9CA3AF',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          secondary: '#F7F7F8',
          subtle: '#F1F3F5',
          border: '#E5E7EB',
        },
        notebook: {
          paper: '#fcfcf7',
          line: '#e1e8ed',
          margin: '#ff6b6b',
          highlight: '#fff3bf',
          ink: '#1e293b',
          blueink: '#1a365d'
        }
      }
    },
  },
  plugins: [],
}
