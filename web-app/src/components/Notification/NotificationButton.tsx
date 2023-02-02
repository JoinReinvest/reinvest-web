import { Button } from '@hookooekoo/ui-button';

import { NotificationAction } from './interfaces';

type Props = NotificationAction;

export const NotificationButton = ({ label, onClick, disabled = false }: Props) => (
  <Button
    className="flex h-full w-full items-center justify-center bg-white p-[15px]"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="text-[15px] font-medium">{label}</span>
  </Button>
);
