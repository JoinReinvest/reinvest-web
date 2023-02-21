import { FieldValues } from 'react-hook-form';

import { PasswordProps } from './CustomMaskedInputInterface';
import { TextInput } from './TextInput';

export const ConfirmPasswordInput = <FormFields extends FieldValues>({ onChange, ...controlProps }: PasswordProps<FormFields>) => (
  <TextInput
    placeholder="Confirm Password"
    type="password"
    onChange={event => onChange(event.target.value)}
    {...controlProps}
  />
);
