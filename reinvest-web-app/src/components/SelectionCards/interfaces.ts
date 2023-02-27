import { RadioGroupProps as PrimitiveRadioGroupProps } from '@hookooekoo/ui-radio-group';

export interface SelectionCardsProps extends PrimitiveProps {
  options: SelectionOption[];
}

export interface SelectionOption {
  title: string;
  value: string;
  description?: string;
}

type PrimitiveProps = Pick<PrimitiveRadioGroupProps, 'value' | 'onChange' | 'name' | 'required' | 'disabled' | 'orientation' | 'className'>;
