import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputPhoneNumber<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '000-000-0000' }}
      {...props}
      shouldUnregister
    />
  );
}
