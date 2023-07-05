import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { RESIDENCY_STATUS_OPTIONS } from 'reinvest-app-common/src/constants/residenty-status';

import { FlowFields } from './interfaces';

export function getLabelsForDisplay(fields: FlowFields) {
  const type = RESIDENCY_STATUS_OPTIONS.find(({ value }) => value === fields.type)?.label;
  const countries = COUNTRIES.filter(({ value }) => [fields.birthCountry, fields.citizenshipCountry].includes(value)).map(({ label }) => label);
  const visaType = fields.visaType;

  return [type, ...countries, visaType].filter(Boolean);
}
