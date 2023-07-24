import { CustomInputMaskedProps, InputMasked } from 'components/FormElements/InputMasked';
import { FieldValues } from 'react-hook-form';

import { EIN_EXPOSED_MASK, EIN_SECURE_MASK } from '../../constants/ein';

interface Props<FormFields extends FieldValues> extends CustomInputMaskedProps<FormFields> {
  willUseSecureMask?: boolean;
}

export function InputEIN<FormFields extends FieldValues>({ willUseSecureMask = false, ...props }: Props<FormFields>) {
  return (
    <InputMasked
      {...props}
      maskOptions={{ mask: willUseSecureMask ? EIN_SECURE_MASK : EIN_EXPOSED_MASK }}
      placeholder="EIN"
      willUseUnmaskedValue={false}
      willTriggerChangeOnAccept
      inputPlaceholder="00-0000000"
      inputMode="numeric"
    />
  );
}
