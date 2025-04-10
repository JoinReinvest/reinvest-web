import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>;
interface Props extends PrimitiveProps {
  className?: string;
  hideOnMobile?: boolean;
}

export const ButtonBack = forwardRef<HTMLButtonElement, Props>(({ onClick, hideOnMobile = false, disabled, className: additionalClassName }, ref) => {
  const className = cx('items-center', { flex: !hideOnMobile, 'hidden lg:flex': !!hideOnMobile }, additionalClassName);

  return (
    <button
      type="button"
      className={className}
      onClick={onClick}
      ref={ref}
      disabled={disabled}
    >
      <IconArrowLeft className="stroke-black-01" />

      <Typography variant="h6">Back</Typography>
    </button>
  );
});
