import { Button } from '@hookooekoo/ui-button';
import { Typography } from 'components/Typography';

import { NotificationAction } from './interfaces';

type Props = NotificationAction;

export const NotificationButton = ({ label, onClick, disabled = false }: Props) => (
  <Button
    className="flex h-full w-full items-center justify-center bg-white p-15"
    onClick={onClick}
    disabled={disabled}
  >
    <Typography variant="button">{label}</Typography>
  </Button>
);
