import { InputText as PrimitiveTextInput } from '@hookooekoo/ui-input-text';
import { ComponentProps } from 'react';

export type TextInputProps = PrimitiveProps & {
  showArrowIcon?: boolean;
  showSearchIcon?: boolean;
};

type PrimitiveProps = Omit<PrimitiveTextInputProps, 'iconLeft' | 'iconRight'>;
type PrimitiveTextInputProps = ComponentProps<typeof PrimitiveTextInput>;
