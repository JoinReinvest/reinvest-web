import { useMemo } from 'react';

import { CheckItem } from './CheckItem';

interface Props {
  password: string;
  passwordConfirmation: string;
}

export const PasswordChecklist = ({ password = '', passwordConfirmation = '' }: Props) => {
  const hasLowerCaseLetter = useMemo(() => password.toUpperCase() != password, [password]);
  const hasUpperCaseLetter = useMemo(() => password.toLowerCase() != password, [password]);
  const hasNumber = useMemo(() => /\d/.test(password), [password]);
  const hasMinumumLength = useMemo(() => password?.length >= 8, [password]);

  const passwordsMatch = useMemo(() => {
    const passwordsHaveLength = !!password.length;
    const passwordsMatch = password === passwordConfirmation;

    return passwordsHaveLength && passwordsMatch;
  }, [password, passwordConfirmation]);

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

  return <ul className="flex flex-col gap-4">{checks.map(([label, isChecked]) => generateCheckListItem(label, isChecked))}</ul>;
};

const generateCheckListItem = (label: string, state: boolean) => <CheckItem isChecked={state}>{label}</CheckItem>;
