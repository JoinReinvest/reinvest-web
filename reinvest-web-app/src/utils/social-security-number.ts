import { SOCIAL_SECURITY_NUMBER_SECURE_MASK } from 'constants/social-security-number';
import { createMask } from 'imask';

export const doesSocialSecurityNumberComesFromApi = (value: string | undefined) => (value ? value.includes('***') : false);

export const maskSocialSecurityNumber = (value: string | undefined) => {
  if (value) {
    const lastFourDigits = value.slice(-4);
    const mask = createMask({ mask: SOCIAL_SECURITY_NUMBER_SECURE_MASK });

    return mask.resolve(lastFourDigits);
  }

  return '';
};
