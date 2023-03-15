import cx from 'classnames';
import { ReactNode } from 'react';

import { Typography } from './Typography';

interface Props {
  title: string;
  className?: string;
  isTitleCenteredOnMobile?: boolean;
  subtitle?: ReactNode;
}

export const Title = ({ title, subtitle, className = '', isTitleCenteredOnMobile = false }: Props) => {
  const hasSubtitle = !!subtitle;

  const containerClassName = cx(
    {
      'w-full flex flex-col gap-8 lg:gap-36 items-start': hasSubtitle,
      'pb-36': !subtitle,
    },
    className,
  );

  const titleClassname = cx({
    'text-center': isTitleCenteredOnMobile,
    'text-left lg:text-center': !isTitleCenteredOnMobile,
  });

  return (
    <div className={containerClassName}>
      <Typography
        variant="h5"
        className={titleClassname}
      >
        {title}
      </Typography>

      {subtitle && <Typography variant="paragraph-large">{subtitle}</Typography>}
    </div>
  );
};
