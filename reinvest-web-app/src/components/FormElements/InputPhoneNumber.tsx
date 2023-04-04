import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputPhoneNumber<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{ mask: '000-000-0000' }}
      willUseUnmaskedValue={false}
      shouldUnregister
      willTriggerChangeOnAccept
      hasFixedPlaceholder={false}
      inputPlaceholder="000-000-0000"
    />
  );
}
