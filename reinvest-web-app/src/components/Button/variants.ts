import { cva } from 'class-variance-authority';

export const variants = cva('text-15 font-medium w-full', {
  variants: {
    variant: {
      default: '',
      outlined: ['border-2 border-green-frost-01'],
      dashed: ['border border-dashed border-green-frost-01'],
    },
    size: {
      sm: 'py-12 px-16',
      lg: 'py-15 px-30',
    },
    disabled: {
      true: ['cursor-not-allowed'],
      false: ['text-green-deep'],
    },
    loading: {
      true: ['flex justify-center items-center gap-x-8'],
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
      className: 'bg-gray-04 text-gray-02',
    },
    {
      variant: 'default',
      disabled: false,
      className: 'bg-green-frost-01',
    },
    {
      disabled: true,
      variant: 'outlined',
      className: 'text-gray-03 border-gray-04',
    },
    {
      disabled: true,
      variant: 'dashed',
      className: 'text-gray-03 border-gray-04',
    },
  ],
});
