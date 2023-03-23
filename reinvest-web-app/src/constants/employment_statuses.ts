import { SelectionOption } from 'components/FormElements/SelectionCards';
import { EmploymentStatus } from 'types/graphql';

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
