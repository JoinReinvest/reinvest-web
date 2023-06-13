import { cva, VariantProps } from 'class-variance-authority';

export type PrimitiveVariantProps = VariantProps<typeof variants>;

export const variants = cva('text-15 h-48 w-full font-medium', {
  variants: {
    variant: {
      default: ['bg-green-frost-01', 'disabled:bg-gray-04 disabled:text-gray-01'],
      outlined: ['border-2 border-green-frost-01', 'disabled:border-gray-04 disabled:text-gray-03'],
      dashed: ['border border-dashed border-green-frost-01', 'disabled:border-gray-04 disabled:text-gray-03'],
      error: ['bg-tertiary-error-02 text-white'],
    },
    size: {
      sm: 'px-16 py-12',
      lg: 'px-30 py-15',
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
});
