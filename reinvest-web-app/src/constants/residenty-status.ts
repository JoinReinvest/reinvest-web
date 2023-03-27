import { RadioGroupOptionItem } from 'components/FormElements/RadioGroupOptions';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { SelectOption } from 'reinvest-app-common/src/types/select-option';

export const RESIDENCY_STATUS_VALUES = [DomicileType.Citizen, DomicileType.GreenCard, DomicileType.Visa] as const;

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
];

export const RESIDENCY_STATUS_AS_SELECT_OPTIONS: SelectOption[] = RESIDENCY_STATUS.map(({ title, value }) => ({
  label: title,
  value,
}));

export const RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS: RadioGroupOptionItem[] = RESIDENCY_STATUS.map(({ title, value }) => ({
  title,
  value,
}));
