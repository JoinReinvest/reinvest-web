import { FormEventHandler, PropsWithChildren } from 'react';

interface FormProps extends PropsWithChildren {
  className?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

export const Form = ({ onSubmit, children, className }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`relative flex h-full flex-col md:justify-center ${className}`}
    >
      {children}
    </form>
  );
};
