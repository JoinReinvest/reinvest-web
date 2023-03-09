import { SelectOption } from 'components/Select';

import { lowerCaseWithoutSpacesGenerator } from '../utils/optionValueGenerators';

export const VISAS = ['F-1', 'H-1B', 'L-1', 'O-1', 'G-4'];

export const VISAS_AS_OPTIONS: SelectOption[] = VISAS.map(visa => ({ label: visa, value: lowerCaseWithoutSpacesGenerator(visa) }));
