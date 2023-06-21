import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useAbortFundsWithdrawalRequest } from 'reinvest-app-common/src/services/queries/abortFundsWithdrawalRequest';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  createRequestDraftMeta: MutationMeta;
  createdAgreementMeta: MutationMeta;
  currentAgreementMeta: QueryMeta;
  currentRequestMeta: QueryMeta;
  signAgreementMeta: MutationMeta;
}

interface Returns {
  abortRequest: () => Promise<void>;
  abortRequestMeta: MutationMeta;
}

export function useAbortRequest({
  currentRequestMeta,
  currentAgreementMeta,
  createdAgreementMeta,
  createRequestDraftMeta,
  signAgreementMeta,
}: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';

  const { mutateAsync, ...abortRequestMeta } = useAbortFundsWithdrawalRequest(getApiClient);

  async function abortRequest() {
    if (accountId) {
      await mutateAsync({ accountId });
      currentRequestMeta.remove();
      currentAgreementMeta.remove();
      createdAgreementMeta.reset();
      signAgreementMeta.reset();
      createRequestDraftMeta.reset();
    }
  }

  return { abortRequest, abortRequestMeta };
}
