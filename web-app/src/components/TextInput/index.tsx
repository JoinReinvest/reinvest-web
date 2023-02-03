import { InputText as PrimitiveTextInput } from '@hookooekoo/ui-input-text';
import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconDisabled } from 'assets/icons/IconDisabled';
import { IconSearch } from 'assets/icons/IconSearch';
import cx from 'classnames';

import { TextInputProps } from './interfaces';

export const TextInput = ({
  name,
  placeholder,
  required = false,
  onChange,
  onBlur,
  onFocus,
  value,
  error,
  disabled = false,
  showArrowIcon = false,
  showSearchIcon = false,
  type = 'text',
}: TextInputProps) => {
  const iconLeftClass = cx({
    'absolute w-32 h-32 stroke-01': true,
    'stroke-gray-03': !!disabled,
  });

  const iconRightClass = cx({
    [iconLeftClass]: true,
    'right-0': true,
  });

  return (
    <PrimitiveTextInput
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={error}
      iconLeft={showSearchIcon && <IconSearch className={iconLeftClass} />}
      iconRight={showArrowIcon && !disabled ? <IconArrowDown className={iconRightClass} /> : disabled && <IconDisabled className={iconRightClass} />}
      type={type}
    />
  );
};
