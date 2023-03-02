import { IconWarning } from '../../assets/icons/IconWarning';
import { Typography } from '../Typography';

interface Props {
  message: string;
}

export const WarningMessage = ({ message }: Props) => (
  <div className="mb-20 flex items-center gap-8 text-green-frost-01">
    <IconWarning />
    <Typography variant="paragraph-large">{message}</Typography>
  </div>
);
