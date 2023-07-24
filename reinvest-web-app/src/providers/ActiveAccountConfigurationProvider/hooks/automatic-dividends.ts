import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useSetAutomaticDividendReinvestmentAgreement } from 'reinvest-app-common/src/services/queries/setAutomaticDividendReinvestmentAgreement';
import { AccountConfiguration } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  activeAccountConfiguration: AccountConfiguration | null;
  activeAccountConfigurationMeta: QueryMeta;
}

interface Returns {
  automaticDividendsMeta: MutationMeta;
  hasAutomaticDividendsActive: boolean;
  updateHasAutomaticDividendsActive: (state: boolean) => Promise<void>;
}

export function useAutomaticDividends({ activeAccountConfiguration, activeAccountConfigurationMeta }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const hasAutomaticDividendsActive = useMemo(() => !!activeAccountConfiguration?.automaticDividendReinvestmentAgreement?.signed, [activeAccountConfiguration]);

  const { mutateAsync, ...automaticDividendsMeta } = useSetAutomaticDividendReinvestmentAgreement(getApiClient);

  async function updateHasAutomaticDividendsActive(state: boolean) {
    if (activeAccount?.id) {
      await mutateAsync({ accountId: activeAccount.id, automaticDividendReinvestmentAgreement: state });
      activeAccountConfigurationMeta.refetch();
    }
  }

  return { hasAutomaticDividendsActive, updateHasAutomaticDividendsActive, automaticDividendsMeta };
}
