import { IconLoading } from 'assets/icons/IconLoading';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { ButtonHTMLAttributes, forwardRef } from 'react';

import { ButtonIcon } from './ButtonIcon';
import { PrimitiveVariantProps, variants } from './variants';

interface Props extends PrimitiveProps, PrimitiveVariantProps {
  label: string;
  loading?: boolean;
  showIcon?: 'left' | 'right';
}

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'tabIndex' | 'onClick' | 'className'>;

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    { label, variant = 'default', size = 'sm', type = 'button', loading = false, disabled = false, showIcon, tabIndex, onClick, className: passedClassName },
    ref,
  ) => {
    const willShowIcon = !!showIcon;
    const showIconToTheLeft = showIcon === 'left';

    const className = cx(variants({ variant, size, disabled, className: passedClassName }), {
      'flex justify-center items-center gap-x-8': !!loading,
      'px-16 flex justify-center items-center gap-x-8': willShowIcon || loading,
      'flex-row-reverse': showIconToTheLeft,
    });

    return (
      <button
        type={type}
        className={className}
        disabled={!!disabled || !!loading}
        tabIndex={tabIndex}
        onClick={onClick}
        ref={ref}
      >
        {loading && <IconLoading />}

        <Typography variant="button">{label}</Typography>

        {willShowIcon && (
          <ButtonIcon
            showIcon={showIcon}
            disabled={disabled}
          />
        )}
      </button>
    );
  },
);
