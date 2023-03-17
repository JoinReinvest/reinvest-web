import { SelectionOption } from 'components/FormElements/SelectionCards';
import { Experience } from 'types/graphql';

const EXPERIENCES = [
  { title: 'No Experience', value: Experience.NoExperience },
  { title: 'Some Experience', value: Experience.SomeExperience },
  { title: 'Very Experienced', value: Experience.VeryExperienced },
  { title: 'Expert', value: Experience.Expert },
];

export const EXPERIENCES_AS_OPTIONS: SelectionOption[] = EXPERIENCES.map(({ title, value }) => ({
  title,
  value,
}));
