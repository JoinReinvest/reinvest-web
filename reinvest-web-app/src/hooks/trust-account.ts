import { useGetTrustAccount } from 'reinvest-app-common/src/services/queries/getTrustAccount';
import { useUpdateTrustAccount } from 'reinvest-app-common/src/services/queries/updateTrustAccount';
import { Maybe, TrustAccount, UpdateCompanyAccountInput } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  accountId: Maybe<string>;
  enabled?: boolean;
}

interface Returns {
  trustAccount: TrustAccount | null;
  trustAccountMeta: QueryMeta;
  updateTrustAccount: (input: UpdateCompanyAccountInput) => Promise<void>;
  updateTrustAccountMeta: MutationMeta;
}

export function useTrustAccount({ accountId, enabled = true }: Params): Returns {
  const { data, ...trustAccountMeta } = useGetTrustAccount(getApiClient, { accountId: accountId ?? '', config: { enabled: !!accountId && enabled } });
  const { mutateAsync: updateAccountMutate, ...updateTrustAccountMeta } = useUpdateTrustAccount(getApiClient);

  async function updateTrustAccount(input: UpdateCompanyAccountInput) {
    if (accountId) {
      await updateAccountMutate({ input, accountId });
      trustAccountMeta.remove();
    }
  }

  return { trustAccount: data ?? null, trustAccountMeta, updateTrustAccount, updateTrustAccountMeta };
}
