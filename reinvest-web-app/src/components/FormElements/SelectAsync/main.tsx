import { InputControl } from '@hookooekoo/ui-input-control';
import { Classes } from '@hookooekoo/ui-select/dist/enums/classes';
import { resetStyles } from '@hookooekoo/ui-select/dist/style-reset';
import { IconSearch } from 'assets/icons/IconSearch';
import { useMemo, useRef, useState } from 'react';
import { FieldValues, useController } from 'react-hook-form';
import AsyncCreatableSelect from 'react-select/async-creatable';

import { ChangeHandler, Props, Styles } from './interfaces';
import { SingleValue } from './SingleValue';

export function SelectAsync<FormFields extends FieldValues, Option>({
  loadOptions,
  placeholder,
  disabled = false,
  required = false,
  willCacheOptions = false,
  menuPortalTarget,
  formatOptionsLabel,
  formatSelectedOptionLabel,
  onOptionCreated,
  onOptionSelected,
  ...controllerProps
}: Props<FormFields, Option>) {
  const { field, fieldState } = useController(controllerProps);
  const menuPortalTargetMemoized = useMemo(() => menuPortalTarget, [menuPortalTarget]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const setFocusHandler = () => setFocused(true);
  const errorMessage = fieldState.error?.message;

  const onBlurHandler = () => {
    setFocused(false);
    field.onBlur();
  };

  const onChange: ChangeHandler<Option> = (option, { action }) => {
    if (action === 'select-option') {
      onOptionSelected && onOptionSelected(option);
    }

    if (action === 'create-option') {
      field.onChange(option?.value);
      onOptionCreated && onOptionCreated(option);
    }

    const value = option?.value;
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
      <AsyncCreatableSelect
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
        required={required}
        data-is-dirty={!!isDirty}
        data-has-error={!!errorMessage}
        classNamePrefix={Classes.SELECT}
        styles={resetStyles() as Styles<Option>}
        menuPosition="absolute"
        menuPlacement="auto"
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        components={{
          DropdownIndicator: DropdownIndicator,
          LoadingIndicator: undefined,
          SingleValue,
        }}
        openMenuOnFocus
        menuPortalTarget={menuPortalTargetMemoized}
        allowCreateWhileLoading={false}
        formatCreateLabel={value => value}
        createOptionPosition="first"
        formatOptionLabel={formatOptionsLabel}
        formatSelectedOptionLabel={formatSelectedOptionLabel}
      />
    </InputControl>
  );
}

const DropdownIndicator = () => <IconSearch className="stroke-gray-02" />;
