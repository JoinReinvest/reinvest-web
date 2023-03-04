import { Select as PrimitiveSelect, SelectProps as PrimitiveSelectProps } from '@hookooekoo/ui-select';
import { IconArrowDown } from 'assets/icons/IconArrowDown';
import { IconSearch } from 'assets/icons/IconSearch';

export interface SelectOption {
  label: string;
  value: string;
}

type PrimitiveProps = Omit<PrimitiveSelectProps<SelectOption>, 'defaultOpen' | 'getSelectedOption' | 'dropdownIcon' | 'formatOptionLabel'>;

interface Props extends PrimitiveProps {
  icon?: 'arrow' | 'search';
}

export const Select = ({ name, value, options, disabled = false, error, onChange, onBlur, placeholder, required = false, icon = 'arrow' }: Props) => (
  <PrimitiveSelect
    name={name}
    value={value}
    placeholder={placeholder}
    options={options}
    disabled={disabled}
    error={error}
    required={required}
    onChange={onChange}
    onBlur={onBlur}
    getSelectedOption={(options, value) => options.filter(option => option.value === value)}
    dropdownIcon={generateIcon(icon)}
  />
);

const generateIcon = (icon: Props['icon']) => {
  const className = 'h-auto w-32 stroke-white';

  return icon === 'arrow' ? <IconArrowDown className={className} /> : <IconSearch className={className} />;
};
