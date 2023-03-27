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
];

export const RESIDENCY_STATUS_VALUES = [DomicileType.Citizen, DomicileType.GreenCard, DomicileType.Visa] as const;
