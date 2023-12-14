import type { Config } from 'tailwindcss'

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: { 
    extend: {
      colors: {
        btn: {
          hover: 'var(--btn-hover)',
          primary: 'var(--btn-primary)',
          select: 'var(--btn-select)',
          emphasis: 'var(--btn-emphasis)'
        },
        backdrop: 'var(--backdrop)',
        scrollthumb: 'var(--scrollthumb)',
        'scrollthumb-light': 'var(--scrollthumb-light)',
        tooltip: 'var(--tooltip)',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif'],
      },
      spacing: {
        'guide-small': 'var(--guide-small)',
        'guide-normal': 'var(--guide-normal)',
      },
      screens: {
        'smGb': '820px',
        'lgGb': '1310px',
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config
