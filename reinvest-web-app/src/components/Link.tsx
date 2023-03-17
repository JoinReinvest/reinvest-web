import cx from 'classnames';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

export interface LinkProps extends NextLinkProps {
  children: ReactNode;
  title: string;
  className?: string;
  openInNewWindow?: boolean;
}

export const Link = ({ className, children, ...props }: LinkProps) => (
  <NextLink
    {...props}
    className={cx({ 'typo-link text-green-frost-01': !className }, className)}
  >
    {children}
  </NextLink>
);
