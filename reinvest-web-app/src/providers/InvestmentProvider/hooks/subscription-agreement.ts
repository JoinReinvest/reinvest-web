import { useEffect, useState } from 'react';
import { useCreateSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/createSubscriptionAgreement';
import { useSignSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/signSubscriptionAgreement';
import { SubscriptionAgreement } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Params {
  investmentId: string | null;
}

interface Returns {
  createSubscriptionAgreementMeta: MutationMeta;
  signSubscriptionAgreement: () => Promise<void>;
  signSubscriptionAgreementMeta: MutationMeta;
  subscriptionAgreement: SubscriptionAgreement | null;
}

export function useSubscriptionAgreement({ investmentId }: Params): Returns {
  const [subscriptionAgreement, setSubscriptionAgreement] = useState<SubscriptionAgreement | null>(null);
  const { mutateAsync: createSubscriptionAgreementMutateAsync, ...createSubscriptionAgreementMeta } = useCreateSubscriptionAgreement(getApiClient);
  const { mutateAsync: signSubscriptionAgreementMutateAsync, ...signSubscriptionAgreementMeta } = useSignSubscriptionAgreement(getApiClient);

  useEffect(() => {
    async function retrieveSubscriptionAgreement() {
      if (investmentId) {
        const result = await createSubscriptionAgreementMutateAsync({ investmentId });
        setSubscriptionAgreement(result);
      }
    }

    retrieveSubscriptionAgreement();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [investmentId]);

  /** Will only sign the subscription agreement if the investment has been created before */
  async function signSubscriptionAgreement() {
    if (investmentId) {
      await signSubscriptionAgreementMutateAsync({ investmentId });
    }
  }

  return { subscriptionAgreement, createSubscriptionAgreementMeta, signSubscriptionAgreement, signSubscriptionAgreementMeta };
}
