import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useCreateFundsWithdrawalAgreement } from 'reinvest-app-common/src/services/queries/createFundsWithdrawalAgreement';
import { useGetFundsWithdrawalAgreement } from 'reinvest-app-common/src/services/queries/getFundsWithdrawalAgreement';
import { useSignFundsWithdrawalAgreement } from 'reinvest-app-common/src/services/queries/signFundsWithdrawalAgreement';
import { AgreementStatus, FundsWithdrawalAgreement } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Returns {
  createAgreement: () => Promise<void>;
  createdAgreementMeta: MutationMeta;
  currentAgreementMeta: QueryMeta;
  signAgreement: () => Promise<void>;
  signAgreementMeta: MutationMeta;
  subscriptionAgreement: FundsWithdrawalAgreement | null;
}

export function useSubscriptionAgreement(): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';

  const { data: currentAgreement, ...currentAgreementMeta } = useGetFundsWithdrawalAgreement(getApiClient, { accountId, config: { enabled: !!accountId } });
  const { data: createdAgreement, ...createdAgreementMeta } = useCreateFundsWithdrawalAgreement(getApiClient);
  const { mutateAsync: signAgreementMutation, ...signAgreementMeta } = useSignFundsWithdrawalAgreement(getApiClient);

  const subscriptionAgreement = useMemo(() => currentAgreement ?? createdAgreement ?? null, [currentAgreement, createdAgreement]);

  async function createAgreement() {
    if (accountId && !currentAgreement) {
      await createdAgreementMeta.mutateAsync({ accountId });
    }
  }

  async function signAgreement() {
    const hasSignedAgreement = subscriptionAgreement?.status === AgreementStatus.Signed;

    if (accountId && !hasSignedAgreement) {
      await signAgreementMutation({ accountId });
      createdAgreementMeta.reset();
      currentAgreementMeta.refetch();
    }
  }

  return { subscriptionAgreement, currentAgreementMeta, createAgreement, createdAgreementMeta, signAgreement, signAgreementMeta };
}
