import { InputText as PrimitiveTextInput } from '@hookooekoo/ui-input-text';
import { ComponentPropsWithoutRef } from 'react';
import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconDisabled } from 'assets/icons/IconDisabled';
import { IconSearch } from 'assets/icons/IconSearch';
import cx from 'classnames';
import { useController } from 'react-hook-form';
import { FieldValues, UseControllerProps } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {
  className?: string;
  showArrowIcon?: boolean;
  showSearchIcon?: boolean;
}

type PrimitiveProps = Pick<PrimitiveTextInputProps, 'autoCapitalize' | 'type' | 'required' | 'disabled' | 'placeholder' | 'autoComplete'>;

type PrimitiveTextInputProps = ComponentPropsWithoutRef<typeof PrimitiveTextInput>;

export function Input<FormFields extends FieldValues>({
  type = 'text',
  required = false,
  disabled = false,
  placeholder,
  showArrowIcon = false,
  showSearchIcon = false,
  autoCapitalize = false,
  autoComplete = false,
  className,
  ...controllerProps
}: Props<FormFields>) {
  const { field, fieldState } = useController(controllerProps);

  const iconLeftClass = cx({
    'absolute w-32 h-32 stroke-01': true,
    'stroke-gray-03': disabled,
  });

  const iconRightClass = cx({
    [iconLeftClass]: true,
    'right-0': true,
  });

  return (
    <PrimitiveTextInput
      name={field.name}
      value={field.value}
      type={type}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      onChange={field.onChange}
      onBlur={field.onBlur}
      autoCapitalize={autoCapitalize}
      autoComplete={autoComplete}
      iconLeft={showSearchIcon && <IconSearch className={iconLeftClass} />}
      iconRight={showArrowIcon && !disabled ? <IconArrowDown className={iconRightClass} /> : disabled && <IconDisabled className={iconRightClass} />}
      error={fieldState.error?.message}
      ref={field.ref}
    />
  );
}
