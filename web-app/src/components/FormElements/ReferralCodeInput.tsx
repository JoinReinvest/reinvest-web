import { InputMasked } from './InputMasked';

export const ReferralCodeInput = props => (
  <InputMasked
    name="referral_code"
    maskOptions={{ mask: '000-000' }}
    placeholder="Referral code"
    {...props}
  />
);
