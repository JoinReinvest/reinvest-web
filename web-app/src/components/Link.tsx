import PrimitiveLink, { LinkProps as PrimitiveLinkProps } from 'next/link';

interface LinkProps extends PrimitiveLinkProps {
  title: string;
}

export const Link = ({ href, title }: LinkProps) => (
  <PrimitiveLink
    href={href}
    className="typo-link text-green-frost-01"
  >
    {title}
  </PrimitiveLink>
);
