import { Select, SelectOption } from 'components/Select';
import { UNIQUE_COUNTRIES_CALLING_CODES } from 'constants/country-codes';
import { FieldValues, useController, UseControllerProps } from 'react-hook-form';

const OPTIONS: SelectOption[] = UNIQUE_COUNTRIES_CALLING_CODES.map(({ callingCode }: { callingCode: string }) => ({
  label: `+${callingCode}`,
  value: callingCode,
}));

type Props<FormFields extends FieldValues> = UseControllerProps<FormFields>;

export const InputPhoneNumberCountryCode = <FormFields extends FieldValues>(props: Props<FormFields>) => {
  const { field } = useController(props);

  return (
    <Select
      name={field.name}
      value={field.value}
      options={OPTIONS}
      onChange={option => field.onChange({ target: { value: option?.value } })}
      onBlur={field.onBlur}
      required
      icon="arrow"
    />
  );
};
