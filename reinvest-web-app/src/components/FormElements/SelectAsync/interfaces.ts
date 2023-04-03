import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ActionMeta, FormatOptionLabelMeta, GroupBase, SingleValue, StylesConfig } from 'react-select';
import { ExtendedSelectOption } from 'reinvest-app-common/src/types/select-option';

export interface Props<FormFields extends FieldValues, Option> extends UseControllerProps<FormFields> {
  loadOptions: LoadOptions<ExtendedSelectOption<Option>>;
  disabled?: boolean;
  formatOptionsLabel?: FormatOptionLabel<ExtendedSelectOption<Option>>;
  formatSelectedOptionLabel?: (option: ExtendedSelectOption<Option>) => ReactNode;
  menuPortalTarget?: HTMLElement | null;
  onOptionSelected?: OptionActionHandler<ExtendedSelectOption<Option>>;
  placeholder?: string;
  required?: boolean;
  willCacheOptions?: boolean;
}

export type ChangeHandler<Option> = (option: SingleValue<ExtendedSelectOption<Option>>, action: ActionMeta<ExtendedSelectOption<Option>>) => void;
export type Styles<Option> = StylesConfig<ExtendedSelectOption<Option>, false, GroupBase<ExtendedSelectOption<Option>>>;

type FormatOptionLabel<Option> = (data: Option, meta: FormatOptionLabelMeta<Option>) => ReactNode;
type OptionActionHandler<Option> = ((option: SingleValue<Option>) => void) | ((option: SingleValue<Option>) => Promise<void>);

type LoadOptions<Option> = (value: string, callback?: LoadOptionsCallback<Option>) => LoadOptionsReturn<Option>;
type LoadOptionsCallback<Option> = (options: Option[]) => void;
type LoadOptionsReturn<Option> = Promise<Option[]>;
