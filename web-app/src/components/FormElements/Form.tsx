import { FormEventHandler, ReactNode } from 'react';

interface FormProps {
  children: ReactNode;
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-full flex-col"
    >
      {children}
    </form>
  );
};
