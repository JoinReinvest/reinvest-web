import { Checkbox as PrimitiveCheckbox, CheckboxProps as PrimitiveCheckboxProps } from '@hookooekoo/ui-checkbox';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import { FieldValues } from 'react-hook-form';

type Props<FormFields extends FieldValues> = Omit<PrimitiveCheckboxProps<FormFields>, 'children'>;

export function Checkbox<FormFields extends FieldValues>({ disabled = false, required = false, name, control, shouldUnregister, rules }: Props<FormFields>) {
  return (
    <PrimitiveCheckbox
      name={name}
      control={control}
      disabled={disabled}
      required={required}
      shouldUnregister={shouldUnregister}
      rules={rules}
    >
      <IconCheckmark className="max-h-full max-w-full" />
    </PrimitiveCheckbox>
  );
}
