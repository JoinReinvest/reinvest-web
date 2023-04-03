import { InputControl } from '@hookooekoo/ui-input-control';
import { Classes } from '@hookooekoo/ui-select/dist/enums/classes';
import { resetStyles } from '@hookooekoo/ui-select/dist/style-reset';
import { IconSearch } from 'assets/icons/IconSearch';
import { useMemo, useRef, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import PrimitiveSelect from 'react-select/async';

import { Input } from './Input';
import { ChangeHandler, Props, Styles } from './interfaces';

export function SelectAsync<FormFields extends FieldValues, Option>({
  loadOptions,
  placeholder,
  disabled = false,
  required = false,
  willCacheOptions = false,
  menuPortalTarget,
  formatOptionsLabel,
  formatSelectedOptionLabel,
  onOptionSelected,
  ...controllerProps
}: Props<FormFields, Option>) {
  const { field, fieldState } = useController(controllerProps);
  const menuPortalTargetMemoized = useMemo(() => menuPortalTarget, [menuPortalTarget]);
  const [focused, setFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const setFocusHandler = () => setFocused(true);
  const errorMessage = fieldState.error?.message;

  const onBlurHandler = () => {
    setFocused(false);
    field.onBlur();
  };

  const onChange: ChangeHandler<Option> = (option, { action }) => {
    const value = option?.value;

    if (action === 'select-option') {
      onOptionSelected && onOptionSelected(option);
      setInputValue(value || '');
    }

    field.onChange({ target: { value } });
  };

  const isDirty = focused || field.value;
  const menuShouldScrollIntoView = !!menuPortalTargetMemoized;

  return (
    <InputControl
      className={Classes.SELECT}
      error={errorMessage}
      focused={focused}
      inputRef={inputRef}
      placeholder={placeholder}
      value={field.value}
      disabled={disabled}
      ref={controlRef}
    >
      <PrimitiveSelect
        defaultInputValue={field.value}
        loadOptions={loadOptions}
        cacheOptions={willCacheOptions}
        defaultOptions={false}
        ref={inputRef}
        className="text-black relative m-0 w-full bg-transparent p-0 outline-none"
        name={field.name}
        placeholder=""
        isDisabled={disabled}
        onFocus={setFocusHandler}
        onChange={onChange}
        onBlur={onBlurHandler}
        onInputChange={setInputValue}
        required={required}
        inputValue={inputValue}
        data-is-dirty={!!isDirty}
        data-has-error={!!errorMessage}
        classNamePrefix={Classes.SELECT}
        styles={resetStyles() as Styles<Option>}
        menuPosition="absolute"
        menuPlacement="auto"
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        components={{
          Input,
          DropdownIndicator: DropdownIndicator,
          LoadingIndicator: undefined,
        }}
        openMenuOnFocus
        menuPortalTarget={menuPortalTargetMemoized}
        formatOptionLabel={formatOptionsLabel}
        formatSelectedOptionLabel={formatSelectedOptionLabel}
        controlShouldRenderValue={false}
      />
    </InputControl>
  );
}

const DropdownIndicator = () => <IconSearch className="stroke-gray-02" />;
