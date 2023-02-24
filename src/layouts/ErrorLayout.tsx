import { ReactNode } from 'react';

interface ErrorWrapperProps {
  children: ReactNode;
}

export const ErrorLayout = ({ children }: ErrorWrapperProps) => {
  return <div className="flex h-screen flex-col items-center justify-center gap-60 p-30">{children}</div>;
};
