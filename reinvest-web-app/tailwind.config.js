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
      1: '.1rem',
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
      50: '5.0rem',
      60: '6.0rem',
      64: '6.4rem',
      68: '6.8rem',
      72: '7.2rem',
      80: '8.0rem',
      84: '8.4rem',
      96: '9.6rem',
      100: '10.0rem',
      110: '11.0rem',
      115: '11.5rem',
      120: '12.0rem',
      137: '13.7rem',
      128: '12.8rem',
      144: '14.4rem',
      160: '16.0rem',
      169: '16.9rem',
      180: '18.0rem',
      210: '21.0rem',
      300: '30.0rem',
      342: '34.2rem',
      460: '46.0rem',
      650: '65.0rem',
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
        '5.4rem',
        {
          lineHeight: '0.9em',
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

      'h5-custom': [
        '2.4rem',
        {
          fontWeight: 400,
          lineHeight: '3.0rem',
          letterSpacing: '-0.05em',
        },
      ],

      h6: [
        '1.6rem',
        {
          fontWeight: '500',
        },
      ],

      'bonus-heading': [
        '1.5rem',
        {
          fontWeight: '400',
          lineHeight: '1.9rem',
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

      'custom-1': [
        '4.8rem',
        {
          fontWeight: 500,
          lineHeight: '4.32rem',
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

    boxShadow: {
      md: '0px 4px 8px rgba(0, 0, 0, 0.08);',
    },

    extend: {
      maxWidth: {
        330: '33rem',
        375: '37.5rem',
        415: '41.5rem',
        720: '72.0rem',
      },
      minHeight: {
        180: '18rem',
        240: '24.0rem',
      },
      maxHeight: {
        146: '14.6rem',
      },
      gridTemplateRows: {
        'full-auto': '1fr auto',
      },
      lineHeight: {
        13: '1.3rem',
      },
      transitionProperty: {
        'height-width': 'height, width',
        'transform-color': 'transform, color',
      },
      animation: {
        'spin-reverse': 'spin 1s linear infinite reverse',
      },
      zIndex: {
        60: '60',
        70: '70',
      },
    },
  },
  plugins: [
    require('tailwindcss-text-fill'),
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
        '.translate-z-0': {
          transform: 'translateZ(0)',
        },
      });
    }),
  ],
};
