import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useGetSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/getSubscriptionAgreement';
import { useSignRecurringInvestmentSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/signRecurringInvestmentSubscriptionAgreement';
import { RecurringInvestment, SubscriptionAgreement } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';
import { MutationMeta } from 'types/queries';

interface Params {
  recurringInvestment: RecurringInvestment | null;
  enableQuery?: boolean;
}

interface Returns {
  signRecurringInvestmentSubscriptionAgreement: () => Promise<void>;
  signRecurringInvestmentSubscriptionAgreementMeta: MutationMeta;
  subscriptionRecurringInvestmentAgreement: SubscriptionAgreement | null;
  subscriptionRecurringInvestmentAgreementMeta: QueryMeta;
}

export function useSubscriptionAgreement({ recurringInvestment, enableQuery }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const subscriptionAgreementId = useMemo(() => recurringInvestment?.subscriptionAgreementId, [recurringInvestment]);

  const { data: subscriptionRecurringInvestmentAgreement, ...subscriptionRecurringInvestmentAgreementMeta } = useGetSubscriptionAgreement(getApiClient, {
    subscriptionAgreementId: subscriptionAgreementId ?? '',
    config: {
      enabled: !!subscriptionAgreementId && enableQuery,
    },
  });

  const { mutateAsync, ...signRecurringInvestmentSubscriptionAgreementMeta } = useSignRecurringInvestmentSubscriptionAgreement(getApiClient);

  async function signRecurringInvestmentSubscriptionAgreement() {
    if (activeAccount?.id) {
      const accountId = activeAccount.id;
      await mutateAsync({ accountId });
    }
  }

  return {
    subscriptionRecurringInvestmentAgreement: subscriptionRecurringInvestmentAgreement ?? null,
    subscriptionRecurringInvestmentAgreementMeta,
    signRecurringInvestmentSubscriptionAgreement,
    signRecurringInvestmentSubscriptionAgreementMeta,
  };
}
