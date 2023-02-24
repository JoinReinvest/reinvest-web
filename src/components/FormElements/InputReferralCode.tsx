import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputReferralCode<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '0000-0000' }}
      placeholder="Referral code"
      {...props}
    />
  );
}
