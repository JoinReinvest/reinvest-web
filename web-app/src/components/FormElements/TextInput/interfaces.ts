import { InputText as PrimitiveTextInput } from '@hookooekoo/ui-input-text';
import { ComponentProps } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface TextInputProps<T extends FieldValues> extends UseControllerProps<T>, PrimitiveProps {
  className?: string;
  showArrowIcon?: boolean;
  showSearchIcon?: boolean;
}

type PrimitiveProps = Omit<PrimitiveTextInputProps, 'iconLeft' | 'iconRight' | 'name'>;
type PrimitiveTextInputProps = ComponentProps<typeof PrimitiveTextInput>;
