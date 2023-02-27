import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import cx from 'classnames';
import { Typography } from 'components/Typography';

import { RadioGroupOptionsProps } from './interfaces';

export const RadioGroupOptions = ({ options, className }: RadioGroupOptionsProps) => {
  return (
    <RadioGroup className={cx('radio-group-options', className)}>
      {options.map(({ title, value }) => (
        <RadioGroupItem
          key={title}
          value={value}
        >
          <div className="radio-group-options-indicator-container">
            <RadioGroupIndicator>
              <IconCheckmark />
            </RadioGroupIndicator>
          </div>
          <Typography variant="paragraph-large">{title}</Typography>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
};
