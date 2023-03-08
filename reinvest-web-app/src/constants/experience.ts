import { SelectionOption } from 'components/FormElements/SelectionCards';

const EXPERIENCES = ['No Experience', 'Some Experience', 'Very Experienced', 'Expert'];

export const EXPERIENCES_AS_OPTIONS: SelectionOption[] = EXPERIENCES.map(experience => {
  const value = experience.toLowerCase().replace(' ', '-');

  return { title: experience, value };
});
