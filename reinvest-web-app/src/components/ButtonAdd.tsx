import { IconAdd } from 'assets/icons/IconAdd';
import { Typography } from 'components/Typography';
import { ButtonHTMLAttributes } from 'react';

interface Props extends PrimitiveProps {
  subtitle: string;
  title: string;
}

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>;

export const ButtonAdd = ({ title, subtitle, onClick, disabled = false }: Props) => (
  <button
    type="button"
    className="flex items-center gap-x-22 border border-gray-04 p-22 text-left"
    onClick={onClick}
    disabled={disabled}
  >
    <IconAdd className="stroke-black-01" />

    <div>
      <Typography variant="bonus-heading">{title}</Typography>
      <Typography
        variant="paragraph"
        className="text-gray-01 opacity-60"
      >
        {subtitle}
      </Typography>
    </div>
  </button>
);
