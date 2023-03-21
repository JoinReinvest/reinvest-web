import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputZipCode<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '00000[-0000]' }}
      placeholder="Zip Code"
      {...props}
    />
  );
}
