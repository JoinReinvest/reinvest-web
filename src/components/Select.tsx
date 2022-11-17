import { Select as PrimitiveSelect, SelectProps as PrimitiveSelectProps } from '@hookooekoo/ui-select';
import { IconArrowDown } from 'assets/icons/IconArrowDown';

export interface SelectOption {
  label: string;
  value: string;
}

type SelectProps = Omit<PrimitiveSelectProps<SelectOption>, 'defaultOpen' | 'onBlur' | 'getSelectedOption'>;

export const Select = ({ name, value, options, disabled = false, error, onChange, placeholder, required = false }: SelectProps) => (
  <PrimitiveSelect
    name={name}
    value={value}
    placeholder={placeholder}
    options={options}
    disabled={disabled}
    error={error}
    required={required}
    onChange={onChange}
    getSelectedOption={(options, value) => options.filter(option => option.value === value)}
    dropdownIcon={<IconArrowDown className="w-32 h-auto stroke-black" />}
  />
);
