import { ButtonHTMLAttributes } from 'react';

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
interface Props extends PrimitiveProps {
  label: string;
}

export const ButtonLink = ({ label, onClick }: Props) => (
  <button
    type="button"
    className="typo-link text-left"
    onClick={onClick}
  >
    {label}
  </button>
);
