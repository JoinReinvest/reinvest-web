import { PropsWithChildren } from 'react';

import { Header } from './components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />

      <main className="container mx-auto pb-20 pt-80 lg:pt-100">{children}</main>
    </>
  );
};
