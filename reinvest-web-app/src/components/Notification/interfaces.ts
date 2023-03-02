import { ButtonHTMLAttributes } from 'react';

export interface NotificationProps {
  actions: [NotificationAction, NotificationAction];
  children: JSX.Element;
  title: string;
  isOpen?: boolean;
}

export interface NotificationAction extends PrimitiveButtonProps {
  label: string;
}

type PrimitiveButtonProps = Pick<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'disabled'>;
