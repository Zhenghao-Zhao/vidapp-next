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
        'upload-caption': 'var(--upload-caption-width)',
        'upload-height': 'calc(var(--upload-image-width) + 50px)',
        'upload-width': 'var(--upload-image-width)',
        'share-dialogue-width': 'var(--share-dialogue-width)',
        'upload-step': '30px'
      },
      minWidth: {
        'upload-width': '320px',
        'upload-minWidth': 'var(--upload-image-width)',
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
