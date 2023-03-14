import { cva, VariantProps } from 'class-variance-authority';

export type PrimitiveVariantProps = VariantProps<typeof variants>;

export const variants = cva('text-15 font-medium w-full h-48', {
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
      className: 'bg-gray-04 text-gray-01',
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
