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

      'heading-1': [
        '5.4rem',
        {
          lineHeight: '0.90em',
          letterSpacing: '-0.05em',
          fontWeight: 450,
        },
      ],

      'heading-1-mobile': [
        '6.4rem',
        {
          lineHeight: '0.90em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-2': [
        '3.6rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      'heading-2-mobile': [
        '5.4rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-3': [
        '3.0rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-3-mobile': [
        '4.8rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-4': [
        '2.4rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      'heading-4-mobile': [
        '1.8rem',
        {
          lineHeight: '1.50em',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'heading-5': [
        '2.0rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-6': [
        '1.6rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'bonus-heading': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'bonus-heading-mobile': [
        '2.8rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      button: [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      link: [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'link-mobile': [
        '1.2rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'paragraph-large': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-large-mobile': [
        '1.6rem',
        {
          lineHeight: '1.5em',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-emphasized': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'paragraph-emphasized-mobile': [
        '1.6rem',
        {
          lineHeight: '1.5em',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      paragraph: [
        '1.2rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-mobile': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-small': [
        '1.1rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],
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
    require('tailwindcss-text-fill'),
    require('@tailwindcss/line-clamp'),
    function ({ addVariant, addUtilities }) {
      addVariant('child', '& > *');

      addUtilities({
        '.font-stretch-expanded': {
          'font-stretch': 'expanded'
        }
      })
    },
  ],
};
