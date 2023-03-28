import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputSocialSecurityNumber<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{ mask: '000-00-0000' }}
      placeholder="SSN"
      shouldUnregister
    />
  );
}
