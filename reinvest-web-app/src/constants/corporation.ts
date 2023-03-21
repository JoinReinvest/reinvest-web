import { SelectOption } from 'components/Select';

export const CORPORATION_ANNUAL_REVENUES = ['< $XX, XXX', '$XX - XX,XXX', '$XX,XXX - $XM', '$XM - $XMM', '$XMM+'] as const;

export type CorporationAnnualRevenue = (typeof CORPORATION_ANNUAL_REVENUES)[number];

export const CORPORATION_ANNUAL_REVENUE_AS_OPTIONS: SelectOption[] = CORPORATION_ANNUAL_REVENUES.map(value => ({
  label: value,
  value,
}));

export const CORPORATION_NUMBER_OF_EMPLOYEES = ['<XX', 'XX - XXX', 'XXX - XXXX', 'XXXX - XX,XXX', 'XX,XXX +'] as const;

export type CorporationNumberOfEmployees = (typeof CORPORATION_NUMBER_OF_EMPLOYEES)[number];

export const CORPORATION_NUMBER_OF_EMPLOYEES_AS_OPTIONS: SelectOption[] = CORPORATION_NUMBER_OF_EMPLOYEES.map(value => ({
  label: value,
  value,
}));
