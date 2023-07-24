import { PropsWithChildren } from 'react';

import { Header } from './components/Header';
import { withProviders } from './hocs/providers';

const Content = ({ children }: PropsWithChildren) => (
  <>
    <Header />
    <main className="fixed inset-0 z-0">{children}</main>
  </>
);

export const FullWidthContentLayout = (props: PropsWithChildren) => withProviders(<Content {...props} />);
