import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputSocialSecurityNumber<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{
        mask: '000-00-0000',
        lazy: false,
        placeholderChar: '0',
        eager: true,
      }}
      placeholder="SSN"
      shouldUnregister
      willUseUnmaskedValue={false}
      willTriggerChangeOnCompletion
      hasFixedPlaceholder
    />
  );
}
