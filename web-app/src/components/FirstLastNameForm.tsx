import { FirstLastNameFormFields } from 'pages/onboarding/first-last-name';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Link } from './Link';
import { TextInput } from './TextInput';

export const FirstLastNameForm = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const { control } = useFormContext<FirstLastNameFormFields>();

  return (
    <>
      <TextInput
        value={firstName}
        name="firstName"
        placeholder="First name"
        onChange={event => setFirstName(event.target.value)}
        control={control}
      />
      <TextInput
        value={middleName}
        name="middleName"
        placeholder="Middle Name (Optional)"
        onChange={event => setMiddleName(event.target.value)}
        control={control}
      />
      <TextInput
        value={lastName}
        name="lastName"
        placeholder="Last name"
        control={control}
        onChange={event => setLastName(event.target.value)}
      />
    </>
  );
};
