import { cva, VariantProps } from 'class-variance-authority';

export type PrimitiveVariantProps = VariantProps<typeof variants>;

export const variants = cva('text-15 font-medium w-full h-48', {
  variants: {
    variant: {
      default: ['bg-green-frost-01', 'disabled:bg-gray-04 disabled:text-gray-01'],
      outlined: ['border-2 border-green-frost-01', 'disabled:text-gray-03 disabled:border-gray-04'],
      dashed: ['border border-dashed border-green-frost-01', 'disabled:text-gray-03 disabled:border-gray-04'],
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
});
