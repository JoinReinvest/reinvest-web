import { InputMasked as PrimitiveInputMasked } from '@hookooekoo/ui-input-masked';
import { ComponentPropsWithoutRef, useMemo } from 'react';
import { useController } from 'react-hook-form';
import { FieldValues, UseControllerProps } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {}

type PrimitiveProps = Pick<PrimitiveInputProps, 'required' | 'disabled' | 'placeholder' | 'maskOptions'>;

type PrimitiveInputProps = ComponentPropsWithoutRef<typeof PrimitiveInputMasked>;

export function InputMasked<FormFields extends FieldValues>({
  required = false,
  disabled = false,
  maskOptions,
  placeholder,
  ...controllerProps
}: Props<FormFields>) {
  const { field, fieldState } = useController(controllerProps);
  const value = useMemo(() => field.value, [field]);

  return (
    <PrimitiveInputMasked
      name={field.name}
      value={value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      maskOptions={maskOptions}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      error={fieldState?.error?.message}
    />
  );
}
