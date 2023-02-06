import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { variant as iconVariants } from './variants/accordion-icon';
import { variant } from './variants/index';

export interface AccordionProps extends VariantsProps {
  children: ReactNode;
  title: string;
  className?: string;
  isOpen?: boolean;
  subtitle?: string;
  titleSize?: 'sm' | 'lg';
}

type VariantsProps = VariantProps<typeof iconVariants> & VariantProps<typeof variant>;
