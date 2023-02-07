import { Link as PrimitiveLink } from '@hookooekoo/ui-link';
import { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof PrimitiveLink>, 'className'>;

export const Link = (props: Props) => (
  <PrimitiveLink
    {...props}
    className="typo-link text-green-frost-01"
  />
);
