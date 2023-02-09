import { RadioGroup, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import cx from 'classnames';
import { Typography } from 'components/Typography';

import { SelectionCardsProps } from './interfaces';

export const SelectionCards = ({
  value,
  onChange,
  options,
  name,
  required = false,
  disabled = false,
  orientation = 'vertical',
  className,
}: SelectionCardsProps) => (
  <RadioGroup
    name={name}
    value={value}
    onChange={onChange}
    required={required}
    disabled={disabled}
    orientation={orientation}
    readingDirection="ltr"
    loopNavigation
    className={cx('selection-cards', className)}
  >
    {options.map(option => (
      <RadioGroupItem
        key={option.value}
        value={option.value}
        className={cx(
          'px-36 py-24 border',
          'state-checked:bg-green-frost-01 state-checked:text-black-01 state-checked:border-green-frost-01',
          'state-unchecked:text-gray-03 state-unchecked:border-gray-03',
        )}
      >
        <Typography variant="paragraph-large">{option.title}</Typography>

        {option.description && (
          <Typography
            className="text-gray-03"
            variant="paragraph-small"
          >
            {option.description}
          </Typography>
        )}
      </RadioGroupItem>
    ))}
  </RadioGroup>
);
