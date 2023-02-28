import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { Header } from './components/Header';

export const MainLayout = ({ children }: PropsWithChildren) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const className = 'max-lg:overflow-y-hidden';

    if (layoutRef && layoutRef?.current) {
      isMenuOpen ? layoutRef.current.classList.add(className) : layoutRef.current.classList.remove(className);
    }

    return;
  }, [isMenuOpen]);

  return (
    <div
      className="py-40 px-16 lg:py-60 lg:px-44"
      ref={layoutRef}
    >
      <Header
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div>{children}</div>
    </div>
  );
};
