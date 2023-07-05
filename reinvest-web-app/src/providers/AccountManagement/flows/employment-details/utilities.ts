import { EMPLOYMENT_STATUSES } from 'reinvest-app-common/src/constants/employment_statuses';
import { INDUESTRIES_AS_OPTIONS } from 'reinvest-app-common/src/constants/industries';

import { FlowFields } from './interfaces';

export function getLabelsForDisplay(fields: FlowFields) {
  const status = EMPLOYMENT_STATUSES.find(({ value }) => value === fields.employmentStatus)?.title;
  const industry = INDUESTRIES_AS_OPTIONS.find(({ value }) => value === fields.employmentDetails?.industry)?.label;

  return [status, fields?.employmentDetails?.employerName, fields?.employmentDetails?.occupation, industry].filter(Boolean);
}
