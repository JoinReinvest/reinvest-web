import { RadioGroupOptionItem } from 'components/FormElements/RadioGroupOptions';
import { SelectOption } from 'reinvest-app-common/src/types/select-option';

export const RESIDENCY_STATUS = [
  {
    value: 'us',
    label: 'US Citizen',
  },
  {
    value: 'green-card',
    label: 'Green Card',
  },
  {
    value: 'visa',
    label: 'Visa',
  },
] as const;

type ResidencyStatusValue = (typeof RESIDENCY_STATUS)[number]['value'];

export const RESIDENCY_STATUS_VALUES: [ResidencyStatusValue, ...ResidencyStatusValue[]] = [
  RESIDENCY_STATUS[0].value,
  ...RESIDENCY_STATUS.slice(1).map(({ value }) => value),
];

export const RESIDENCY_STATUS_AS_SELECT_OPTIONS: SelectOption[] = RESIDENCY_STATUS.map(item => item);

export const RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS: RadioGroupOptionItem[] = RESIDENCY_STATUS.map(({ label, value }) => ({
  title: label,
  value,
}));
