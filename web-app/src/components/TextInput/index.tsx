import { InputText as PrimitiveTextInput } from '@hookooekoo/ui-input-text';
import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconDisabled } from 'assets/icons/IconDisabled';
import { IconSearch } from 'assets/icons/IconSearch';
import cx from 'classnames';
import { useMemo } from 'react';
import { FieldValues, useController } from 'react-hook-form';

import { TextInputProps } from './interfaces';

export const TextInput = <FormValues extends FieldValues>(props: TextInputProps<FormValues>) => {
  const { field, fieldState } = useController<FormValues>(props);
  const { name, placeholder, required = false, onBlur, onFocus, disabled = false, showArrowIcon = false, showSearchIcon = false, type = 'text' } = props;
  const fieldValue = useMemo(() => field.value, [field]);

  const onChange: TextInputProps<FieldValues>['onChange'] = event => {
    if (props.type === 'number') {
      return field.onChange(event.target.valueAsNumber);
    }

    return field.onChange(event.target.value);
  };

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
      {...field}
      name={name}
      value={fieldValue}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      error={fieldState.error?.message}
      iconLeft={showSearchIcon && <IconSearch className={iconLeftClass} />}
      iconRight={showArrowIcon && !disabled ? <IconArrowDown className={iconRightClass} /> : disabled && <IconDisabled className={iconRightClass} />}
      type={type}
    />
  );
};
