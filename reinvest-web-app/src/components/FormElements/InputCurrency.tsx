import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputCurrency<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{
        mask: '$num',
        blocks: {
          num: {
            mask: Number,
            min: 1,
            thousandsSeparator: ',',
          },
        },
      }}
      inputMode="numeric"
    />
  );
}
