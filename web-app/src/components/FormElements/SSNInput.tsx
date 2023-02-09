import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '000-000-000',
};

export const SSNInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <InputMasked
    maskOptions={mask}
    name="ssn"
    value={value}
    onChange={newValue => onChange(newValue)}
    placeholder="SSN"
  />
);
