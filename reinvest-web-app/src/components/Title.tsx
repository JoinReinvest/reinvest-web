import cx from 'classnames';

import { Typography } from './Typography';

interface Props {
  title: string;
  className?: string;
  subtitle?: string;
}

export const Title = ({ title, subtitle, className = '' }: Props) => {
  const titleContainerStyles = cx(
    {
      'text-left md:text-center': !className,
    },
    className,
  );

  return (
    <div className={titleContainerStyles}>
      <Typography
        variant="h5"
        className="mb-36"
      >
        {title}
      </Typography>
      {subtitle && <Typography variant="paragraph-large">{subtitle}</Typography>}
    </div>
  );
};
