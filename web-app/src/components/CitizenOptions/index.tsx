import { RadioGroup, RadioGroupIndicator, RadioGroupItem } from '@hookooekoo/ui-radio-group';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import { Typography } from 'components/Typography';

import { CitizenOptionsProps } from './interfaces';

export const CitizenOptions = ({ options }: CitizenOptionsProps) => {
  return (
    <RadioGroup className="citizen-options">
      {options.map(({ title, value }, index) => (
        <RadioGroupItem
          key={`${title}-${index}`}
          value={value}
          className="flex items-center gap-20"
        >
          <div className="citizen-options-indicator-container flex h-36 w-36 rounded-full">
            <RadioGroupIndicator className="flex items-center justify-center">
              <IconCheckmark />
            </RadioGroupIndicator>
          </div>
          <Typography variant="paragraph-large">{title}</Typography>
        </RadioGroupItem>
      ))}
    </RadioGroup>
  );
};
