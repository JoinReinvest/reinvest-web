import { InputMasked as PrimitiveInputMasked, InputMaskedProps as PrimitiveInputMaskedProps } from '@hookooekoo/ui-input-masked';
import { FieldValues } from 'react-hook-form';

type PrimitiveProps<FormFields extends FieldValues> = Omit<PrimitiveInputMaskedProps<FormFields>, 'willDisplayErrorMessage'>;
interface Props<FormFields extends FieldValues> extends PrimitiveProps<FormFields> {
  willDisplayErrorMessage?: boolean;
}

export type CustomInputMaskedProps<FormFields extends FieldValues> = Omit<
  Props<FormFields>,
  'maskOptions' | 'willUseUnmaskedValue' | 'willTriggerChangeOnAccept' | 'willTriggerChangeOnCompletion' | 'isOnlyNumeric'
>;

export function InputMasked<FormFields extends FieldValues>({
  name,
  control,
  maskOptions,
  placeholder,
  required = false,
  disabled = false,
  autoComplete = false,
  defaultValue,
  shouldUnregister = false,
  rules,
  willUseUnmaskedValue = true,
  willTriggerChangeOnAccept = true,
  willTriggerChangeOnCompletion = false,
  willDisplayErrorMessage = true,
  inputPlaceholder,
  isOnlyNumeric = false,
}: Props<FormFields>) {
  return (
    <PrimitiveInputMasked
      name={name}
      control={control}
      maskOptions={maskOptions}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      autoComplete={autoComplete}
      defaultValue={defaultValue}
      shouldUnregister={shouldUnregister}
      rules={rules}
      willUseUnmaskedValue={willUseUnmaskedValue}
      willTriggerChangeOnAccept={willTriggerChangeOnAccept}
      willTriggerChangeOnCompletion={willTriggerChangeOnCompletion}
      willDisplayErrorMessage={willDisplayErrorMessage}
      inputPlaceholder={inputPlaceholder}
      isOnlyNumeric={isOnlyNumeric}
    />
  );
}
