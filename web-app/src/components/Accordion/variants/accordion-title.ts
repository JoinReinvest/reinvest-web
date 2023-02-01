import { cva } from 'class-variance-authority';

export const variant = cva('', {
  variants: {
    titleSize: {
      sm: ['text-md font-medium'],
      lg: ['text-xl font-[450] tracking-tighter'],
    },
  },
  defaultVariants: {
    titleSize: 'sm',
  },
});
