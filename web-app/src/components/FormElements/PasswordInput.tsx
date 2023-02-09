import { CustomMaskedInputInterface } from './CustomMaskedInputInterface';
import { TextInput } from './TextInput';

export const PasswordInput = ({ value, onChange }: CustomMaskedInputInterface) => (
  <TextInput
    value={value}
    name="password"
    placeholder="Password"
    type="password"
    onChange={event => onChange(event.target.value)}
  />
);
