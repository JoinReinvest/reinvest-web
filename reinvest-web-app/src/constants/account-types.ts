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

type AccountTypeValue = (typeof ACCOUNT_TYPES)[number]['value'];

export const ACCOUNT_TYPES_VALUES: [AccountTypeValue, ...AccountTypeValue[]] = [ACCOUNT_TYPES[0].value, ...ACCOUNT_TYPES.slice(1).map(({ value }) => value)];

export const ACCOUNT_TYPES_AS_OPTIONS: SelectionOption[] = ACCOUNT_TYPES.map(({ label, description, value }) => ({
  title: label,
  description,
  value,
}));
