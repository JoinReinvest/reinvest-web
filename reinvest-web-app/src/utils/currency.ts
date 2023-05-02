import { createMask } from 'imask';

const mask = createMask({
  mask: [
    { mask: '' },
    {
      mask: '$num',
      blocks: {
        num: {
          mask: Number,
          thousandsSeparator: ',',
        },
      },
    },
  ],
});

export const maskCurrency = (value: number | string) => {
  return mask.resolve(`${value}`);
};
