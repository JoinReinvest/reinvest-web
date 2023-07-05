import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect, useState } from 'react';
import { useCreateInvestment as useCreateOneTimeInvestment } from 'reinvest-app-common/src/services/queries/createInvestment';
import { parseToUsdInput } from 'reinvest-app-common/src/utilities/currency';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';
interface CreateInvestmentParams {
  investmentAmount: number;
  accountId?: string;
}

interface Returns {
  createInvestment: (params: CreateInvestmentParams) => Promise<void>;
  createInvestmentMeta: MutationMeta;
  investmentId: string | null;
}

export function useCreateInvestment(): Returns {
  const { activeAccount } = useActiveAccount();
  const { mutateAsync, ...createInvestmentMeta } = useCreateOneTimeInvestment(getApiClient);
  const [investmentId, setInvestmentId] = useState<string | null>(null);

  const { data, isSuccess } = createInvestmentMeta;

  useEffect(() => {
    if (isSuccess) {
      setInvestmentId(data ?? null);
    }
  }, [data, isSuccess]);

  /**
   * If `accountId` is `undefined` the investment will be assigned to the
   * active account.
   */
  async function createInvestment({ accountId: maybeAccountId, investmentAmount }: CreateInvestmentParams) {
    const accountId = maybeAccountId ?? activeAccount?.id;

    if (accountId) {
      const amount = parseToUsdInput(investmentAmount);
      await mutateAsync({ accountId, amount });
    }
  }

  return { createInvestment, createInvestmentMeta, investmentId };
}
