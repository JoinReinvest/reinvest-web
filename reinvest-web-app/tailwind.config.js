/** @type {import('tailwindcss').default} */
const defaultTheme = require('tailwindcss/defaultTheme');

const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
      },
    },
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
      20: '2rem',
      22: '2.2rem',
      24: '2.4rem',
      26: '2.6rem',
      28: '2.8rem',
      30: '3.0rem',
      32: '3.2rem',
      34: '3.4rem',
      36: '3.6rem',
      38: '3.8rem',
      40: '4.0rem',
      44: '4.4rem',
      48: '4.8rem',
      60: '6.0rem',
      72: '7.2rem',
      84: '8.4rem',
      96: '9.6rem',
      100: '10.0rem',
      120: '12.0rem',
      180: '18.0rem',
      210: '21.0rem',
    },
    fontSize: {
      base: '10px',

      h1: [
        '5.4rem',
        {
          lineHeight: '0.9em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      h2: [
        '3.6rem',
        {
          lineHeight: '1.1em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      h3: [
        '3rem',
        {
          lineHeight: '1.1em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      h4: [
        '2.4rem',
        {
          lineHeight: '1.1em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      h5: [
        '2.2rem',
        {
          lineHeight: '1.1em',
          letterSpacing: '-0.05em',
          fontWeight: '400',
        },
      ],

      h6: [
        '1.6rem',
        {
          fontWeight: '500',
        },
      ],

      'bonus-heading': [
        '1.4rem',
        {
          fontWeight: '400',
        },
      ],

      button: [
        '1.4rem',
        {
          fontWeight: '500',
        },
      ],

      link: [
        '1.4rem',
        {
          fontWeight: '400',
        },
      ],

      'paragraph-large': [
        '1.6rem',
        {
          fontWeight: '400',
        },
      ],

      'paragraph-emphasized': [
        '1.4rem',
        {
          fontWeight: '500',
        },
      ],

      paragraph: [
        '1.2rem',
        {
          fontWeight: '400',
        },
      ],

      'paragraph-small': [
        '1.1rem',
        {
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
          '01': '#C1EBD9',
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
        720: '72.0rem',
      },
      minHeight: {
        180: '18rem',
      },
      transitionProperty: {
        'height-width': 'height, width',
        'transform-color': 'transform, color',
      },

      animation: {
        spinner: 'fade-out 0.8s linear infinite',
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
    plugin(function ({ addVariant, addUtilities }) {
      addVariant('child', '& > *');

      addVariant('state-checked', '&[data-state="checked"]');
      addVariant('state-unchecked', '&[data-state="unchecked"]');
      addVariant('state-open', '&[data-state="open"]');
      addVariant('state-closed', '&[data-state="closed"]');

      addUtilities({
        '.font-stretch-expanded': {
          'font-stretch': 'expanded',
        },

        '.font-stretch-normal': {
          'font-stretch': 'normal',
        },
      });

      addUtilities({
        '.animation-delay-100': {
          'animation-delay': '100ms',
        },
        '.animation-delay-200': {
          'animation-delay': '200ms',
        },
        '.animation-delay-300': {
          'animation-delay': '300ms',
        },
        '.animation-delay-400': {
          'animation-delay': '400ms',
        },
        '.animation-delay-500': {
          'animation-delay': '500ms',
        },
        '.animation-delay-600': {
          'animation-delay': '600ms',
        },
        '.animation-delay-700': {
          'animation-delay': '700ms',
        },
        '.animation-delay-800': {
          'animation-delay': '800ms',
        },
      });
    }),
  ],
};
