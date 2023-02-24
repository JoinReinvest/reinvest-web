import { ButtonProps as PrimitiveButtonProps } from '@hookooekoo/ui-button';
import { VariantProps } from 'class-variance-authority';

import { variants } from './variants';

export interface ButtonProps extends HkekButtonProps, VariantProps<typeof variants> {
  label: string;
}

type HkekButtonProps = Omit<PrimitiveButtonProps, 'children' | 'disabled'>;
