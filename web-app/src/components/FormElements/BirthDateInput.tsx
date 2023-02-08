import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '00/00/0000',
};

export const BirthDateInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <InputMasked
    maskOptions={mask}
    name="birth_date"
    value={value}
    onChange={newValue => onChange(newValue)}
    placeholder="Date of Birth"
  />
);
