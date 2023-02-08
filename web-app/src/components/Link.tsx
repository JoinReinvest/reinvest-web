import { Link as PrimitiveLink } from '@hookooekoo/ui-link';
import { ComponentProps } from 'react';
import cx from 'classnames';

type Props = ComponentProps<typeof PrimitiveLink>;

export const Link = ({ className, children, ...props }: Props) => (
  <PrimitiveLink
    {...props}
    className={cx('typo-link text-green-frost-01', className)}
  >
    {children}
  </PrimitiveLink>
);
