import { InputMasked } from './InputMasked'

export const AuthenticationCodeInput = () => <InputMasked
  name="authentication_code"
  maskOptions={{ mask: '000-000' }}
  placeholder="Authentication Code"
/>
