import { SelectionOption } from 'components/FormElements/SelectionCards';
import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';

export const EMPLOYMENT_STATUSES: SelectionOption[] = [
  {
    title: 'Employed',
    value: EmploymentStatus.Employed,
  },
  {
    title: 'Unemployed',
    value: EmploymentStatus.Unemployed,
  },
  {
    title: 'Retired',
    value: EmploymentStatus.Retired,
  },
  {
    title: 'Student',
    value: EmploymentStatus.Student,
  },
];

export const EMPLOYMENT_STATUSES_VALUES = [EmploymentStatus.Employed, EmploymentStatus.Unemployed, EmploymentStatus.Retired, EmploymentStatus.Student] as const;
