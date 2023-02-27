import { ButtonProps } from '@hookooekoo/ui-button';

export interface NotificationProps {
  actions: [NotificationAction, NotificationAction];
  children: JSX.Element;
  title: string;
  isOpen?: boolean;
}

export interface NotificationAction extends PrimitiveButtonProps {
  label: string;
}

type PrimitiveButtonProps = Pick<ButtonProps, 'onClick' | 'disabled'>;
