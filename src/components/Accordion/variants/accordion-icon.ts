import { cva } from 'class-variance-authority';

export const variant = cva('stroke-1.5px', {
  variants: {
    isIconRounded: {
      true: 'p-4 rounded-full bg-green-frost-solid',
    },
  },
});
