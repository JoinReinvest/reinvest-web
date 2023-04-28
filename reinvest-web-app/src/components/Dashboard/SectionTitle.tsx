import cx from 'classnames';

import { Typography } from '../Typography';

interface Props {
  title: string;
  className?: string;
  subtitle?: string;
}
export const SectionTitle = ({ title, subtitle, className = '' }: Props) => {
  const styles = cx('flex flex-col gap-4', className);

  return (
    <div className={styles}>
      <Typography variant="h5">{title}</Typography>
      {subtitle && (
        <Typography
          variant="paragraph-emphasized"
          className="text-gray-02"
        >
          {subtitle}
        </Typography>
      )}
    </div>
  );
};
