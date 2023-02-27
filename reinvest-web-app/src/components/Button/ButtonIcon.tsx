import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';

import { ButtonProps } from './interfaces';

type ButtonIconProps = Pick<ButtonProps, 'showIcon' | 'disabled'>;

export const ButtonIcon = ({ showIcon, disabled }: ButtonIconProps) => {
  const styles = cx({
    'stroke-1 stroke-green-deep': true,
    'stroke-gray-02': !!disabled,
  });

  return showIcon === 'left' ? <IconArrowLeft className={styles} /> : <IconArrowRight className={styles} />;
};
