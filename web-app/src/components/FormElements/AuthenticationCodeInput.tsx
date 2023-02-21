import { InputMasked } from './InputMasked'

export const AuthenticationCodeInput = (params) => <InputMasked
  name="authentication_code"
  maskOptions={{ mask: '000-000' }}
  placeholder="Authentication Code"
  {...params}
/>
