import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: '0000-0000',
};

export const ReferralCodeInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <InputMasked
    maskOptions={mask}
    name="referral_code"
    value={value}
    onChange={newValue => onChange(newValue)}
    placeholder="Referral code"
  />
);
