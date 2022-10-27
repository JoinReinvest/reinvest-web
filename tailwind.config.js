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
      16: '1.6rem',
      18: '1.8rem',
      20: '2rem',
      22: '2.2rem',
      24: '2.4rem',
      26: '2.6rem',
      28: '2.8rem',
      30: '3.0rem',
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
      transparent: 'rgba(0,0,0,0)',
      black: '#000000',
      white: '#ffffff',
      green: {
        deep: '#11270B',
        frost: {
          solid: '#C1EBD9',
          60: '#C1EBD999',
          30: '#C1EBD94D',
        },
      },
      gray: {
        dark: '#1B1B1B',
        light: '#D4D6DA',
      },
      secondary: {
        1: '#081224',
        2: '#575E6C',
        3: '#939AA2',
        4: '#D4D6DA',
        5: '#E9E9E9',
        6: '#FCFCFC',
        success: '#44CB7A',
        error: '#FA375A',
        warning: '#FAC337',
      },
    },
    boxShadow: {
      'focused-input': '0 0px 0px 2px #C1EBD9',
    },
    extend: {
      fontWeight: {
        'extended-regular': 450,
      },
      zIndex: {
        1: '1',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-radix')({
      variantPrefix: 'radix',
    }),
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
};
