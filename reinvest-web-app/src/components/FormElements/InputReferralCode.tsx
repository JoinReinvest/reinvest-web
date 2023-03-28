import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

export function InputReferralCode<FormFields extends FieldValues>(props: CustomInputMaskedProps<FormFields>) {
  return (
    <InputMasked
      maskOptions={{ mask: '***-***' }}
      placeholder="Referral code"
      {...props}
      shouldUnregister
      willUseUnmaskedValue
    />
  );
}
