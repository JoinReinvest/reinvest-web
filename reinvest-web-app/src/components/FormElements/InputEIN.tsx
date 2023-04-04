import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputEIN<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '000-000000' }}
      {...props}
      placeholder="EIN"
      hasFixedPlaceholder={false}
      willUseUnmaskedValue={false}
    />
  );
}
