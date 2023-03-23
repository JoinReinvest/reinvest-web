import cx from 'classnames';

interface OpenModalLinkProps {
  label: string;
  center?: boolean;
  green?: boolean;
  onClick?: () => void;
}

export const OpenModalLink = ({ onClick, label, green = false, center = false }: OpenModalLinkProps) => {
  const classes = cx({
    'typo-link': true,
    'text-green-frost-01': green,
    'text-center': !!center,
  });

  return (
    <span
      className={classes}
      onKeyDown={onClick}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {label}
    </span>
  );
};
