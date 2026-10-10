import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: 'var(--ink)',
        paper: 'var(--bg)',
        surface: 'var(--surface)',
        line: 'var(--line)',
        field: 'var(--field)',
        muted: 'var(--muted)',
        'on-solid': 'var(--on-solid)',
        brand: { DEFAULT: 'var(--brand)', fg: 'var(--brand-fg)', text: 'var(--brand-text)', soft: 'var(--brand-soft)' },
        success: { DEFAULT: 'var(--success)', soft: 'var(--success-soft)' },
        warning: { DEFAULT: 'var(--warning)', soft: 'var(--warning-soft)' },
        danger: { DEFAULT: 'var(--danger)', soft: 'var(--danger-soft)' },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      keyframes: {
        refresh: {
          '0%': { boxShadow: '0 0 0 6px var(--brand-text)' },
          '100%': { boxShadow: '0 0 0 0 transparent' },
        },
      },
      animation: { refresh: 'refresh 0.9s ease-out 1' },
    },
  },
  plugins: [],
};
export default config;
