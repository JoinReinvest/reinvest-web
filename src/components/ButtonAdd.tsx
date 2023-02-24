import { Button as PrimitiveButton, ButtonProps as PrimitiveProps } from '@hookooekoo/ui-button';
import { IconAdd } from 'assets/icons/IconAdd';
import { Typography } from 'components/Typography';

interface Props extends Pick<PrimitiveProps, 'onClick' | 'disabled'> {
  subtitle: string;
  title: string;
}

export const ButtonAdd = ({ title, subtitle, onClick, disabled = false }: Props) => (
  <PrimitiveButton
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
  </PrimitiveButton>
);
