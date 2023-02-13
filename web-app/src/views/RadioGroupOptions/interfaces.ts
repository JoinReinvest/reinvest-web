import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';

export interface RadioGroupOptionsProps extends RadioGroupProps {
  options: RadioGroupOption[];
  className?: string;
}

export interface RadioGroupOption {
  title: string;
  value: string;
}

type RadioGroupProps = Pick<PrimitiveRadioGroupProps, 'value' | 'onChange' | 'name' | 'required' | 'disabled' | 'orientation'>;
