import { Link, LinkProps } from 'components/Link';
import { Typography } from 'components/Typography';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  label: string;
  href?: LinkProps['href'];
  onClick?: () => void;
  opensInNewWindow?: boolean;
}

export const AccountMenuActionItem = ({ label, onClick, href, opensInNewWindow, children }: Props) => {
  const className = 'flex pl-8 items-center gap-12 cursor-pointer';

  if (href) {
    return (
      <li className="cursor-pointer">
        <Link
          href={href}
          title={label}
          className={className}
          openInNewWindow={opensInNewWindow}
        >
          {children}

          <Typography variant="button">{label}</Typography>
        </Link>
      </li>
    );
  }

  return (
    <li>
      <div
        className={className}
        role="button"
        onClick={onClick}
        onKeyDown={onClick}
        tabIndex={0}
      >
        {children}

        <Typography variant="button">{label}</Typography>
      </div>
    </li>
  );
};
