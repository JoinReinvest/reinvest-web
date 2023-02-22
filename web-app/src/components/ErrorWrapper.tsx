import { ReactNode } from 'react';

interface ErrorWrapperProps {
  children: ReactNode;
}

export const ErrorWrapper = ({ children }: ErrorWrapperProps) => {
  return <div className="p-30 flex h-screen flex-col items-center justify-center gap-60">{children}</div>;
};
