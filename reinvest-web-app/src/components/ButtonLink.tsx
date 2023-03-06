import cx from 'classnames';
import { ButtonHTMLAttributes } from 'react';

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'className'>;
interface Props extends PrimitiveProps {
  label: string;
}

export const ButtonLink = ({ label, onClick, className }: Props) => (
  <button
    className={cx('typo-link text-green-frost-01', className)}
    type="button"
    onClick={onClick}
  >
    {label}
  </button>
);
