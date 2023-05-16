import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useSetAutomaticDividendReinvestmentAgreement } from 'reinvest-app-common/src/services/queries/setAutomaticDividendReinvestmentAgreement';
import { AccountConfiguration } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

import { ConfigurationMeta } from '../interfaces';

interface Params {
  activeAccountConfiguration: AccountConfiguration | null;
  refetchAccountConfiguration: () => void;
}

interface Returns {
  automaticDividendsMeta: ConfigurationMeta;
  hasAutomaticDividendsActive: boolean;
  updateHasAutomaticDividendsActive: (state: boolean) => Promise<void>;
}

export function useAutomaticDividends({ activeAccountConfiguration, refetchAccountConfiguration }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const hasAutomaticDividendsActive = useMemo(() => !!activeAccountConfiguration?.automaticDividendReinvestmentAgreement?.signed, [activeAccountConfiguration]);

  const { mutateAsync, error, isLoading, isSuccess, reset } = useSetAutomaticDividendReinvestmentAgreement(getApiClient);
  const automaticDividendsMeta: ConfigurationMeta = { error, isLoading, isSuccess, reset };

  async function updateHasAutomaticDividendsActive(state: boolean) {
    if (activeAccount?.id) {
      await mutateAsync({ accountId: activeAccount.id, automaticDividendReinvestmentAgreement: state });
      refetchAccountConfiguration();
    }
  }

  return { hasAutomaticDividendsActive, updateHasAutomaticDividendsActive, automaticDividendsMeta };
}
