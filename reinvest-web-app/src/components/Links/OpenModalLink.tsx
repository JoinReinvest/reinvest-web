import cx from 'classnames';

interface OpenModalLinkProps {
  label: string;
  green?: boolean;
  onClick?: () => void;
}

export const OpenModalLink = ({ onClick, label, green = false }: OpenModalLinkProps) => {
  const classes = cx({
    'typo-link': true,
    'text-green-frost-01': green,
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
