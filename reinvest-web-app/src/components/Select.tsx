import { Select as PrimitiveSelect, SelectProps as PrimitivePropsWithoutOptions } from '@hookooekoo/ui-select';
import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconSearch } from 'assets/icons/IconSearch';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

export interface SelectOption {
  label: string;
  value: string;
}

type PrimitiveSelectProps = PrimitivePropsWithoutOptions<SelectOption>;
type PrimitiveProps = Pick<PrimitiveSelectProps, 'placeholder' | 'disabled' | 'required' | 'options'>;

interface Props<FormFields extends FieldValues> extends PrimitiveProps, UseControllerProps<FormFields> {
  icon?: 'arrow' | 'search';
}

export function Select<FormFields extends FieldValues>({
  options,
  disabled = false,
  placeholder,
  required = false,
  icon = 'arrow',
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
      dropdownIcon={generateIcon(icon)}
    />
  );
}

const generateIcon = <FormFields extends FieldValues>(icon: Props<FormFields>['icon']) => {
  const className = 'h-auto w-32 stroke-white';

  return icon === 'arrow' ? <IconArrowDown className={className} /> : <IconSearch className={className} />;
};
