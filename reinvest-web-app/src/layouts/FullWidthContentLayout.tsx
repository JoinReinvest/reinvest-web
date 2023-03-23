import { PropsWithChildren } from 'react';

import { Header } from './components/Header';

export const FullWidthContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="fixed inset-0 z-0">{children}</main>
    </>
  );
};
