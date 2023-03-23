import { Select } from 'components/Select';
import { UNIQUE_COUNTRIES_CALLING_CODES } from 'constants/country-codes';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { SelectOptions } from 'reinvest-app-common/src/types/select-option';

const OPTIONS: SelectOptions = UNIQUE_COUNTRIES_CALLING_CODES.map(({ callingCode }: { callingCode: string }) => ({
  label: `+${callingCode}`,
  value: callingCode,
}));

type Props<FormFields extends FieldValues> = UseControllerProps<FormFields>;

export const InputPhoneNumberCountryCode = <FormFields extends FieldValues>(props: Props<FormFields>) => (
  <Select
    {...props}
    options={OPTIONS}
    required
    icon="arrow"
  />
);
