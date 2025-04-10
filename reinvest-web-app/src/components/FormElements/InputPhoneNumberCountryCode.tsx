import { Select } from 'components/Select';
import { FieldValues, UseControllerProps } from 'react-hook-form';
import { UNIQUE_COUNTRIES_CALLING_CODES } from 'reinvest-app-common/src/constants/country-codes';
import { SelectOptions } from 'reinvest-app-common/src/types/select-option';

const OPTIONS: SelectOptions = UNIQUE_COUNTRIES_CALLING_CODES.map(({ callingCode }: { callingCode: string }) => ({
  label: `+${callingCode}`,
  value: callingCode,
}));

type Props<FormFields extends FieldValues> = UseControllerProps<FormFields> & {
  forWhiteBackground?: boolean;
};

export const InputPhoneNumberCountryCode = <FormFields extends FieldValues>(props: Props<FormFields>) => (
  <Select
    {...props}
    options={OPTIONS}
    required
    icon="arrow"
    willDisplayErrorMessage={false}
    forWhiteBackground={props.forWhiteBackground}
  />
);
