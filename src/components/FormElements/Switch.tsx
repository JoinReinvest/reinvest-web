import { Switch as PrimitiveSwitch, SwitchProps as PrimitiveSwitchProps } from '@hookooekoo/ui-switch';
import { FieldValues } from 'react-hook-form';

type Props<FormFields extends FieldValues> = Omit<PrimitiveSwitchProps<FormFields>, 'asChild'>;

export function Switch<FormFields extends FieldValues>({
  name,
  control,
  label,
  labelPosition = 'top',
  disabled = false,
  required = false,
  shouldUnregister,
  rules,
}: Props<FormFields>) {
  return (
    <PrimitiveSwitch
      name={name}
      control={control}
      label={label}
      labelPosition={labelPosition}
      disabled={disabled}
      required={required}
      shouldUnregister={shouldUnregister}
      rules={rules}
    />
  );
}
