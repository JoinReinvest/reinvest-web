import cx from 'classnames';
import { InputControl } from 'components/InputControl';
import { ChangeEventHandler, FocusEvent, FocusEventHandler, useRef, useState } from 'react';

export interface TextInputProps {
  name: string;
  value: string;
  disabled?: boolean;
  error?: string;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  placeholder?: string;
  required?: boolean;
  showArrowIcon?: boolean;
  showSearchIcon?: boolean;
}

export const TextInput = ({
  name,
  placeholder,
  required = false,
  onChange,
  onBlur,
  value,
  error,
  disabled = false,
  showSearchIcon = false,
  showArrowIcon = false,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const setFocusHandler = () => setFocused(true);
  const setBlurHandler = (event: FocusEvent<HTMLInputElement>) => {
    setFocused(false);

    if (onBlur) {
      onBlur(event);
    }
  };
  const isDirty = focused || value;

  return (
    <InputControl
      error={error}
      focused={focused}
      inputRef={inputRef}
      placeholder={placeholder}
      value={value}
      disabled={disabled}
      showSearchIcon={showSearchIcon}
      showArrowIcon={showArrowIcon}
    >
      <input
        ref={inputRef}
        className={cx({
          'w-full z-0 placeholder:text-secondary-3 text-black bg-transparent outline-none': true,
          'opacity-0 top-0': !isDirty,
          '!border-red': error,
          '!text-secondary-3': disabled,
        })}
        required={required}
        placeholder={isDirty ? '' : placeholder}
        name={name}
        onFocus={setFocusHandler}
        onChange={onChange}
        disabled={disabled}
        onBlur={setBlurHandler}
        value={value}
      />
    </InputControl>
  );
};
