import { DomicileType } from 'reinvest-app-common/src/types/graphql';

export const RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS = [
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

type ResidencyStatusValue = (typeof RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS)[number]['value'];

export const RESIDENCY_STATUS_VALUES: [ResidencyStatusValue, ...ResidencyStatusValue[]] = [
  RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS[0].value,
  ...RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS.slice(1).map(({ value }) => value),
];
