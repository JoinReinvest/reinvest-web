import { PropsWithChildren } from 'react';

import { Header } from './components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => (
  <div className="py-40 px-16 lg:py-60 lg:px-44">
    <Header />
    {children}
  </div>
);
