import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import cx from 'classnames';

import { SelectionCardsProps } from './interfaces';

export const SelectionCards = ({ value, onChange, options, name, required, disabled, orientation }: SelectionCardsProps) => (
  <RadioGroup
    name={name}
    value={value}
    className="flex gap-[36px]"
    onChange={onChange}
    required={required}
    disabled={disabled}
    orientation={orientation}
    readingDirection="ltr"
    loopNavigation
  >
    {options.map(option => (
      <RadioGroupItem
        key={option.value}
        value={option.value}
        className={cx(
          'px-[36px] py-24',
          "data-[state='checked']:bg-green-frost-01 data-[state='checked']:text-black-01",
          "data-[state='unchecked']:text-gray-03 data-[state='unchecked']:border data-[state='unchecked']:border-gray-03",
        )}
      >
        <>
          <h4 className="text-15">{option.title}</h4>
          <p>{option.description}</p>
        </>
      </RadioGroupItem>
    ))}
  </RadioGroup>
);
