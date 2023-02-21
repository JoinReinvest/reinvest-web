import { InputMasked } from './InputMasked'

export const ZipCodeInput = () => <InputMasked
  name="zip_code"
  maskOptions={{ mask: '000000' }}
  placeholder="ZIP Code"
/>

