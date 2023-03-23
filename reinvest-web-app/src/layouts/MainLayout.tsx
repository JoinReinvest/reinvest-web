import { PropsWithChildren } from 'react';

import { Header } from './components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />

      <main className="container mx-auto pt-80 pb-20 lg:pt-100">{children}</main>
    </>
  );
};
