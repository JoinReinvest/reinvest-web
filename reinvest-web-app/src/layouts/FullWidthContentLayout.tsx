import { PropsWithChildren } from 'react';

import { Header } from './components/Header';

export const FullWidthContentLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />

      <main className="pb-20">{children}</main>
    </>
  );
};
