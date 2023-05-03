import { createMask } from 'imask';

interface Options {
  addDecimalPoints?: boolean;
}

export const maskCurrency = (value: number | string, options?: Options) => {
  const mask = createMask({
    mask: [
      { mask: '' },
      {
        mask: '$num',
        blocks: {
          num: {
            scale: options?.addDecimalPoints ? 2 : 0,
            mask: Number,
            thousandsSeparator: ',',
            radix: '.',
          },
        },
      },
    ],
  });

  return mask.resolve(`${value}`);
};
