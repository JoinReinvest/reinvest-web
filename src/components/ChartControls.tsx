import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields> {
  options: SelectionOption[];
}

export interface SelectionOption {
  label: string;
  value: string;
}

type PrimitiveProps<FormFields extends FieldValues> = Omit<
  PrimitiveRadioGroupProps<FormFields>,
  'className' | 'loopNavigation' | 'children' | 'orientation' | 'readingDirection'
>;

import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';

export function ChartControls<FormFields extends FieldValues>({
  name,
  control,
  options,
  required = false,
  disabled = false,
  defaultValue,
  rules,
  shouldUnregister,
}: Props<FormFields>) {
  return (
    <RadioGroup
      name={name}
      control={control}
      className="flex justify-evenly"
      required={required}
      disabled={disabled}
      orientation="horizontal"
      readingDirection="ltr"
      loopNavigation
      defaultValue={defaultValue}
      rules={rules}
      shouldUnregister={shouldUnregister}
    >
      {options.map(({ label, value }) => (
        <RadioGroupItem
          key={value}
          value={value}
          className="text-medium text-11 mb-8 border-b-2 border-b-transparent px-4 uppercase state-checked:border-b-black-01 state-checked:text-black-01 state-unchecked:text-gray-03"
        >
          <p>{label}</p>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
}
