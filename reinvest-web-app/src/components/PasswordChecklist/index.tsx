import { useMemo } from 'react';

import { CheckItem } from './CheckItem';

interface Props {
  password: string;
  passwordConfirmation: string;
}

const generateCheckListItem = (label: string, state: boolean) => <CheckItem isChecked={state}>{label}</CheckItem>;

export const PasswordChecklist = ({ password = '', passwordConfirmation = '' }: Props) => {
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

  return <ul className="flex flex-col gap-8">{checks.map(([label, isChecked]) => generateCheckListItem(label, isChecked))}</ul>;
};
