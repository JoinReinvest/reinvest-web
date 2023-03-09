import { PropsWithChildren } from 'react';

import { Header } from './components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />

      <main className="container mx-auto pb-20">{children}</main>
    </>
  );
};
