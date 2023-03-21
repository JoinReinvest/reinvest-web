import { SelectOption } from 'components/Select';

export const INDUSTRIES = [
  {
    label: 'Accommodation and Food Services',
    value: 'accommodation-and-food-services',
  },
  {
    label: 'Agriculture, Forestry, Fishing, and Hunting',
    value: 'agriculture,-forestry,-fishing,-and-hunting',
  },
  {
    label: 'Arts, Entertainment, and Recreation',
    value: 'arts,-entertainment,-and-recreation',
  },
  {
    label: 'Construction',
    value: 'construction',
  },
  {
    label: 'Educational Services',
    value: 'educational-services',
  },
  {
    label: 'Finance and Insurance',
    value: 'finance-and-insurance',
  },
  {
    label: 'Health Care and Social Assistance',
    value: 'health-care-and-social-assistance',
  },
  {
    label: 'Information',
    value: 'information',
  },
  {
    label: 'Management of Companies and Enterprises',
    value: 'management-of-companies-and-enterprises',
  },
  {
    label: 'Manufacturing',
    value: 'manufacturing',
  },
  {
    label: 'Mining, Quarrying, and Oil and Gas Extraction',
    value: 'mining,-quarrying,-and-oil-and-gas-extraction',
  },
  {
    label: 'Other Services (except Public Administration)',
    value: 'other-services-(except-public-administration)',
  },
  {
    label: 'Professional, Scientific, and Technical Services',
    value: 'professional,-scientific,-and-technical-services',
  },
  {
    label: 'Public Administration',
    value: 'public-administration',
  },
  {
    label: 'Real Estate and Rental and Leasing',
    value: 'real-estate-and-rental-and-leasing',
  },
  {
    label: 'Retail Trade',
    value: 'retail-trade',
  },
  {
    label: 'Transportation and Warehousing',
    value: 'transportation-and-warehousing',
  },
  {
    label: 'Utilities',
    value: 'utilities',
  },
  {
    label: 'Wholesale Trade',
    value: 'wholesale-trade',
  },
  {
    label: 'Government',
    value: 'government',
  },
] as const;

export type Industry = (typeof INDUSTRIES)[number]['value'];

export const INDUSTRIES_VALUES: [Industry, ...Industry[]] = [INDUSTRIES[0].value, ...INDUSTRIES.slice(1).map(({ value }) => value)];

export const INDUESTRIES_AS_OPTIONS: SelectOption[] = [...INDUSTRIES];
