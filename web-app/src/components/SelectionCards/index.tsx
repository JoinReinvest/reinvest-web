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
          "data-[state='checked']:bg-green-frost-solid data-[state='checked']:text-black",
          "data-[state='unchecked']:text-gray-light data-[state='unchecked']:border data-[state='unchecked']:border-gray-light",
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
