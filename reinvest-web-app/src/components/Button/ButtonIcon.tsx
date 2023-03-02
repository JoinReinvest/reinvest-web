import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { ComponentProps } from 'react';

import { Button } from './index';

type PrimitiveProps = ComponentProps<typeof Button>;
type Props = Pick<PrimitiveProps, 'showIcon' | 'disabled'>;

export const ButtonIcon = ({ showIcon, disabled }: Props) => {
  const styles = cx({
    'stroke-1 stroke-green-deep': true,
    'stroke-gray-02': !!disabled,
  });

  return showIcon === 'left' ? <IconArrowLeft className={styles} /> : <IconArrowRight className={styles} />;
};
