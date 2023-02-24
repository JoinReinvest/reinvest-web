import { InputMasked } from './InputMasked';

export const AuthenticationCodeInput = params => (
  <InputMasked
    name="authenticationCode"
    maskOptions={{ mask: '000-000' }}
    placeholder="Authentication Code"
    {...params}
  />
);
