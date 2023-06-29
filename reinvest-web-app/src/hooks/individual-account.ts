import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';
import { useUpdateIndividualAccount } from 'reinvest-app-common/src/services/queries/updateIndividualAccount';
import { IndividualAccount, IndividualAccountInput } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Returns {
  individualAccount: IndividualAccount | null;
  individualAccountMeta: QueryMeta;
  updateIndividualAccount: (input: IndividualAccountInput) => Promise<void>;
  updateIndividualAccountMeta: MutationMeta;
}

export function useIndividualAccount(): Returns {
  const { allAccountsMeta } = useActiveAccount();
  const { data: queryData, ...individualAccountMeta } = useGetIndividualAccount(getApiClient);
  const { data: mutationData, mutateAsync, ...updateIndividualAccountMeta } = useUpdateIndividualAccount(getApiClient);

  const individualAccount = useMemo(() => mutationData ?? queryData ?? null, [mutationData, queryData]);

  async function updateIndividualAccount(input: IndividualAccountInput) {
    const accountId = individualAccount?.id;

    if (accountId) {
      await mutateAsync({ input, accountId });
      individualAccountMeta.remove();
      allAccountsMeta.refetch();
    }
  }

  return { individualAccountMeta, updateIndividualAccountMeta, individualAccount, updateIndividualAccount };
}
