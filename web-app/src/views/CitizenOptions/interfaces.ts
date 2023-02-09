import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';

export interface CitizenOptionsProps extends PrimitiveProps {
  options: CitizenOption[];
}

export interface CitizenOption {
  title: string;
  value: string;
}

type PrimitiveProps = Pick<PrimitiveRadioGroupProps, 'value' | 'onChange' | 'name' | 'required' | 'disabled' | 'orientation'>;
