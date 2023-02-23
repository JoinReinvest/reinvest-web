import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputPhone<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '+0 (000) 000-0000' }}
      placeholder="Phone Number"
      {...props}
    />
  );
}
