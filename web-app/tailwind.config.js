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
      60: '6.0rem',
    },
    fontSize: {
      base: '10px',

      'heading-1': [
        '6.4rem',
        {
          lineHeight: '0.90em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-1-mobile': [
        '5.4rem',
        {
          lineHeight: '0.90em',
          letterSpacing: '-0.05em',
          fontWeight: 450,
        },
      ],

      'heading-2': [
        '5.4rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-2-mobile': [
        '3.6rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      'heading-3': [
        '4.8rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-3-mobile': [
        '3.0rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'heading-4': [
        '1.8rem',
        {
          lineHeight: '1.50em',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'heading-4-mobile': [
        '2.4rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
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
        '2.8rem',
        {
          lineHeight: '1.10em',
          letterSpacing: '-0.05em',
          fontWeight: '500',
        },
      ],

      'bonus-heading-mobile': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
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
        '1.2rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'link-mobile': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'paragraph-large': [
        '1.6rem',
        {
          lineHeight: '1.5em',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-large-mobile': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-emphasized': [
        '1.6rem',
        {
          lineHeight: '1.5em',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      'paragraph-emphasized-mobile': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '500',
        },
      ],

      paragraph: [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0',
          fontWeight: '400',
        },
      ],

      'paragraph-mobile': [
        '1.2rem',
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
      // PRIMARY
      white: '#ffffff',
      black: {
        '01': '#000000',
        '02': '#1B1B1B',
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
        '05': '#FCFCFC',
      },

      // TERTIARY
      tertiary: {
        success: '#44CB7A',
        error: '#FA375A',
        warning: '#FAC337',
      },

      // AUXILIARY
      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
    },
    boxShadow: {
      'focused-input': '0 0px 0px 2px #C1EBD9',
    },
    extend: {
      maxWidth: {
        332: '33.2rem',
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
          'font-stretch': 'expanded',
        },
      });
    },
  ],
};
