import { cva } from 'class-variance-authority';

export const variant = cva('flex flex-col gap-y-8', {
  variants: {
    isChild: {
      true: 'px-0 py-24',
      false: 'p-24',
    },
  },
});
