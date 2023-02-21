import { InputMasked } from './InputMasked'

export const EmailInput = (props) => <InputMasked
  name="email"
  maskOptions={{ mask: /^\S*@?\S*$/ }}
  placeholder="Email Address"
  {...props}
/>
