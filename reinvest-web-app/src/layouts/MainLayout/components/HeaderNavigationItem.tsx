import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Typography } from 'components/Typography';
import Link, { LinkProps } from 'next/link';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  href: LinkProps['href'];
}

export const HeaderNavigationItem = ({ href, children }: Props) => (
  <Link href={href}>
    <>
      <Typography
        variant="paragraph"
        className="max-lg:hidden"
      >
        {children}
      </Typography>

      <div className="max-lg:flex max-lg:items-center max-lg:justify-between max-lg:py-12 max-lg:px-34 lg:hidden">
        <Typography variant="h5">{children}</Typography>

        <IconArrowRight className="stroke-black h-32 w-32" />
      </div>
    </>
  </Link>
);
