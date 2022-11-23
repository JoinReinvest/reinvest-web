import { Button } from '@hookooekoo/ui-button';

import { NotificationAction } from './interfaces';

type Props = NotificationAction;

export const NotificationButton = ({ label, onClick, disabled = false }: Props) => (
  <Button
    className="w-full h-full p-[15px] flex justify-center items-center bg-white"
    onClick={onClick}
    disabled={disabled}
  >
    <span className="text-[15px] font-medium">{label}</span>
  </Button>
);
