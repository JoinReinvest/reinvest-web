import { Typography as PrimitiveTypography, TypographyProps as PrimitiveProps } from '@hookooekoo/ui-typography';
import { cva } from 'class-variance-authority';

type Variants =
  | 'h1'
  | 'h2'
  | 'h2-responsive'
  | 'h3'
  | 'h4'
  | 'h4-expanded'
  | 'h5'
  | 'h5-larger'
  | 'h6'
  | 'h6-responsive'
  | 'bonus-heading'
  | 'bonus-heading-regular'
  | 'button'
  | 'paragraph-large'
  | 'paragraph-emphasized'
  | 'paragraph-emphasized-regular'
  | 'paragraph'
  | 'paragraph-small'
  | 'link'
  | 'notiications-counter'
  | 'custom-1';

interface Props extends Omit<PrimitiveProps, 'variant'> {
  variant: Variants;
}

const variantMapping = new Map<Variants, PrimitiveProps['variant']>([
  ['h1', 'h1'],
  ['h2', 'h2'],
  ['h2-responsive', 'h2'],
  ['h3', 'h3'],
  ['h4', 'h4'],
  ['h4-expanded', 'h4'],
  ['h5', 'h5'],
  ['h5-larger', 'h5'],
  ['h6', 'h6'],
  ['h6-responsive', 'h6'],
  ['bonus-heading', 'h5'],
  ['paragraph-large', 'p'],
  ['paragraph-emphasized', 'p'],
  ['paragraph-emphasized-regular', 'p'],
  ['paragraph', 'p'],
  ['paragraph-small', 'p'],
  ['link', 'div'],
  ['notiications-counter', 'span'],
  ['custom-1', 'h3'],
]);

const variants = cva(undefined, {
  variants: {
    variant: {
      h1: 'typo-h1',
      h2: 'typo-h2',
      'h2-responsive': 'typo-h2-responsive',
      h3: 'typo-h3',
      h4: 'typo-h4',
      'h4-expanded': 'typo-h4-expanded',
      h5: 'typo-h5',
      'h5-larger': 'typo-h5-larger',
      h6: 'typo-h6',
      'h6-responsive': 'typo-h6-responsive',
      'bonus-heading': 'typo-bonus-heading',
      'bonus-heading-regular': 'text-bonus-heading-regular',
      button: 'typo-button',
      'paragraph-large': 'typo-paragraph-large',
      'paragraph-emphasized': 'typo-paragraph-emphasized',
      'paragraph-emphasized-regular': 'typo-paragraph-emphasized-regular',
      paragraph: 'typo-paragraph',
      'paragraph-small': 'typo-paragraph-small',
      link: 'typo-link',
      'notiications-counter': 'typo-notiications-counter',
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
