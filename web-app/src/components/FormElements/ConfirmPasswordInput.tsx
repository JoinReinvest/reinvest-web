import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';
import { TextInput } from './TextInput';

export const ConfirmPasswordInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <TextInput
    value={value}
    name="confirm_password"
    placeholder="Confirm Password"
    type="password"
    onChange={event => onChange(event.target.value)}
  />
);
