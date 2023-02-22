import { InputMasked } from './InputMasked';

export const PhoneInput = () => (
  <InputMasked
    name="phone"
    maskOptions={{ mask: '+0 (000) 000-0000' }}
    placeholder="Phone Number"
  />
);
