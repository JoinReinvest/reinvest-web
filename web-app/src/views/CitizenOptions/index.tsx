import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import { Typography } from 'components/Typography';

import { CitizenOptionsProps } from './interfaces';

export const CitizenOptions = ({ options }: CitizenOptionsProps) => {
  return (
    <RadioGroup className="citizen-options">
      {options.map(({ title, value }) => (
        <RadioGroupItem
          key={title}
          value={value}
        >
          <div className="citizen-options-indicator-container">
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
