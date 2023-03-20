import { InputControl } from '@hookooekoo/ui-input-control';
import { SelectProps } from '@hookooekoo/ui-select';
import { Classes } from '@hookooekoo/ui-select/dist/enums/classes';
import { resetStyles } from '@hookooekoo/ui-select/dist/style-reset';
import { IconSearch } from 'assets/icons/IconSearch';
import { SelectOption } from 'components/Select';
import { useMemo, useRef, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import { GroupBase, StylesConfig } from 'react-select';
import AsyncCreatableSelect from 'react-select/async-creatable';

interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  loadOptions: (inputValue: string, callback: (options: SelectOption[]) => void) => Promise<SelectOption[]>;
  disabled?: boolean;
  menuPortalTarget?: HTMLElement | null;
  placeholder?: string;
  required?: boolean;
  willCacheOptions?: boolean;
}

type ChangeHandler = SelectProps<SelectOption>['onChange'];

export function SelectAsync<FormFields extends FieldValues>({
  loadOptions,
  placeholder,
  disabled = false,
  required = false,
  willCacheOptions = false,
  menuPortalTarget,
  ...controllerProps
}: Props<FormFields>) {
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

  const onChange: ChangeHandler = option => {
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
        styles={resetStyles() as StylesConfig<SelectOption, false, GroupBase<SelectOption>>}
        menuPosition="absolute"
        menuPlacement="auto"
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        components={{
          DropdownIndicator: DropdownIndicator,
          LoadingIndicator: undefined,
        }}
        openMenuOnFocus
        menuPortalTarget={menuPortalTargetMemoized}
        allowCreateWhileLoading
        formatCreateLabel={value => value}
        createOptionPosition="first"
      />
    </InputControl>
  );
}

const DropdownIndicator = () => <IconSearch className="stroke-gray-02" />;
