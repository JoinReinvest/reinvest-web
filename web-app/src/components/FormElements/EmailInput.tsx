import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: /^\S*@?\S*$/,
};

export const EmailInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <InputMasked
    maskOptions={mask}
    name="email"
    value={value}
    onChange={newValue => onChange(newValue)}
    placeholder="Email Address"
  />
);
