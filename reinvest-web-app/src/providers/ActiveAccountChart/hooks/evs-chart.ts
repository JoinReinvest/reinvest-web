import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetEVSChart } from 'reinvest-app-common/src/services/queries/getEVSChart';
import { EvsChart, EvsChartResolution, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

import { ChartMeta } from '../interfaces';

interface Params {
  resolution: EvsChartResolution;
}

interface Return {
  chart: Maybe<EvsChart> | null;
  meta: ChartMeta;
}

export function useEvsChart({ resolution }: Params): Return {
  const { activeAccount } = useActiveAccount();
  const {
    data: chart,
    isLoading,
    isSuccess,
    refetch,
  } = useGetEVSChart(getApiClient, { accountId: activeAccount?.id || '', resolution, config: { enabled: !!activeAccount?.id && !!resolution } });
  const meta: ChartMeta = { isLoading, isSuccess, refetch };

  return { chart: chart || null, meta };
}
