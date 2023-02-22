import { FormEventHandler, PropsWithChildren } from 'react';

interface FormProps extends PropsWithChildren {
  onSubmit: FormEventHandler<HTMLFormElement> | undefined;
}

export const Form = ({ onSubmit, children }: FormProps) => {
  return (
    <form
      onSubmit={onSubmit}
      className="relative flex h-full flex-col md:justify-center"
    >
      {children}
    </form>
  );
};
