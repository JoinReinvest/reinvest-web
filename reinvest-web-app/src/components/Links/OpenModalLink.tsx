interface OpenModalLinkProps {
  label: string;
  onClick?: () => void;
}

export const OpenModalLink = ({ onClick, label }: OpenModalLinkProps) => (
  <span
    className="typo-link text-green-frost-01"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    {label}
  </span>
);
