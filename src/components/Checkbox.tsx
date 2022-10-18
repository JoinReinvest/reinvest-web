import { Switch as HeadlessSwitch } from '@headlessui/react';
import { IconCheckmark } from 'assets/icons/IconCheckmark';
import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';

export interface CheckboxProps {
  isChecked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  isDisabled?: boolean;
}

export const Checkbox = ({ isChecked = false, onChange, isDisabled = false }: CheckboxProps) => {
  const containerStyles = cx({
    'h-24 w-24 p-2 flex items-center rounded-full': true,
    'bg-secondary-5': isChecked,
    'border border-secondary-5': !isChecked,
  });

  const iconStyles = cx({
    'max-w-full max-h-full': true,
    hidden: !isChecked,
  });

  return (
    <HeadlessSwitch
      disabled={isDisabled}
      checked={isChecked}
      onChange={onChange}
      className={containerStyles}
    >
      <IconCheckmark className={iconStyles} />
    </HeadlessSwitch>
  );
};
