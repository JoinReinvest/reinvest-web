import { IconCheck } from 'assets/icons/IconCheck';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isChecked: boolean;
}

export const CheckItem = ({ children, isChecked = false }: Props) => {
  const labelClassName = cx({ 'text-white': isChecked, 'text-gray-02': !isChecked });
  const iconClassName = cx({ 'stroke-tertiary-success': isChecked, 'stroke-gray-02': !isChecked });

  return (
    <li className="flex justify-between">
      <Typography
        variant="paragraph-large"
        className={labelClassName}
      >
        {children}
      </Typography>
      <IconCheck className={iconClassName} />
    </li>
  );
};
