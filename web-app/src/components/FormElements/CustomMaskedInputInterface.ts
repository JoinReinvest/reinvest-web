import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface CustomMaskedInputInterface {
  onChange: (value: string) => void;
  value: string;
}

export interface PasswordProps<FormFields extends FieldValues> extends CustomMaskedInputInterface, UseControllerProps<FormFields> {
  className?: string;
}
