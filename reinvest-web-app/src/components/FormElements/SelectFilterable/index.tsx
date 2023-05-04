import { InputControl } from '@hookooekoo/ui-input-control';
import { DropdownIndicator } from '@hookooekoo/ui-select/dist/components/DropdownIndicator';
import { Classes } from '@hookooekoo/ui-select/dist/enums/classes';
import { resetStyles } from '@hookooekoo/ui-select/dist/style-reset';
import { generateIcon } from 'components/Select';
import { useMemo, useRef, useState } from 'react';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';
import PrimitiveSelect, { ActionMeta, createFilter, GroupBase, SingleValue, StylesConfig } from 'react-select';
import { SelectOption, SelectOptions } from 'reinvest-app-common/src/types/select-option';

export interface Props<FormFields extends FieldValues> extends UseControllerProps<FormFields> {
  options: SelectOptions;
  disabled?: boolean;
  ignoreFilterAccents?: boolean;
  ignoreFilterCase?: boolean;
  matchFilterFrom?: 'any' | 'start';
  menuPortalTarget?: HTMLElement | null;
  placeholder?: string;
  required?: boolean;
  trimFilter?: boolean;
}

type ChangeHandler = (option: SingleValue<SelectOption>, action: ActionMeta<SelectOption>) => void;
type Styles = StylesConfig<SelectOption, false, GroupBase<SelectOption>>;

export function SelectFilterable<FormFields extends FieldValues>({
  options,
  placeholder,
  disabled = false,
  required = false,
  menuPortalTarget,
  ignoreFilterAccents = true,
  ignoreFilterCase = true,
  trimFilter = true,
  matchFilterFrom = 'any',
  ...controllerProps
}: Props<FormFields>) {
  const { field, fieldState } = useController(controllerProps);
  const menuPortalTargetMemoized = useMemo(() => menuPortalTarget, [menuPortalTarget]);
  const selectedOption = useMemo(() => options.filter(option => option.value === field.value), [field.value, options]);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);
  const controlRef = useRef<HTMLDivElement>(null);

  const setFocusHandler = () => setFocused(true);
  const errorMessage = fieldState.error?.message;

  const onBlurHandler = () => {
    setFocused(false);
    field.onBlur();
  };

  const onChange: ChangeHandler = (option, { action }) => {
    if (action === 'select-option') {
      const value = option?.value;
      field.onChange({ target: { value } });
    }
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
        value={selectedOption}
        ref={inputRef}
        options={options}
        className="text-black relative m-0 w-full bg-transparent p-0 outline-none"
        name={field.name}
        isSearchable
        filterOption={createFilter({
          ignoreAccents: ignoreFilterAccents,
          ignoreCase: ignoreFilterCase,
          trim: trimFilter,
          matchFrom: matchFilterFrom,
        })}
        placeholder=""
        isDisabled={disabled}
        onFocus={setFocusHandler}
        onChange={onChange}
        onBlur={onBlurHandler}
        required={required}
        data-is-dirty={!!isDirty}
        data-has-error={!!errorMessage}
        classNamePrefix={Classes.SELECT}
        styles={resetStyles() as Styles}
        menuPosition="absolute"
        menuPlacement="auto"
        menuShouldScrollIntoView={menuShouldScrollIntoView}
        components={{
          DropdownIndicator: DropdownIndicator,
        }}
        dropdownIcon={generateIcon('arrow')}
        openMenuOnFocus
        menuPortalTarget={menuPortalTargetMemoized}
      />
    </InputControl>
  );
}
