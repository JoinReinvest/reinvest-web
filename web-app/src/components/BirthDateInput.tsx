import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '00/00/0000',
};

interface BirthDateInputProps {
  date: string;
  onChange: (value: string) => void;
}

export const BirthDateInput = ({ date, onChange }: BirthDateInputProps) => (
  <InputMasked
    maskOptions={mask}
    name="birth_date"
    value={date}
    onChange={value => onChange(value)}
    placeholder="Date of Birth"
  />
);
