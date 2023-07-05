import { PropsWithChildren } from 'react';

import { Header } from './components/Header';
import { withProviders } from './hocs/providers';

const Content = ({ children }: PropsWithChildren) => (
  <>
    <Header />

    <main className="container mx-auto pb-20 pt-80 lg:pt-100">{children}</main>
  </>
);

export const MainLayout = (props: PropsWithChildren) => withProviders(<Content {...props} />);
