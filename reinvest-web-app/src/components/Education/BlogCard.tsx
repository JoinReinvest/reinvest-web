import { Typography } from 'components/Typography';
import Image from 'next/image';
import { LinkProps } from 'next/link';

import { Link } from '../../components/Link';

export interface BlogCardProps {
  href: LinkProps['href'];
  imageSrc: string;
  subtitle: string;
  title: string;
}

export const BlogCard = ({ imageSrc, title, subtitle, href }: BlogCardProps) => (
  <div>
    <Link
      title={title}
      href={href}
    >
      <Image
        src={imageSrc}
        alt="education1"
      />
    </Link>
    <div className="border-gray-04 border-x border-b py-12 px-16">
      <Link
        title={title}
        href={href}
        className="typo-bonus-heading"
      >
        <span>{title}</span>
      </Link>
      <Typography
        variant="paragraph"
        className="text-gray-02"
      >
        {subtitle}
      </Typography>
    </div>
  </div>
);
