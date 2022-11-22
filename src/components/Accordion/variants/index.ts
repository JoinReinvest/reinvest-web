import { cva } from 'class-variance-authority';

export const variant = cva('flex flex-col gap-y-8', {
  variants: {
    isChild: {
      true: 'py-24 px-0',
      false: 'p-24',
    },
  },
});
