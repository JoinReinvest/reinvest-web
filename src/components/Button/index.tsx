import { Button as PrimitiveButton } from '@hookooekoo/ui-button';
import { IconLoading } from 'assets/icons/IconLoading';
import { Typography } from 'components/Typography';

import { ButtonIcon } from './ButtonIcon';
import { ButtonProps } from './interfaces';
import { variants } from './variants';

export const Button = ({ label, size, variant, showIcon, disabled = false, loading = false, type = 'button', onClick, className = '' }: ButtonProps) => {
  const styles = variants({ variant, size, showIcon, disabled: disabled || loading, loading, className });

  return (
    <PrimitiveButton
      className={styles}
      disabled={!!disabled}
      type={type}
      onClick={onClick}
    >
      {loading && <IconLoading />}

      <Typography variant="button">{label}</Typography>

      {!!showIcon && (
        <ButtonIcon
          showIcon={showIcon}
          disabled={disabled}
        />
      )}
    </PrimitiveButton>
  );
};
