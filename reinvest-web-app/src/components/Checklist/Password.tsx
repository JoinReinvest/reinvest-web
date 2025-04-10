import { useMemo } from 'react';

import { Checklist } from './Checklist';

interface Props {
  password: string;
  passwordConfirmation: string;
  blackColorText?: boolean;
}

export const PasswordChecklist = ({ password = '', passwordConfirmation = '', blackColorText = false }: Props) => {
  const hasLowerCaseLetter = password.toUpperCase() != password;
  const hasUpperCaseLetter = password.toLowerCase() != password;
  const hasNumber = /\d/.test(password);
  const hasMinumumLength = password.length >= 8;
  const passwordsMatch = password.length > 0 && password === passwordConfirmation;

  const checks = useMemo<[string, boolean][]>(
    () => [
      ['A lower case letter', hasLowerCaseLetter],
      ['An upper case letter', hasUpperCaseLetter],
      ['A number', hasNumber],
      ['Minimum 8 characters', hasMinumumLength],
      ['Passwords must match', passwordsMatch],
    ],
    [hasLowerCaseLetter, hasUpperCaseLetter, hasNumber, hasMinumumLength, passwordsMatch],
  );

  return (
    <Checklist
      checks={checks}
      blackColorText={blackColorText}
    />
  );
};
