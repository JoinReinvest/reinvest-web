import { CustomInputProps, Input } from 'components/FormElements/Input';
import { FieldValues } from 'react-hook-form';

export function InputPassword<FormFields extends FieldValues>(props: CustomInputProps<FormFields>) {
  return (
    <Input
      {...props}
      type="password"
      placeholder="Password"
    />
  );
}
