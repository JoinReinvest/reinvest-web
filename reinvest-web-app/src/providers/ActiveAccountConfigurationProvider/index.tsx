import { PropsWithChildren, useContext } from 'react';

import { Context } from './context';
import { useAccountConfiguration } from './hooks/account-configuration';
import { useAutomaticDividends } from './hooks/automatic-dividends';

export const useActiveAccountConfiguration = () => useContext(Context);

export const ActiveAccountConfigurationProvider = ({ children }: PropsWithChildren) => {
  const { activeAccountConfiguration, refetchAccountConfiguration } = useAccountConfiguration();
  const automaticDividends = useAutomaticDividends({ activeAccountConfiguration, refetchAccountConfiguration });

  return (
    <Context.Provider
      value={{
        activeAccountConfiguration,
        ...automaticDividends,
      }}
    >
      {children}
    </Context.Provider>
  );
};
