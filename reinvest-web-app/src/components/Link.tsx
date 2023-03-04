import { Link as PrimitiveLink, LinkProps } from '@hookooekoo/ui-link';
import cx from 'classnames';

export const Link = ({ className, children, ...props }: LinkProps) => (
  <PrimitiveLink
    {...props}
    className={cx('typo-link text-green-frost-01', className)}
  >
    {children}
  </PrimitiveLink>
);
