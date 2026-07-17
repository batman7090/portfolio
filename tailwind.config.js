/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Every colour is a CSS variable, so light/dark is a single class swap.
      colors: {
        paper: 'var(--bg)',
        elev: 'var(--bg-elev)',
        ink: 'var(--ink)',
        soft: 'var(--ink-soft)',
        line: 'var(--line)',
        accent: 'var(--accent)',
        'accent-ink': 'var(--accent-ink)',
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['clamp(2.75rem, 7vw, 5.5rem)', { lineHeight: '0.95', letterSpacing: '-0.04em' }],
        title: ['clamp(1.9rem, 3.6vw, 3rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        page: '1120px',
        prose: '68ch',
      },
      borderRadius: {
        card: '20px',
      },
      transitionTimingFunction: {
        // Apple's standard ease — everything moves on this curve.
        smooth: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        rise: 'rise 0.8s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
