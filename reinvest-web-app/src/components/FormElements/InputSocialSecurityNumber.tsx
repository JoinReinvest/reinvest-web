import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { SOCIAL_SECURITY_NUMBER_EXPOSED_MASK, SOCIAL_SECURITY_NUMBER_SECURE_MASK } from 'constants/social-security-number';
import { useMemo } from 'react';
import { FieldValues } from 'react-hook-form';

interface Props<FormFields extends FieldValues> extends CustomInputMaskedProps<FormFields> {
  willUseSecureMask?: boolean;
}

export function InputSocialSecurityNumber<FormFields extends FieldValues>({ willUseSecureMask = false, ...props }: Props<FormFields>) {
  const mask = useMemo(() => (willUseSecureMask ? SOCIAL_SECURITY_NUMBER_SECURE_MASK : SOCIAL_SECURITY_NUMBER_EXPOSED_MASK), [willUseSecureMask]);

  return (
    <InputMasked
      {...props}
      maskOptions={{ mask }}
      placeholder="SSN"
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept
      shouldUnregister
      inputPlaceholder="000-00-0000"
      inputMode="numeric"
    />
  );
}
