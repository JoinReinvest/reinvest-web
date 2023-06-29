import { Select as PrimitiveSelect, SelectProps as PrimitivePropsWithoutOptions } from '@hookooekoo/ui-select';
import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconSearch } from 'assets/icons/IconSearch';
import cx from 'classnames';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { SelectOption } from 'reinvest-app-common/src/types/select-option';

type PrimitiveSelectProps = PrimitivePropsWithoutOptions<SelectOption>;
type PrimitiveProps = Pick<PrimitiveSelectProps, 'placeholder' | 'disabled' | 'required' | 'options'>;

interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {
  forWhiteBackground?: boolean;
  icon?: 'arrow' | 'search';
  willDisplayErrorMessage?: boolean;
}

export function Select<FormFields extends FieldValues>({
  options,
  disabled = false,
  placeholder,
  required = false,
  icon = 'arrow',
  willDisplayErrorMessage = true,
  forWhiteBackground = false,
  ...controllerProps
}: Props<FormFields>) {
  const { field, fieldState } = useController(controllerProps);

  const onChange: PrimitiveSelectProps['onChange'] = option => {
    field.onChange({ target: { value: option?.value } });
  };

  return (
    <PrimitiveSelect
      name={field.name}
      value={field.value}
      placeholder={placeholder}
      options={options}
      disabled={disabled}
      error={fieldState.error?.message}
      required={required}
      onChange={onChange}
      onBlur={field.onBlur}
      getSelectedOption={(options, value) => options.filter(option => option.value === value)}
      dropdownIcon={generateIcon(icon, forWhiteBackground)}
      willDisplayErrorMessage={willDisplayErrorMessage}
    />
  );
}

export const generateIcon = <FormFields extends FieldValues>(icon: Props<FormFields>['icon'], forWhiteBackground = false) => {
  const className = cx('h-auto w-32', { 'stroke-white': !forWhiteBackground, 'stroke-black-01': forWhiteBackground });

  return icon === 'arrow' ? <IconArrowDown className={className} /> : <IconSearch className={className} />;
};
