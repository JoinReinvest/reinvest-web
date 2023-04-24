import { IconArrowLeft } from 'assets/icons/IconArrowLeft';
import { Typography } from 'components/Typography';
import { ButtonHTMLAttributes, forwardRef } from 'react';

type PrimitiveProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>;
type Props = PrimitiveProps;

export const ButtonBack = forwardRef<HTMLButtonElement, Props>(({ onClick }, ref) => (
  <button
    type="button"
    className="flex items-center"
    onClick={onClick}
    ref={ref}
  >
    <IconArrowLeft className="stroke-black-01" />

    <Typography variant="h6">Back</Typography>
  </button>
));
