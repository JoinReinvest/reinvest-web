import { DomicileType } from 'types/graphql';

import { RadioGroupOptionItem } from '../components/FormElements/RadioGroupOptions';

export const RESIDENCY_STATUS = [
  {
    value: DomicileType.Citizen,
    title: 'US Citizen',
  },
  {
    value: DomicileType.GreenCard,
    title: 'Green Card',
  },
  {
    value: DomicileType.Visa,
    title: 'Visa',
  },
] as const;

type ResidencyStatusValue = (typeof RESIDENCY_STATUS)[number]['value'];

export const RESIDENCY_STATUS_VALUES: [ResidencyStatusValue, ...ResidencyStatusValue[]] = [
  RESIDENCY_STATUS[0].value,
  ...RESIDENCY_STATUS.slice(1).map(({ value }) => value),
];

export const RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS: RadioGroupOptionItem[] = RESIDENCY_STATUS.map(({ label, value }) => ({
  title: label,
  value,
}));
