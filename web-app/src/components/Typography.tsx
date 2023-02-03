import { Typography as PrimitiveTypography, TypographyProps as PrimitiveProps } from '@hookooekoo/ui-typography';
import { cva } from 'class-variance-authority';

type PrimitiveVariants = Exclude<PrimitiveProps['variant'], 'p' | 'span' | 'div' | undefined>;
export type Variants = 'p-large' | PrimitiveVariants;

interface Props extends Omit<PrimitiveProps, 'variant'> {
  variant: Variants;
}

const variantMapping = new Map<Variants, PrimitiveProps['variant']>([
  ['h1', 'h1'],
  ['p-large', 'p'],
]);

const variants = cva(undefined, {
  variants: {
    variant: {
      h1: 'text-7xl font-normal leading-90 tracking-tighter',
      h2: 'text-5xl font-normal leading-125 tracking-tighter',
      h3: 'text-4.5xl font-light leading-40 tracking-tight-0.03 lg:leading-60',
      h4: ['text-2xl leading-29 font-normal tracking-wider'],
      h5: ['text-xl font-normal leading-125 tracking-tighter'],
      h6: ['text-lg font-normal leading-normal', 'lg:leading-22'],
      'p-large': ['font-normal text-md leading-150'],
    },
  },
});

export const Typography = ({ variant, children, className }: Props) => {
  const styles = variants({ variant, className });

  return (
    <PrimitiveTypography
      variant={variantMapping.get(variant)}
      className={styles}
    >
      {children}
    </PrimitiveTypography>
  );
};
