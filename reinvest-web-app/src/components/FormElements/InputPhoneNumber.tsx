import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputPhoneNumber<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{ mask: '000-000-0000' }}
      shouldUnregister
      willTriggerChangeOnAccept
      inputPlaceholder="000-000-0000"
      inputMode="numeric"
    />
  );
}
