import { RadioGroupItem } from '@hookooekoo/ui-radio-group';

import { Typography } from './Typography';

export interface AccountChoiceProps {
  description: string;
  title: string;
  value: string;
}

export const AccountChoice = ({ value, title, description }: AccountChoiceProps) => (
  <RadioGroupItem
    value={value}
    className="border-gray-03 flex w-full flex-col items-center justify-center gap-4 border py-24"
  >
    <Typography
      variant="paragraph-emphasized"
      className="text-white "
    >
      {title}
    </Typography>
    <Typography
      className="text-gray-03 w-1/2"
      variant="paragraph-small"
    >
      {description}
    </Typography>
  </RadioGroupItem>
);
