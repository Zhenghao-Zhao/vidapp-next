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
        'nav-height': 'var(--nav-height)',
        'guide-small': 'var(--guide-small)',
        'guide-normal': 'var(--guide-normal)',
        'footer-height': 'var(--footer-height)',
        'upload-caption': 'var(--upload-caption-width)',
        'upload-height': 'var(--upload-height)',
        'upload-width': 'var(--upload-width)',
        'upload-image-width': 'var(--upload-image-width)',
        'upload-step': '30px',
        'upload-header-height': 'var(--upload-header-height)',
        'view-width': 'var(--view-width)',
        'view-arrow-width': 'var(--view-arrow-width)',
        'view-image-width': 'var(--view-image-width)',
        'view-comment-width': 'var(--view-comment-width)',
        'view-close-top': 'var(--view-close-top)',
        'view-close-right': 'var(--view-close-right)',
        'profile-image-size': 'var(--profile-image-size)',
        'comment-header-height': 'var(--comment-header-height)',
        'comment-footer-height': 'var(--comment-footer-height)',
        'comment-input-height': 'var(--comment-input-height)',
        'comment-info-height': 'var(--comment-info-height)',
      },
      minWidth: {
        'upload-width': '320px',
        'upload-minWidth': 'var(--upload-image-width)',
      },
      maxWidth: {
        'grid-max-width': 'var(--grid-max-width)',
      },
      minHeight: {
        'main-min-height': 'var(--main-min-height)',
      },
      maxHeight: {
        'view-maxHeight': 'var(--view-maxHeight)',
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
