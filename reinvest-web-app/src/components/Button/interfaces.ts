import { ButtonProps as PrimitiveButtonProps } from '@hookooekoo/ui-button';
import { VariantProps } from 'class-variance-authority';

import { variants } from './variants';

export interface ButtonProps extends PrimitiveProps, VariantProps<typeof variants> {
  label: string;
  loading?: boolean;
}

type PrimitiveProps = Omit<PrimitiveButtonProps, 'children' | 'disabled'>;
