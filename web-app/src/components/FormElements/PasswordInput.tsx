import { FieldValues, UseControllerProps } from 'react-hook-form';

import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';
import { TextInput } from './TextInput';

interface PasswordProps<FormFields extends FieldValues> extends CustomMaskedInputInterface, UseControllerProps<FormFields> {
  className?: string;
}

export const PasswordInput = <FormFields extends FieldValues>({ onChange, ...controlProps }: PasswordProps<FormFields>) => (
  <TextInput
    placeholder="Password"
    type="password"
    onChange={event => onChange(event.target.value)}
    {...controlProps}
  />
);
