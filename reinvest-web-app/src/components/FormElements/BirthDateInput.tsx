import { InputMasked } from './InputMasked';

export const BirthDateInput = () => (
  <InputMasked
    name="birth_date"
    maskOptions={{ mask: '00/00/0000' }}
    placeholder="Date of Birth"
  />
);
