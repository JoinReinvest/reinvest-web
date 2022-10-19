import { Root as RadioGroupRoot } from '@radix-ui/react-radio-group';
import { Dispatch, SetStateAction } from 'react';

import { SelectionCardOption } from './SelectionCardOption';

export interface SelectionCardsProps {
  name: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: SelectionOption[];
  selected: string;
}

export interface SelectionOption {
  description: string;
  title: string;
  value: string;
}

export const SelectionCards = ({ selected, onChange, options, name }: SelectionCardsProps) => (
  <RadioGroupRoot
    defaultValue={selected}
    aria-label={name}
    className="flex gap-[36px]"
    onValueChange={value => onChange(value)}
  >
    {options.map(option => (
      <SelectionCardOption
        key={option.value}
        option={option}
      />
    ))}
  </RadioGroupRoot>
);
