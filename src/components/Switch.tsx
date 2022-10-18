import { Root as SwitchRoot, Thumb } from '@radix-ui/react-switch';
import cx from 'classnames';
import { Dispatch, SetStateAction } from 'react';

export interface SwitchProps {
  isChecked: boolean;
  onChange: Dispatch<SetStateAction<boolean>>;
  isDisabled?: boolean;
}

export const Switch = ({ isChecked, onChange, isDisabled = false }: SwitchProps) => (
  <SwitchRoot
    checked={isChecked}
    onCheckedChange={value => onChange(value)}
    disabled={isDisabled}
    className={cx(
      'radix-state-checked:bg-black',
      'radix-state-unchecked:bg-secondary-5',
      'relative inline-flex h-26 w-[4.8rem] flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
    )}
  >
    <Thumb
      className={cx(
        'radix-state-checked:translate-x-full',
        'radix-state-unchecked:translate-x-1',
        'pointer-events-none inline-block h-22 w-22 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out',
      )}
    />
  </SwitchRoot>
);
