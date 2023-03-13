import { DomicileType } from 'types/graphql';

import { RadioGroupOptionItem } from '../components/FormElements/RadioGroupOptions';

export const RESIDENCY_STATUS: RadioGroupOptionItem[] = [
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
