import { VariantProps } from 'class-variance-authority';
import { ReactNode } from 'react';

import { variant as iconVariants } from './variants/accordion-icon';
import { variant as titleVariants } from './variants/accordion-title';
import { variant } from './variants/index';

export interface AccordionProps extends VariantsProps {
  children: ReactNode;
  title: string;
  className?: string;
  isOpen?: boolean;
  subtitle?: string;
}

type VariantsProps = VariantProps<typeof titleVariants> & VariantProps<typeof iconVariants> & VariantProps<typeof variant>;
