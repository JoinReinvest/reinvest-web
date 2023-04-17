import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputEIN<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '00-0000000' }}
      {...props}
      placeholder="EIN"
      willUseUnmaskedValue={false}
    />
  );
}
