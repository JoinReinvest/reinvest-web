import { Button } from 'components/Button';
import { ComponentProps, ReactNode } from 'react';

export interface Props {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  children: ReactNode;
  buttonProps: ButtonProps;
}

type ButtonProps = ComponentProps<typeof Button>;
