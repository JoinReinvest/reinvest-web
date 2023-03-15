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
