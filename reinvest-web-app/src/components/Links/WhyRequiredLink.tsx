interface Props {
  onClick?: () => void;
}

export const WhyRequiredLink = ({ onClick }: Props) => (
  <span
    className="typo-link"
    onKeyDown={onClick}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    Required. Why?
  </span>
);
