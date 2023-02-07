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
      3: '.3rem',
      4: '.4rem',
      6: '.6rem',
      8: '.8rem',
      9: '.9rem',
      10: '1rem',
      12: '1.2rem',
      14: '1.4rem',
      15: '1.5rem',
      16: '1.6rem',
      17: '1.7rem',
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
      42: '4.2rem',
      44: '4.4rem',
      48: '4.8rem',
      60: '6.0rem',
      72: '7.2rem',
      100: '10.0rem',
      180: '18.0rem',
    },
    fontSize: {
      base: '10px',

      'h1': [
        '5.4rem',
        {
          lineHeight: '90%',
          letterSpacing: '-5%',
          fontWeight: '400',
        },
      ],

      'h2': [
        '3.6rem',
        {
          lineHeight: '110%',
          letterSpacing: '-5%',
          fontWeight: '400',
        },
      ],

      'h3': [
        '3rem',
        {
          lineHeight: '110%',
          letterSpacing: '-5%',
          fontWeight: '400',
        },
      ],

      'h4': [
        '2.4rem',
        {
          lineHeight: '110%',
          letterSpacing: '-5%',
          fontWeight: '400',
        },
      ],

      'h5': [
        '2.0rem',
        {
          lineHeight: '110%',
          letterSpacing: '-5%',
          fontWeight: '500',
        },
      ],

      'h6': [
        '1.6rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '500',
        },
      ],

      'bonus-heading': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '400',
        },
      ],

      button: [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '500',
        },
      ],

      link: [
        '1.2rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '500',
        },
      ],

      'paragraph-large': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '400',
        },
      ],

      'paragraph-emphasized': [
        '1.4rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '500',
        },
      ],

      'paragraph': [
        '1.2rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '400',
        },
      ],

      'paragraph-small': [
        '1.1rem',
        {
          lineHeight: 'auto',
          letterSpacing: '0%',
          fontWeight: '400',
        },
      ],
    },
    colors: {
      white: '#ffffff',
      black: {
        '01': '#000000',
        '02': '#1B1B1B',
      },
      green: {
        deep: '#11270B',
        frost: {
          '01': '#C1EBD999',
        },
      },
      gray: {
        '01': '#575E6C',
        '02': '#939AA2',
        '03': '#D4D6DA',
        '04': '#E9E9E9',
        '05': '#FCFCFC',
      },

      tertiary: {
        success: '#44CB7A',
        error: '#FA375A',
        warning: '#FAC337',
      },

      transparent: 'transparent',
      current: 'currentColor',
      inherit: 'inherit',
    },
    extend: {
      maxWidth: {
        330: '33rem',
        375: '37.5rem',
      },
      transitionProperty: {
        'height-width': 'height, width',
        'transform-color': 'transform, color',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },

        'fade-out': {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [
    require('tailwindcss-text-fill'),
    require('@tailwindcss/line-clamp'),
    function ({ addVariant, addUtilities }) {
      addVariant('child', '& > *');

      addVariant('state-checked', '&[data-state="checked"]');
      addVariant('state-unchecked', '&[data-state="unchecked"]');
      addVariant('state-open', '&[data-state="open"]');
      addVariant('state-closed', '&[data-state="closed"]');

      addUtilities({
        '.font-stretch-expanded': {
          'font-stretch': 'expanded',
        },
      });
    },
  ],
};
