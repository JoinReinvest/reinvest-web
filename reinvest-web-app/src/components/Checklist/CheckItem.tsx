import { IconCheck } from 'assets/icons/IconCheck';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  isChecked: boolean;
  blackColorText?: boolean;
}

export const CheckItem = ({ children, isChecked = false, blackColorText = false }: Props) => {
  const labelClassName = cx({ 'text-white': isChecked && !blackColorText, 'text-gray-02': !isChecked, 'text-black-01': isChecked && blackColorText });
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
