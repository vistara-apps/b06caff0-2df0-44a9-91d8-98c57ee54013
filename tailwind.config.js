/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210 80% 50%)',
        accent: 'hsl(160 70% 45%)',
        error: 'hsl(0 70% 55%)',
        bg: 'hsl(214 30% 97%)',
        surface: 'hsl(0 0% 100%)',
        textPrimary: 'hsl(210 30% 15%)',
        textSecondary: 'hsl(210 20% 40%)',
      },
      borderRadius: {
        'sm': '6px',
        'md': '10px',
        'lg': '16px',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '20px',
        'xl': '32px',
      },
      boxShadow: {
        'card': '0 8px 24px hsla(210, 30%, 12%, 0.12)',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
