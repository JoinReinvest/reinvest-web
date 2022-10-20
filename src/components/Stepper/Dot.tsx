import cx from 'classnames';

interface DotProps {
  isFilled?: boolean;
  size?: 'sm' | 'lg';
}

export const Dot = ({ size = 'sm', isFilled = false }: DotProps) => (
  <div
    className={cx({
      'py-3 rounded-full transition-[width,height] duration-500 ease-in': true,
      'w-[9px] h-[9px]': size === 'sm',
      'w-14 h-14': size === 'lg',
      'bg-black': isFilled,
      'bg-secondary-4': !isFilled,
    })}
  />
);
