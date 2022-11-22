import { Button as PrimitiveButton } from '@hookooekoo/ui-button';

import { ButtonIcon } from './ButtonIcon';
import { ButtonProps } from './interfaces';
import { variants } from './variants';

export const Button = ({ label, size, variant, showIcon, disabled, type = 'button', onClick, className = '' }: ButtonProps) => {
  const styles = variants({ variant, size, showIcon, disabled, className });

  return (
    <PrimitiveButton
      className={styles}
      disabled={!!disabled}
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
    </PrimitiveButton>
  );
};
