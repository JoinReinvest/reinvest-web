import { Button as BaseButton, ButtonProps as BaseButtonProps } from '@hookooekoo/ui-button';
import cx from 'classnames';

import { ButtonIcon } from './ButtonIcon';

export interface ButtonProps extends Omit<BaseButtonProps, 'children' | 'className'> {
  label: string;
  showIcon?: 'left' | 'right';
  size?: 'sm' | 'lg';
  variant?: 'default' | 'outlined' | 'dashed';
}

export const Button = ({ label, size = 'lg', variant = 'default', showIcon, disabled = false, type = 'button', onClick }: ButtonProps) => {
  const isVariantOutlinedOrDashed = ['outlined', 'dashed'].includes(variant);
  const isVariantDefault = variant === 'default';

  const styles = cx({
    'text-15 font-medium': true,
    'py-[15px] px-30': size === 'lg',
    'py-12 px-16': size === 'sm',
    'bg-green-frost-solid': isVariantDefault,
    'border-green-frost-solid': isVariantOutlinedOrDashed,
    'border-2': variant === 'outlined',
    'border border-dashed': variant === 'dashed',
    'text-green-deep': !disabled,
    'cursor-not-allowed': !!disabled,
    'bg-secondary-5 text-secondary-3': !!disabled && isVariantDefault,
    'text-secondary-4 border-secondary-5': !!disabled && isVariantOutlinedOrDashed,
    'flex justify-center items-center gap-x-8 py-8 px-16': !!showIcon,
    'flex-row-reverse': showIcon === 'left',
  });

  return (
    <BaseButton
      className={styles}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {label}

      {!!showIcon && (
        <ButtonIcon
          showIcon={showIcon}
          disabled={disabled}
        />
      )}
    </BaseButton>
  );
};
