import { useGetCorporateAccount } from 'reinvest-app-common/src/services/queries/getCorporateAccount';
import { useUpdateCorporateAccount } from 'reinvest-app-common/src/services/queries/updateCorporateAccount';
import { CorporateAccount, Maybe, UpdateCompanyAccountInput } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  accountId: Maybe<string>;
  enabled?: boolean;
}

interface Returns {
  corporateAccount: CorporateAccount | null;
  corporateAccountMeta: QueryMeta;
  updateCorporateAccount: (input: UpdateCompanyAccountInput) => Promise<void>;
  updateCorporateAccountMeta: MutationMeta;
}

export function useCorporateAccount({ accountId, enabled = true }: Params): Returns {
  const { data, ...corporateAccountMeta } = useGetCorporateAccount(getApiClient, { accountId: accountId ?? '', config: { enabled: !!accountId && enabled } });
  const { mutateAsync: updateAccountMutate, ...updateCorporateAccountMeta } = useUpdateCorporateAccount(getApiClient);

  async function updateCorporateAccount(input: UpdateCompanyAccountInput) {
    if (accountId) {
      await updateAccountMutate({ input, accountId });
      corporateAccountMeta.remove();
    }
  }

  return { corporateAccount: data ?? null, corporateAccountMeta, updateCorporateAccount, updateCorporateAccountMeta };
}
