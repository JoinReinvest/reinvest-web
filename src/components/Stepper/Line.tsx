import cx from 'classnames';

interface LineProps {
  isFilled?: boolean;
}

export const Line = ({ isFilled = false }: LineProps) => (
  <div
    className={cx({
      'flex-auto border-t-2 transition duration-500 ease-in-out': true,
      'border-black': isFilled,
      'border-gray-light': !isFilled,
    })}
  />
);
