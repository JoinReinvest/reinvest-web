import { EMAILS } from 'constants/urls';

import { Link } from '../Link';

interface Props {
  className?: string;
  label?: string;
}

export const GetHelpLink = ({ label = 'Get Help', className = '' }: Props) => (
  <Link
    href={EMAILS.supportHref}
    title={label}
    className={className}
  >
    {label}
  </Link>
);
