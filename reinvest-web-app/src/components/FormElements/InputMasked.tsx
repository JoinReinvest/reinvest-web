import { InputMasked as PrimitiveInputMasked } from '@hookooekoo/ui-input-masked';
import { ComponentPropsWithoutRef } from 'react';
import { FieldValues } from 'react-hook-form';

export type InputMaskedProps<FormFields extends FieldValues> = PrimitiveProps<FormFields>;
type PrimitiveProps<FormFields extends FieldValues> = Omit<PrimitiveInputMaskedProps<FormFields>, 'error'>;
type PrimitiveInputMaskedProps<FormFields extends FieldValues> = ComponentPropsWithoutRef<typeof PrimitiveInputMasked<FormFields>>;

export type CustomInputMaskedProps<FormFields extends FieldValues> = Omit<InputMaskedProps<FormFields>, 'maskOptions' | 'willUseUnmaskedValue'>;

export function InputMasked<FormFields extends FieldValues>({
  name,
  control,
  maskOptions,
  placeholder,
  required = false,
  disabled = false,
  autoComplete = false,
  willUseUnmaskedValue = true,
  defaultValue,
  shouldUnregister,
  rules,
}: InputMaskedProps<FormFields>) {
  return (
    <PrimitiveInputMasked
      name={name}
      control={control}
      maskOptions={maskOptions}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      rules={rules}
      willUseUnmaskedValue={willUseUnmaskedValue}
    />
  );
}
