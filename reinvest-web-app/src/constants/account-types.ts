import { SelectionOption } from 'components/FormElements/SelectionCards';

export const ACCOUNT_TYPES = [
  {
    label: 'For Individuals',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel.',
    value: 'individual',
  },
  {
    label: 'For Corporations',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel.',
    value: 'corporation',
  },
  {
    label: 'For Trust',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consel.',
    value: 'trust',
  },
] as const;

type AccountTypeValue = (typeof ACCOUNT_TYPES)[number]['value'];

export const ACCOUNT_TYPES_VALUES: [AccountTypeValue, ...AccountTypeValue[]] = [ACCOUNT_TYPES[0].value, ...ACCOUNT_TYPES.slice(1).map(({ value }) => value)];

export const ACCOUNT_TYPES_AS_OPTIONS: SelectionOption[] = ACCOUNT_TYPES.map(({ label, description, value }) => ({
  title: label,
  description,
  value,
}));

export const CORPORATION_TYPES = [
  { label: 'Corporation', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', value: 'corporation' },
  { label: 'Partnership', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', value: 'partnership' },
  { label: 'LLC', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', value: 'llc' }
] as const;

export type CorporationTypeValue = (typeof CORPORATION_TYPES)[number]['value'];

export const CORPORATION_TYPES_VALUES: [CorporationTypeValue, ...CorporationTypeValue[]] = [CORPORATION_TYPES[0].value, ...CORPORATION_TYPES.slice(1).map(({ value }) => value)];

export const CORPORATION_TYPES_AS_OPTIONS: SelectionOption[] = CORPORATION_TYPES.map(({ label, description, value }) => ({
  title: label,
  description,
  value,
}))
