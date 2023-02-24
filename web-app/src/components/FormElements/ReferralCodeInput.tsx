import { InputMasked } from './InputMasked';

export const ReferralCodeInput = props => (
  <InputMasked
    name="referralCode"
    maskOptions={{ mask: '000-000' }}
    placeholder="Referral code"
    {...props}
  />
);
