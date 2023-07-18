import { SOCIAL_SECURITY_NUMBER_SECURE_MASK } from 'constants/social-security-number';
import { createMask } from 'imask';
import { z } from 'zod';

export const doesSocialSecurityNumberComesFromApi = (value: string | undefined) => (value ? value.includes('***') : false);

export const maskSocialSecurityNumber = (value: string | undefined) => {
  if (value) {
    const lastFourDigits = value.slice(-4);
    const mask = createMask({ mask: SOCIAL_SECURITY_NUMBER_SECURE_MASK });

    return mask.resolve(lastFourDigits);
  }

  return '';
};

export function generateSchema(defaultValues: { ssn?: string }) {
  return z
    .object({
      ssn: z.string(),
    })
    .superRefine((fields, context) => {
      const values = [fields.ssn, defaultValues.ssn];
      const isMaskedFromApi = values.every(doesSocialSecurityNumberComesFromApi);
      const hasEnteredStoredValue = fields.ssn === defaultValues.ssn;
      const matchesSecurePattern = !!fields.ssn.match(/^(\*{3}-\*{2}-\*{2}(?!0{2})\d{2})$/);
      const matchesRegularPattern = !!fields.ssn.match(/^((?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|(\*{3}-\*{2}-\*{2}(?!0{2})\d{2})$/);

      const doesNotMatchApiField = isMaskedFromApi && !matchesSecurePattern && !hasEnteredStoredValue;
      const doesNotMatchInitializedField = !defaultValues.ssn && !matchesRegularPattern;
      const doesNotMatchFieldOnReturn = !isMaskedFromApi && !matchesRegularPattern;

      if (doesNotMatchApiField || doesNotMatchInitializedField || doesNotMatchFieldOnReturn) {
        context.addIssue({
          code: 'invalid_string',
          message: 'Invalid Social Security Number',
          path: ['ssn'],
          validation: 'regex',
        });
      }
    });
}
