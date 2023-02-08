import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '+0 (000) 000-0000',
};

interface PhoneInputProps {
  onChange: (value: string) => void;
  value: string;
}

export const PhoneInput = ({ value, onChange }: PhoneInputProps) => (
  <InputMasked
    maskOptions={mask}
    name="phone"
    value={value}
    onChange={value => onChange(value)}
    placeholder="Phone Number"
  />
);
