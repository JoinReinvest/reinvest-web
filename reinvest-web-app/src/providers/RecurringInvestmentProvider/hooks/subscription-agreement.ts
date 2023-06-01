import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect, useMemo, useState } from 'react';
import { useCreateRecurringSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/createRecurringSubscriptionAgreement';
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
  createRecurringSubscriptionAgreementMeta: MutationMeta;
  recurringSubscriptionAgreement: SubscriptionAgreement | null;
  signRecurringInvestmentSubscriptionAgreement: () => Promise<void>;
  signRecurringInvestmentSubscriptionAgreementMeta: MutationMeta;
  subscriptionRecurringInvestmentAgreement: SubscriptionAgreement | null;
  subscriptionRecurringInvestmentAgreementMeta: QueryMeta;
}

export function useSubscriptionAgreement({ recurringInvestment, enableQuery }: Params): Returns {
  const [recurringSubscriptionAgreement, setRecurringSubscriptionAgreement] = useState<SubscriptionAgreement | null>(null);
  const { activeAccount } = useActiveAccount();
  const subscriptionAgreementId = useMemo(() => recurringInvestment?.subscriptionAgreementId, [recurringInvestment]);
  const { mutateAsync: createRecurringSubscriptionAgreementMutateAsync, ...createRecurringSubscriptionAgreementMeta } =
    useCreateRecurringSubscriptionAgreement(getApiClient);
  const { data: subscriptionRecurringInvestmentAgreement, ...subscriptionRecurringInvestmentAgreementMeta } = useGetSubscriptionAgreement(getApiClient, {
    subscriptionAgreementId: subscriptionAgreementId ?? '',
    config: {
      enabled: !!subscriptionAgreementId && enableQuery,
    },
  });

  useEffect(() => {
    async function retrieveSubscriptionAgreement() {
      const accountId = activeAccount?.id;

      if (accountId) {
        const result = await createRecurringSubscriptionAgreementMutateAsync({ accountId });
        setRecurringSubscriptionAgreement(result);
      }
    }

    retrieveSubscriptionAgreement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAccount?.id]);

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
    createRecurringSubscriptionAgreementMeta,
    recurringSubscriptionAgreement,
  };
}
