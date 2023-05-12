import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Typography } from 'components/Typography';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>;
type Props = PrimitiveProps;

export const ButtonBack = forwardRef<HTMLButtonElement, Props>(({ onClick, disabled }, ref) => (
  <button
    type="button"
    className="flex items-center"
    onClick={onClick}
    ref={ref}
    disabled={disabled}
  >
    <IconArrowLeft className="stroke-black-01" />

    <Typography variant="h6">Back</Typography>
  </button>
));
