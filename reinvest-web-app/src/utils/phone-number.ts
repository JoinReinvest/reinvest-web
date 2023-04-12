import { createMask } from 'imask';

export const maskPhoneNumber = (value: string) => {
  const hasTenDigits = value.length > 9;
  const lastTwoDigits = value.slice(-2);
  const pattern = hasTenDigits ? '(xxx) xxx-xx00' : '(xxx) xxx-x00';
  const mask = createMask({ mask: pattern });

  return mask.resolve(lastTwoDigits);
};
