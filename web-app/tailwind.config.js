/** @type {import('tailwindcss').default} */
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      sans: ['GT-America', ...defaultTheme.fontFamily.sans],
    },
    spacing: {
      0: 0,
      2: '.2rem',
      4: '.4rem',
      6: '.6rem',
      8: '.8rem',
      10: '1rem',
      12: '1.2rem',
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      18: '1.8rem',
      20: '2rem',
      22: '2.2rem',
      24: '2.4rem',
      26: '2.6rem',
      28: '2.8rem',
      30: '3.0rem',
      32: '3.2rem',
      36: '3.6rem',
      40: '4.0rem',
      48: '4.8rem',
      60: '6.0rem'
    },
    fontSize: {
      base: '10px',
      11: '1.1rem',
      12: '1.2rem',
      13: '1.3rem',
      14: '1.4rem',
      15: '1.5rem',
      md: '1.6rem',
      lg: '1.8rem',
      xl: '2rem',
      '2xl': '2.4rem',
      '3xl': '2.8rem',
      '4xl': '3rem',
      '5xl': '3.6rem',
      '6xl': '4.8rem',
      '7xl': '5.4rem',
      '8xl': '6.4rem',
    },
    lineHeight: {
      90: '90%',
      100: '100%',
      110: '110%',
      125: '125%',
      150: '150%',
      normal: 'normal',
    },
    colors: {
      // PRIMARY
      white: '#ffffff',
      black: {
        '01': '#000000',
        '02': '#1B1B1B'
      },
      green: {
        deep: '#11270B',
        frost: {
          '01': '#C1EBD9',
          '02': '#C1EBD999',
          '03': '#C1EBD94D',
        },
      },

      // SECONDARY
      dark: '#081224',
      gray: {
        '01': '#575E6C',
        '02': '#939AA2',
        '03': '#D4D6DA',
        '04': '#E9E9E9',
        '05': '#FCFCFC'
      },

      // TERTIARY
      tertiary: {
        success: '#44CB7A',
        error: '#FA375A',
        warning: '#FAC337'
      },

      // AUXILIARY
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit'
    },
    boxShadow: {
      'focused-input': '0 0px 0px 2px #C1EBD9',
    },
    extend: {
      maxWidth: {
        332: '33.2rem'
      },
      fontWeight: {
        'extended-regular': 450,
      },
      zIndex: {
        1: '1',
      },
    },
  },
  plugins: [
    require('tailwindcss-text-fill'),
    require('@tailwindcss/line-clamp'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
};
