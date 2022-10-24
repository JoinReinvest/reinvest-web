import { IconProps } from '@hookooekoo/interfaces-icon';

export const IconArrowRight = ({ className, onClick }: IconProps) => (
  <svg
    className={className}
    onClick={onClick}
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M13 21L18 16L13 11"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
