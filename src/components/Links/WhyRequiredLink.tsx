import { LinkType } from '@hookooekoo/ui-link';

import { Link } from '../Link';

interface Props {
  href: LinkType['href'];
  onClick: () => void;
}

export const WhyRequiredLink = ({ href, onClick }: Props) => (
  <div className="mt-20 block">
    <Link
      href={href}
      title="Why required"
      onClick={onClick}
    >
      Required. Why?
    </Link>
  </div>
);
