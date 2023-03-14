import { IconAdd } from 'assets/icons/IconAdd';
import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { ComponentProps } from 'react';

import { Button } from './index';

type PrimitiveProps = ComponentProps<typeof Button>;
type Props = Pick<PrimitiveProps, 'showIcon' | 'icon' | 'disabled'>;

export const ButtonIcon = ({ showIcon, icon, disabled }: Props) => {
  const isAddIcon = icon === 'add';

  const styles = cx('stroke-1', {
    'stroke-green-deep': !disabled,
    'stroke-gray-02': !!disabled,
  });

  if (isAddIcon) {
    return <IconAdd className={styles} />;
  }

  return showIcon === 'left' ? <IconArrowLeft className={styles} /> : <IconArrowRight className={styles} />;
};
