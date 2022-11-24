import { cva } from 'class-variance-authority';

export const variants = cva('relative', {
  variants: {
    size: {
      sm: 'w-28 h-28',
      md: 'w-[44px] h-[44px]',
      lg: 'w-[72px] h-[72px]',
      xl: 'w-[100px] h-[100px]',
    },
  },
});
