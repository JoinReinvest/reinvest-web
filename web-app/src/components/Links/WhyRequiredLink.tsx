import { LinkType } from '@hookooekoo/ui-link';

import { Link } from '../Link';

interface Props {
  href: LinkType['href'];
}

export const WhyRequiredLink = ({ href }: Props) => (
  <div className="mt-20 block">
    <Link
      href={href}
      title="why required link"
    >
      Required. Why?
    </Link>
  </div>
);
