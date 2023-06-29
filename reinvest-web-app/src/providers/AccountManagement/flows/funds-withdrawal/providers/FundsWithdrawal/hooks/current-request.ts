import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useCreateFundsWithdrawalRequest } from 'reinvest-app-common/src/services/queries/createFundsWithdrawalRequest';
import { useGetFundsWithdrawalRequest } from 'reinvest-app-common/src/services/queries/getFundsWithdrawalRequest';
import { FundsWithdrawalRequest } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Returns {
  createRequestDraft: (params: CreateRequestDraftParams) => Promise<void>;
  createRequestDraftMeta: MutationMeta;
  currentRequestMeta: QueryMeta;
  fundsWithdrawalRequest: FundsWithdrawalRequest | null;
}

interface CreateRequestDraftParams {
  reason: string;
}

export function useCurrentRequest(): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';
  const { data: currentRequest, ...currentRequestMeta } = useGetFundsWithdrawalRequest(getApiClient, { accountId, config: { enabled: !!accountId } });
  const { data: createdRequest, mutateAsync: createRequestMutate, ...createRequestDraftMeta } = useCreateFundsWithdrawalRequest(getApiClient);
  const fundsWithdrawalRequest = useMemo(() => currentRequest ?? createdRequest ?? null, [currentRequest, createdRequest]);

  async function createRequestDraft({ reason }: CreateRequestDraftParams) {
    if (accountId) {
      await createRequestMutate({ accountId, investorWithdrawalReason: reason });
    }
  }

  return { fundsWithdrawalRequest, currentRequestMeta, createRequestDraft, createRequestDraftMeta };
}
