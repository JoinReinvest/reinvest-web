import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputAuthenticationCode<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      {...props}
      placeholder="Authentication Code"
      maskOptions={{ mask: '***-***' }}
      shouldUnregister
    />
  );
}
