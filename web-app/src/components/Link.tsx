import { Link as PrimitiveLink, LinkType } from '@hookooekoo/ui-link';
import { ReactNode } from 'react'

interface LinkProps extends LinkType {
  children: ReactNode
}
export const Link = (props: LinkProps) => (
  <PrimitiveLink
    {...props}
    className="typo-link text-green-frost-01"
  />
);
