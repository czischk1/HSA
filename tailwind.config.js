/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0A1F44',
        green: '#1A5C38',
        gold: '#C8A84B',
        steel: '#2E6DA4',
        amber: '#E67E22',
        red: '#C0392B',
        silver: '#F4F6F9',
        silver2: '#EBF0F7',
        dark: '#3D4A5C',
        mid: '#8C96A8',
        rule: '#DDE3EC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        pill: '999px',
      },
    },
  },
  plugins: [],
}
