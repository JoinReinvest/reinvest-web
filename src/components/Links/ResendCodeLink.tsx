import { LinkType } from '@hookooekoo/ui-link';

import { Link } from '../Link';

interface Props {
  href: LinkType['href'];
}

export const ResendCodeLink = ({ href }: Props) => (
  <Link
    href={href}
    title="Resend Code"
  >
    Resend Code
  </Link>
);
