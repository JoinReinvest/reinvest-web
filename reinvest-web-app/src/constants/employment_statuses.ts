import { SelectionOption } from 'components/FormElements/SelectionCards';

import { lowerCaseWithoutSpacesGenerator } from '../utils/optionValueGenerators';

const STATUSES = ['Employed', 'Unemployed', 'Retired', 'Student'];

export const EMPLOYMENT_STATUSES: SelectionOption[] = STATUSES.map(status => ({ title: status, value: lowerCaseWithoutSpacesGenerator(status) }));
