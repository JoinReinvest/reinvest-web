interface Props {
  onClick?: () => void;
}

export const ResendCodeLink = ({ onClick }: Props) => (
  <span
    className="typo-link"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    Resend Code
  </span>
);
