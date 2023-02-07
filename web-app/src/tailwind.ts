import resolveConfig from 'tailwindcss/resolveConfig';

// eslint-disable-next-line
// @ts-ignore import/extensions
// eslint-disable-next-line import/extensions
import TW from '../tailwind.config.js';

export const tailwindConfig = resolveConfig(TW) as typeof TW;
