import { SelectionOption } from 'components/FormElements/SelectionCards';
import { Experience } from 'reinvest-app-common/src/types/graphql';

export const EXPERIENCES_AS_OPTIONS: SelectionOption[] = [
  { title: 'No Experience', value: Experience.NoExperience },
  { title: 'Some Experience', value: Experience.SomeExperience },
  { title: 'Very Experienced', value: Experience.VeryExperienced },
  { title: 'Expert', value: Experience.Expert },
];
