import type { Config } from 'tailwindcss';

/**
 * Design tokens are sourced from the Figma "Sales Module" file and exposed as
 * CSS variables in `src/index.css`. Tailwind references those variables here so
 * every utility class resolves to a single token — never a hardcoded hex value.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-blue': {
          darkest: 'var(--color-deep-blue-darkest)',
          dark: 'var(--color-deep-blue-dark)',
          mid: 'var(--color-deep-blue-mid)',
          wash: 'var(--color-deep-blue-wash)',
        },
        'text-grey': {
          high: 'var(--color-text-grey-high)',
          'medium-high': 'var(--color-text-grey-medium-high)',
          medium: 'var(--color-text-grey-medium)',
          muted: 'var(--color-text-grey-muted)',
        },
        surface: {
          lowest: 'var(--color-surface-lowest)',
          low: 'var(--color-surface-low)',
          medium: 'var(--color-surface-medium)',
          'brand-wash': 'var(--color-surface-brand-wash)',
        },
        outline: {
          low: 'var(--color-outline-low)',
          medium: 'var(--color-outline-medium)',
        },
        divider: 'var(--color-divider)',
        'tab-divider': 'var(--color-tab-divider)',
        connector: 'var(--color-connector)',
        warning: 'var(--color-warning)',
        link: 'var(--color-link)',
        accent: {
          tangerine: 'var(--color-accent-tangerine)',
          'tangerine-wash': 'var(--color-accent-tangerine-wash)',
          lavender: 'var(--color-accent-lavender)',
          'lavender-wash': 'var(--color-accent-lavender-wash)',
        },
      },
      fontFamily: {
        title: ['Sora', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Lexend', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        caption: ['12px', '16px'],
        label: ['13px', '19.5px'],
        body: ['14px', '19.5px'],
        title: ['16px', '24px'],
      },
      spacing: {
        header: '60px',
        topbar: '84px',
        sidenav: '72px',
        control: '40px',
        'icon-control': '38px',
      },
      borderRadius: {
        control: 'var(--radius-control)',
        card: 'var(--radius-card)',
      },
      boxShadow: {
        'elevation-grey-s': 'var(--shadow-elevation-grey-s)',
        'elevation-blue-l': 'var(--shadow-elevation-blue-l)',
      },
    },
  },
  plugins: [],
};

export default config;
