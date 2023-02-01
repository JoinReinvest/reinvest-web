import { cva } from 'class-variance-authority';

export const variants = cva('text-15 font-medium', {
  variants: {
    variant: {
      default: ['bg-green-frost-solid'],
      outlined: ['border-2 border-green-frost-solid'],
      dashed: ['border border-dashed border-green-frost-solid'],
    },
    size: {
      sm: 'py-12 px-16',
      lg: 'py-[15px] px-30',
    },
    disabled: {
      true: ['cursor-not-allowed'],
      false: ['text-green-deep'],
    },
    showIcon: {
      left: ['flex flex-row-reverse justify-center items-center gap-x-8', 'py-8 px-16'],
      right: ['flex justify-center items-center gap-x-8', 'py-8 px-16'],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'sm',
    disabled: false,
  },
  compoundVariants: [
    {
      disabled: true,
      variant: 'default',
      className: 'bg-secondary-5 text-secondary-3',
    },
    {
      disabled: true,
      variant: 'outlined',
      className: 'text-secondary-4 border-secondary-5',
    },
    {
      disabled: true,
      variant: 'dashed',
      className: 'text-secondary-4 border-secondary-5',
    },
  ],
});
