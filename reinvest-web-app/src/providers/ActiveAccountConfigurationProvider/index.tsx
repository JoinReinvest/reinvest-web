import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useAccountConfiguration } from './hooks/account-configuration';
import { useAutomaticDividends } from './hooks/automatic-dividends';

export const useActiveAccountConfiguration = createContextConsumer(Context, 'ActiveAccountConfigurationProvider');

export const ActiveAccountConfigurationProvider = ({ children }: PropsWithChildren) => {
  const { activeAccountConfiguration, activeAccountConfigurationMeta } = useAccountConfiguration();
  const automaticDividends = useAutomaticDividends({ activeAccountConfiguration, activeAccountConfigurationMeta });

  return (
    <Context.Provider
      value={{
        activeAccountConfiguration,
        activeAccountConfigurationMeta,
        ...automaticDividends,
      }}
    >
      {children}
    </Context.Provider>
  );
};
