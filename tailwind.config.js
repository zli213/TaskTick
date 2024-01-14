/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./components/**/*.{js}'],
  darkMode: 'class',
  content: [],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.500'),
            p: {
              color: theme('colors.orange.500'),
            },
            h1: {
              color: theme('colors.orange.700'),
            }
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.500'),
            p: {
              color: theme('colors.pink.500'),
            },
            h1: {
              color: theme('colors.pink.700'),
            }
          },
        }
      })
    },
  },
  variants: {
    typography: ['dark'],
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

