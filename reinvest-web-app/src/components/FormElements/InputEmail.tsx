import { CustomInputProps, Input } from 'components/FormElements/Input';
import { FieldValues } from 'react-hook-form';

export function InputEmail<FormFields extends FieldValues>(props: CustomInputProps<FormFields>) {
  return (
    <Input
      type="email"
      placeholder="Email Address"
      {...props}
    />
  );
}
