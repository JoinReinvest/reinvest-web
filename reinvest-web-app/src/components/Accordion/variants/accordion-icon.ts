import { cva } from 'class-variance-authority';

export const variant = cva('stroke-1.5px', {
  variants: {
    isIconRounded: {
      true: 'rounded-full bg-green-frost-01 p-4',
    },
  },
});
