interface OpenModalLinkProps {
  label: string;
  onClick?: () => void;
}

export const OpenModalLink = ({ onClick, label }: OpenModalLinkProps) => (
  <span
    className="typo-link"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    {label}
  </span>
);
