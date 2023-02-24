import { InputMasked as PrimitiveInputMasked } from '@hookooekoo/ui-input-masked';
import { ComponentPropsWithoutRef } from 'react';
import { useController } from 'react-hook-form';
import { FieldValues, UseControllerProps } from 'react-hook-form';

type PrimitiveProps = Pick<PrimitiveInputProps, 'required' | 'disabled' | 'placeholder' | 'maskOptions'>;

type PrimitiveInputProps = ComponentPropsWithoutRef<typeof PrimitiveInputMasked>;

export interface InputMaskedProps<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {}

export type CustomInputMaskedProps<FormFields extends FieldValues> = Omit<InputMaskedProps<FormFields>, 'placeholder' | 'maskOptions'>;

export function InputMasked<FormFields extends FieldValues>({
  required = false,
  disabled = false,
  maskOptions,
  placeholder,
  ...controllerProps
}: InputMaskedProps<FormFields>) {
  const { field, fieldState } = useController(controllerProps);

  return (
    <PrimitiveInputMasked
      name={field.name}
      onChange={field.onChange}
      value={field.value}
      onBlur={field.onBlur}
      maskOptions={maskOptions}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      error={fieldState?.error?.message}
    />
  );
}
