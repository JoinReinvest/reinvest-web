import { Item as RadioGroupItem } from '@radix-ui/react-radio-group';
import cx from 'classnames';

import { SelectionOption } from './index';

interface SelectionCardOptionProps {
  option: SelectionOption;
}

export const SelectionCardOption = ({ option }: SelectionCardOptionProps) => (
  <RadioGroupItem value={option.value}>
    <div
      className={cx(
        'peer relative',
        'radix-state-checked:bg-green-frost-solid radix-state-checked:text-black',
        'radix-state-unchecked:text-gray-light radix-state-unchecked:border-gray-light',
      )}
    >
      <h4 className="text-15">{option.title}</h4>
      <p>{option.description}</p>
    </div>
  </RadioGroupItem>
);
