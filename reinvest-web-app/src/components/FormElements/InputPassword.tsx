import { InputText as PrimitiveTextInput } from '@hookooekoo/ui-input-text';
import { IconEye } from 'assets/icons/IconEye';
import { IconEyeHide } from 'assets/icons/IconEyeHide';
import cx from 'classnames';
import { ComponentPropsWithoutRef, useState } from 'react';
import { useController } from 'react-hook-form';
import { FieldValues, UseControllerProps } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {}

type PrimitiveProps = Pick<PrimitiveTextInputProps, 'required' | 'disabled' | 'placeholder'>;
type PrimitiveTextInputProps = ComponentPropsWithoutRef<typeof PrimitiveTextInput>;

export function InputPassword<FormFields extends FieldValues>({
  required = false,
  disabled = false,
  placeholder = 'Password',
  ...controllerProps
}: Props<FormFields>) {
  const { field, fieldState } = useController(controllerProps);
  const [fieldType, setFieldType] = useState<'text' | 'password'>('password');

  const onIconEyeClick = () => {
    setFieldType(fieldType === 'text' ? 'password' : 'text');
  };

  return (
    <PrimitiveTextInput
      name={field.name}
      value={field.value}
      type={fieldType}
      required={required}
      disabled={disabled}
      placeholder={placeholder}
      onChange={field.onChange}
      onBlur={field.onBlur}
      iconRight={generateIcon(fieldType, onIconEyeClick, disabled)}
      error={fieldState.error?.message}
      ref={field.ref}
      autoCapitalize={false}
      autoComplete={false}
    />
  );
}

const generateIcon = (fieldType: 'text' | 'password', onClick: () => void, isFieldDisabled: boolean) => {
  const className = cx('absolute w-32 h-32 stroke-01 right-0', {
    'stroke-gray-03': isFieldDisabled,
  });

  if (fieldType === 'text') {
    return (
      <IconEyeHide
        className={className}
        onClick={onClick}
      />
    );
  }

  return (
    <IconEye
      className={className}
      onClick={onClick}
    />
  );
};
