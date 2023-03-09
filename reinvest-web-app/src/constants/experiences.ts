import { SelectionOption } from 'components/FormElements/SelectionCards';

import { lowerCaseWithoutSpacesGenerator } from '../utils/optionValueGenerators';

const EXPERIENCES = ['No Experience', 'Some Experience', 'Very Experienced', 'Expert'];

export const EXPERIENCES_AS_OPTIONS: SelectionOption[] = EXPERIENCES.map(experience => ({
  title: experience,
  value: lowerCaseWithoutSpacesGenerator(experience),
}));
