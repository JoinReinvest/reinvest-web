import { useApproveFees as useApproveFeesMutation } from 'reinvest-app-common/src/services/queries/approveFees';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

import { useInvestmentSummary } from './investment-summary';

interface Params {
  investmentId: string;
}

interface Returns {
  approveFees: () => Promise<void>;
  approveFeesMeta: MutationMeta;
}

export function useApproveFees({ investmentId }: Params): Returns {
  const { mutateAsync, ...approveFeesMeta } = useApproveFeesMutation(getApiClient);
  const { investmentMeta } = useInvestmentSummary({ investmentId });

  async function approveFees() {
    await mutateAsync({ investmentId });
    investmentMeta.remove();
  }

  return { approveFees, approveFeesMeta };
}
