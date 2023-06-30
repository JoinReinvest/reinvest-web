import { InputHTMLAttributes } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface CommonProps<FormFields extends FieldValues> extends UseControllerProps<FormFields>, PrimitiveProps {}

type PrimitiveProps = Pick<InputHTMLAttributes<HTMLTextAreaElement>, 'disabled' | 'required'>;
