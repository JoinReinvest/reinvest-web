import PrimitiveLink from 'next/link';

import { Typography } from './Typography';

interface LinkProps {
  href: string;
  title: string;
}

export const Link = ({ href, title }: LinkProps) => (
  <PrimitiveLink href={href}>
    <Typography
      variant="link"
      className="text-green-frost-01"
    >
      {title}
    </Typography>
  </PrimitiveLink>
);
