import { InputMasked } from './InputMasked'

export const EmailInput = () => <InputMasked
  name="email"
  maskOptions={{ mask: /^\S*@?\S*$/ }}
  placeholder="Email Address"
/>
