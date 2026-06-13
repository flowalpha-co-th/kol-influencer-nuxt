/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
    './app/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      colors: {
        // Ripples v4 design tokens (single blue theme — source of truth)
        primary: {
          DEFAULT: '#2D5BFF', // brand blue, CTAs, active states, links
          foreground: '#FFFFFF',
          dark: '#1A3FB8', // hover on primary
          light: '#4D8BFF', // gradient ends, accents
        },
        primaryDark: '#1A3FB8',
        primaryLight: '#4D8BFF',
        ink: '#0F2747', // headings, primary text
        muted: '#5B6B82', // secondary text
        surface: '#F4F7FB', // page background, inset fills
        // CSS-var tokens kept for retained primitives / focus rings / borders
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
      },
      fontFamily: {
        sans: ['Prompt', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        heading: ['Prompt', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--reka-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--reka-accordion-content-height)' },
          to: { height: '0' },
        },
        'marquee-left': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'marquee-right': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'marquee-left': 'marquee-left 60s linear infinite',
        'marquee-right': 'marquee-right 72s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
