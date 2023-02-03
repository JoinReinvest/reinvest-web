import { cva } from 'class-variance-authority';

export const variants = cva('relative', {
  variants: {
    size: {
      sm: 'w-28 h-28',
      md: 'w-44 h-44',
      lg: 'w-72 h-72',
      xl: 'w-100 h-100',
    },
  },
});
