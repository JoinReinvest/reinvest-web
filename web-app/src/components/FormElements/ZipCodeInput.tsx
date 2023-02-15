import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '000000',
};

export const ZipCodeInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <InputMasked
    maskOptions={mask}
    name="zip-code"
    value={value}
    onChange={newValue => onChange(newValue)}
    placeholder="Zip Code"
  />
);
