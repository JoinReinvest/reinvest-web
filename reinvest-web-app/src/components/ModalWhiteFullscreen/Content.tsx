import { PropsWithChildren } from 'react';

export const Content = ({ children }: PropsWithChildren) => (
  <div className="h-full overflow-y-auto px-24 md:px-44">
    <div className="mx-auto h-full w-full max-w-330">{children}</div>
  </div>
);
