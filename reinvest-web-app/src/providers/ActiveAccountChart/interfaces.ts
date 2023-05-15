import { EvsChart, EvsChartResolution, Maybe } from 'reinvest-app-common/src/types/graphql';
import { ChartDataPoint, ChartDataPointDomains } from 'types/chart';

export interface State {
  chart: Maybe<EvsChart> | null;
  dataPoints: ChartDataPoint[];
  domains: ChartDataPointDomains | null;
  meta: ChartMeta;
  resolution: EvsChartResolution;
  setResolution: (resolution: EvsChartResolution) => void;
}

export interface ChartMeta {
  isLoading: boolean;
  isSuccess: boolean;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetch: () => void;
}
