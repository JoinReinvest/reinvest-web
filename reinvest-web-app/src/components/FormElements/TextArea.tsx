import { useForwardedRef } from '@hookooekoo/hooks-forwarded-ref';
import { InputControl } from '@hookooekoo/ui-input-control';
import { InputHTMLAttributes, useMemo, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

type PrimitiveProps = Pick<InputHTMLAttributes<HTMLTextAreaElement>, 'disabled' | 'required'>;

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields>, PrimitiveProps {
  maxCharacters: number;
}

const CLASSNAME = 'hkek-text-area';

export function TextArea<FormFields extends FieldValues>({ disabled = false, required = false, maxCharacters = 220, ...controllerProps }: Props<FormFields>) {
  const { field, fieldState } = useController(controllerProps);
  const [focused, setFocused] = useState(false);
  const ref = useForwardedRef(field.ref);
  const numberOfCharacters = useMemo<number>(() => field.value?.length || 0, [field.value]);

  const placeholder = useMemo(() => {
    const numberOfCharactersLeft = maxCharacters - numberOfCharacters;

    return `${numberOfCharactersLeft} Characters`;
  }, [numberOfCharacters, maxCharacters]);

  const isDirty = focused || field.value;
  const onFocusHandler = () => setFocused(true);
  const onBlurHandler = () => {
    setFocused(false);
    field.onBlur && field.onBlur();
  };

  return (
    <InputControl
      className={CLASSNAME}
      error={fieldState.error?.message}
      placeholder={placeholder}
      focused={focused}
      inputRef={ref}
      value={field.value}
      disabled={disabled}
    >
      <textarea
        name={field?.name}
        value={field?.value}
        className={CLASSNAME}
        onChange={field?.onChange}
        onBlur={onBlurHandler}
        onFocus={onFocusHandler}
        placeholder={isDirty ? '' : placeholder}
        ref={ref}
        maxLength={maxCharacters}
        disabled={disabled}
        required={required}
        data-is-dirty={isDirty}
        data-has-error={!!fieldState.error?.message}
      />
    </InputControl>
  );
}
