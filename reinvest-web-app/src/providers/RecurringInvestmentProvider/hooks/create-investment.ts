import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useCreateRecurringInvestment } from 'reinvest-app-common/src/services/queries/createRecurringInvestment';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';
import { parseToUsdInput } from 'reinvest-app-common/src/utilities/currency';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface CreateRecurringInvestmentInvestmentParams {
  date: Date;
  frequency: RecurringInvestmentFrequency;
  investmentAmount: number;
}

type CreateRecurringInvestmentInvestment = (parameters: CreateRecurringInvestmentInvestmentParams) => Promise<void>;

interface Params {
  activeRecurringInvestmentMeta: QueryMeta;
  recurringInvestmentMeta: QueryMeta;
}

interface Returns {
  createRecurringInvestment: CreateRecurringInvestmentInvestment;
  createRecurringInvestmentMeta: MutationMeta;
}

export function useCreateInvestment({ recurringInvestmentMeta, activeRecurringInvestmentMeta }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const { mutateAsync, isLoading, isSuccess, error, reset } = useCreateRecurringInvestment(getApiClient);
  const createRecurringInvestmentMeta: MutationMeta = { isLoading, isSuccess, error, reset };

  const createRecurringInvestment: CreateRecurringInvestmentInvestment = async ({ investmentAmount, date, frequency }) => {
    if (activeAccount?.id) {
      const accountId = activeAccount.id;
      const startDate = formatDate(date, 'API');
      const amount = parseToUsdInput(investmentAmount);

      await mutateAsync({ accountId, amount, schedule: { startDate, frequency } });
      recurringInvestmentMeta.refetch();
      activeRecurringInvestmentMeta.refetch();
    }
  };

  return { createRecurringInvestment, createRecurringInvestmentMeta };
}
