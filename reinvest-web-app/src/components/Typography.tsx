import { Typography as PrimitiveTypography, TypographyProps as PrimitiveProps } from '@hookooekoo/ui-typography';
import { cva } from 'class-variance-authority';

type Variants =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h5-larger'
  | 'h6'
  | 'h6-responsive'
  | 'bonus-heading'
  | 'button'
  | 'paragraph-large'
  | 'paragraph-emphasized'
  | 'paragraph'
  | 'paragraph-small'
  | 'link'
  | 'custom-1';

interface Props extends Omit<PrimitiveProps, 'variant'> {
  variant: Variants;
}

const variantMapping = new Map<Variants, PrimitiveProps['variant']>([
  ['h1', 'h1'],
  ['h2', 'h2'],
  ['h3', 'h3'],
  ['h4', 'h4'],
  ['h5', 'h5'],
  ['h5-larger', 'h5'],
  ['h6', 'h6'],
  ['h6-responsive', 'h6'],
  ['bonus-heading', 'h5'],
  ['paragraph-large', 'p'],
  ['paragraph-emphasized', 'p'],
  ['paragraph', 'p'],
  ['paragraph-small', 'p'],
  ['link', 'div'],
  ['custom-1', 'h3'],
]);

const variants = cva(undefined, {
  variants: {
    variant: {
      h1: 'typo-h1',
      h2: 'typo-h2',
      h3: 'typo-h3',
      h4: 'typo-h4',
      h5: 'typo-h5',
      'h5-larger': 'typo-h5-larger',
      h6: 'typo-h6',
      'h6-responsive': 'typo-h6-responsive',
      'bonus-heading': 'typo-bonus-heading',
      button: 'typo-button',
      'paragraph-large': 'typo-paragraph-large',
      'paragraph-emphasized': 'typo-paragraph-emphasized',
      paragraph: 'typo-paragraph',
      'paragraph-small': 'typo-paragraph-small',
      link: 'typo-link',
      'custom-1': 'text-custom-1',
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
