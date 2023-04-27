import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { SOCIAL_SECURITY_NUMBER_EXPOSED_MASK, SOCIAL_SECURITY_NUMBER_SECURE_MASK } from 'constants/social-security-number';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends CustomInputMaskedProps<FormFields> {
  willUseSecureMask?: boolean;
}

export function InputSocialSecurityNumber<FormFields extends FieldValues>({ willUseSecureMask = false, ...props }: Props<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{ mask: willUseSecureMask ? SOCIAL_SECURITY_NUMBER_SECURE_MASK : SOCIAL_SECURITY_NUMBER_EXPOSED_MASK }}
      placeholder="SSN"
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept
      inputPlaceholder="000-00-0000"
      isOnlyNumeric
    />
  );
}
