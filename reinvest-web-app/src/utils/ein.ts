import { createMask } from 'imask';

import { EIN_SECURE_MASK } from '../constants/ein';

export const doesEinComesFromApi = (value: string | undefined) => (value ? value.includes('***') : false);

export const maskEin = (value: string | undefined) => {
  if (value) {
    const lastFourDigits = value.slice(-4);
    const mask = createMask({ mask: EIN_SECURE_MASK });

    return mask.resolve(lastFourDigits);
  }

  return '';
};
