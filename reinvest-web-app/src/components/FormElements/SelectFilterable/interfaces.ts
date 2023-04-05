import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ActionMeta, GroupBase, SingleValue, StylesConfig } from 'react-select';
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

export type ChangeHandler = (option: SingleValue<SelectOption>, action: ActionMeta<SelectOption>) => void;
export type Styles = StylesConfig<SelectOption, false, GroupBase<SelectOption>>;
