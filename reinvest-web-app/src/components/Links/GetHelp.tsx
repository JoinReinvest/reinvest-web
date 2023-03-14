import { EMAILS } from 'constants/urls';

import { Link } from '../Link';

interface Props {
  label?: string;
}

export const GetHelpLink = ({ label = 'Get Help' }: Props) => (
  <Link
    href={EMAILS.supportHref}
    title={label}
  >
    {label}
  </Link>
);
