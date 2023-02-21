import { InputMasked, InputMaskedProps } from '@hookooekoo/ui-input-masked';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';

const mask: InputMaskedProps['maskOptions'] = {
  mask: /^\S*@?\S*$/,
};

interface Props<FormFields extends FieldValues> extends CustomMaskedInputInterface, UseControllerProps<FormFields> {
  className?: string;
}

export const EmailInput = <FormFields extends FieldValues>({ ...controllerProps }: Props<FormFields>) => {
  const { field, fieldState } = useController(controllerProps);

  return (
    <InputMasked
      maskOptions={mask}
      name={field.name}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      placeholder="Email Address"
      error={fieldState.error?.message}
    />
  );
};
