import { Indicator, Root as CheckboxRoot } from '@radix-ui/react-checkbox';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';

export interface CheckboxProps {
  isChecked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  isDisabled?: boolean;
}

export const Checkbox = ({ isChecked = false, onChange, isDisabled = false }: CheckboxProps) => {
  const containerStyles = cx(
    'h-24 w-24 p-2 flex items-center rounded-full',
    'radix-state-checked:bg-secondary-5',
    'radix-state-unchecked:border radix-state-unchecked:border-secondary-5',
  );

  return (
    <CheckboxRoot
      disabled={isDisabled}
      checked={isChecked}
      onCheckedChange={value => onChange(!!value)}
      className={containerStyles}
    >
      <Indicator>
        <IconCheckmark className="max-w-full max-h-full" />
      </Indicator>
    </CheckboxRoot>
  );
};
