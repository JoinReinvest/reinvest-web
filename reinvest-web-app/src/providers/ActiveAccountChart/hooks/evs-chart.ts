import { useQueryRefetchInterval } from 'hooks/query-refetch-interval';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetEVSChart } from 'reinvest-app-common/src/services/queries/getEVSChart';
import { EvsChart, EvsChartResolution, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Params {
  resolution: EvsChartResolution;
}

interface Return {
  chart: Maybe<EvsChart> | null;
  meta: QueryMeta;
}

export function useEvsChart({ resolution }: Params): Return {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';

  const { refetchInterval } = useQueryRefetchInterval();
  const { data: chart, ...meta } = useGetEVSChart(getApiClient, { accountId, resolution, config: { enabled: !!accountId && !!resolution, refetchInterval } });

  return { chart: chart || null, meta };
}
