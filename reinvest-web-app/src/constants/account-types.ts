import { SelectionOption } from 'components/FormElements/SelectionCards';
import { AccountType } from 'types/graphql';

export const ACCOUNT_TYPES = [
  {
    label: 'For Individuals',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel.',
    value: AccountType.Individual,
  },
  {
    label: 'For Corporations',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel.',
    value: AccountType.Corporate,
  },
  {
    label: 'For Trust',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel.',
    value: AccountType.Trust,
  },
] as const;

export type AccountTypeValue = (typeof ACCOUNT_TYPES)[number]['value'];

export const ACCOUNT_TYPES_VALUES: [AccountTypeValue, ...AccountTypeValue[]] = [ACCOUNT_TYPES[0].value, ...ACCOUNT_TYPES.slice(1).map(({ value }) => value)];

export const ACCOUNT_TYPES_AS_OPTIONS: SelectionOption[] = ACCOUNT_TYPES.map(({ label, description, value }) => ({
  title: label,
  description,
  value,
}));

export const CORPORATION_TYPES = [
  { label: 'Corporation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', value: 'corporation' },
  { label: 'Partnership', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', value: 'partnership' },
  { label: 'LLC', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', value: 'llc' },
] as const;

export type CorporationTypeValue = (typeof CORPORATION_TYPES)[number]['value'];

export const CORPORATION_TYPES_VALUES: [CorporationTypeValue, ...CorporationTypeValue[]] = [
  CORPORATION_TYPES[0].value,
  ...CORPORATION_TYPES.slice(1).map(({ value }) => value),
];

export const CORPORATION_TYPES_AS_OPTIONS: SelectionOption[] = CORPORATION_TYPES.map(({ label, description, value }) => ({
  title: label,
  description,
  value,
}));

export const TRUST_TYPES = [
  {
    label: 'Revocable',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'revocable',
  },
  {
    label: 'Irrevocable',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    value: 'irrevocable',
  },
] as const;

export type TrustTypeValue = (typeof TRUST_TYPES)[number]['value'];

export const TRUST_TYPES_VALUES: [TrustTypeValue, ...TrustTypeValue[]] = [TRUST_TYPES[0].value, ...TRUST_TYPES.slice(1).map(({ value }) => value)];

export const TRUST_TYPES_AS_OPTIONS: SelectionOption[] = TRUST_TYPES.map(({ label, description, value }) => ({
  title: label,
  description,
  value,
}));
