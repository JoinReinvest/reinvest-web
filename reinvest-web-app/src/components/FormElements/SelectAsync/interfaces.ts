import { SelectOption } from 'components/Select';
import { ReactNode } from 'react';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { ActionMeta, FormatOptionLabelMeta, GroupBase, SingleValue, StylesConfig } from 'react-select';

export interface Props<FormFields extends FieldValues, Option> extends UseControllerProps<FormFields> {
  loadOptions: LoadOptions<AsyncSelectOption<Option>>;
  disabled?: boolean;
  formatOptionsLabel?: FormatOptionLabel<AsyncSelectOption<Option>>;
  formatSelectedOptionLabel?: (option: AsyncSelectOption<Option>) => ReactNode;
  menuPortalTarget?: HTMLElement | null;
  onOptionCreated?: OptionActionHandler<AsyncSelectOption<Option>>;
  onOptionSelected?: OptionActionHandler<AsyncSelectOption<Option>>;
  placeholder?: string;
  required?: boolean;
  willCacheOptions?: boolean;
}

export type AsyncSelectOption<Fields> = SelectOption & Fields;
export type ChangeHandler<Option> = (option: SingleValue<AsyncSelectOption<Option>>, action: ActionMeta<AsyncSelectOption<Option>>) => void;
export type Styles<Option> = StylesConfig<AsyncSelectOption<Option>, false, GroupBase<AsyncSelectOption<Option>>>;

type FormatOptionLabel<Option> = (data: Option, meta: FormatOptionLabelMeta<Option>) => ReactNode;
type OptionActionHandler<Option> = (option: SingleValue<Option>) => void;

type LoadOptions<Option> = (value: string, callback?: LoadOptionsCallback<Option>) => LoadOptionsReturn<Option>;
type LoadOptionsCallback<Option> = (options: Option[]) => void;
type LoadOptionsReturn<Option> = Promise<Option[]>;
