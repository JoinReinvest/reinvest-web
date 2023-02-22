import { InputMasked } from './InputMasked';

export const SSNInput = () => (
  <InputMasked
    name="ssn"
    maskOptions={{ mask: '000-000-000' }}
    placeholder="SSN"
  />
);
