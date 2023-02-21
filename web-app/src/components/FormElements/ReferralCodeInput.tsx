import { InputMasked } from './InputMasked'

export const ReferralCodeInput = (props) => <InputMasked
  name="referral_code"
  maskOptions={{ mask: '0000-0000' }}
  placeholder="Referral code"
  {...props}
/>
