import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';

export interface ChartControlProps extends PrimitiveProps {
  options: Option[];
}
export interface Option {
  label: string;
  value: string;
}

type PrimitiveProps = Pick<PrimitiveRadioGroupProps, 'value' | 'onChange' | 'name' | 'required' | 'disabled'>;
