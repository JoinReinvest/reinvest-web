import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import cx from 'classnames';
import { Typography } from 'components/Typography';

import { SelectionCardsProps } from './interfaces';

export const SelectionCards = ({ value, onChange, options, name, required, disabled, orientation }: SelectionCardsProps) => (
  <RadioGroup
    name={name}
    value={value}
    className="flex w-full flex-col items-center justify-center gap-16 lg:flex-row lg:gap-24"
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
          'px-36 py-24 flex flex-col justify-center items-center gap-4',
          'state-checked:bg-green-frost-01 state-checked:text-black-01',
          'state-unchecked:text-gray-03 state-unchecked:border state-unchecked:border-gray-03',
        )}
      >
        <Typography
          variant="paragraph-emphasized"
          className="state-checked:"
        >
          {option.title}
        </Typography>
        <Typography
          className="text-gray-03 w-2/3"
          variant="paragraph-small"
        >
          {option.description}
        </Typography>
      </RadioGroupItem>
    ))}
  </RadioGroup>
);
