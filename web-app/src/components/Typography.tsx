import { Typography as PrimitiveTypography, TypographyProps as PrimitiveProps } from '@hookooekoo/ui-typography';
import { cva } from 'class-variance-authority';

type Variants =
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'heading-4'
  | 'heading-5'
  | 'heading-6'
  | 'bonus-heading'
  | 'button'
  | 'link'
  | 'paragraph-large'
  | 'paragraph-emphasized'
  | 'paragraph'
  | 'paragraph-small';

interface Props extends Omit<PrimitiveProps, 'variant'> {
  variant: Variants;
}

const variantMapping = new Map<Variants, PrimitiveProps['variant']>([
  ['heading-1', 'h1'],
  ['heading-2', 'h2'],
  ['heading-3', 'h3'],
  ['heading-4', 'h4'],
  ['heading-5', 'h5'],
  ['heading-6', 'h6'],
  ['bonus-heading', 'h5'],
  ['link', 'span'],
  ['paragraph-large', 'p'],
  ['paragraph-emphasized', 'p'],
  ['paragraph', 'p'],
  ['paragraph-small', 'p'],
]);

const variants = cva(undefined, {
  variants: {
    variant: {
      'heading-1': 'typo-heading-1',
      'heading-2': 'typo-heading-2',
      'heading-3': 'typo-heading-3',
      'heading-4': 'typo-heading-4',
      'heading-5': 'typo-heading-5',
      'heading-6': 'typo-heading-6',
      'bonus-heading': 'typo-bonus-heading',
      'button': 'typo-button',
      'link': 'typo-link',
      'paragraph-large': 'typo-paragraph-large',
      'paragraph-emphasized': 'typo-paragraph-emphasized',
      'paragraph': 'typo-paragraph',
      'paragraph-small': 'typo-paragraph-small',
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
