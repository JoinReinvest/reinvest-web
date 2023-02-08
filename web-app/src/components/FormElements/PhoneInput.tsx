import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '+0 (000) 000-0000',
};

export const PhoneInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <InputMasked
    maskOptions={mask}
    name="phone"
    value={value}
    onChange={newValue => onChange(newValue)}
    placeholder="Phone Number"
  />
);
