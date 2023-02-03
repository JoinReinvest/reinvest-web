import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';

import { ChartControlProps } from './interfaces';

export const ChartControls = ({ options, value, onChange, name, required = false, disabled = false }: ChartControlProps) => {
  return (
    <RadioGroup
      name={name}
      value={value}
      onChange={onChange}
      className="flex justify-evenly"
      required={required}
      disabled={disabled}
      orientation="horizontal"
      readingDirection="ltr"
      loopNavigation
    >
      {options.map(({ label, value }) => (
        <RadioGroupItem
          key={value}
          value={value}
          className="text-medium mb-8 border-b-[2px] border-b-transparent px-4 text-11 uppercase data-[state='checked']:border-b-black-01 data-[state='checked']:text-black-01 data-[state='unchecked']:text-gray-03"
        >
          <p>{label}</p>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
};
