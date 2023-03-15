import { URL } from 'constants/urls';

import { Link } from '../Link';

interface Props {
  label?: string;
}

export const LoginLink = ({ label = 'Go to sign in' }: Props) => (
  <Link
    href={URL.login}
    title={label}
  >
    {label}
  </Link>
);
