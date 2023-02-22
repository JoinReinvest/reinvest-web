import { ReactNode } from 'react';

interface ErrorLayoutProps {
  children: ReactNode;
}

export const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return <div className="p-30 flex h-screen flex-col items-center justify-center gap-60">{children}</div>;
};
