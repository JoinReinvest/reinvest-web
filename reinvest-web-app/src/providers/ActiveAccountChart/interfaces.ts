import { EvsChart, EvsChartResolution, Maybe } from 'reinvest-app-common/src/types/graphql';
import { ChartDataPoint, ChartDataPointDomains } from 'types/chart';
import { QueryMeta } from 'types/queries';

export interface State {
  chart: Maybe<EvsChart> | null;
  dataPoints: ChartDataPoint[];
  domains: ChartDataPointDomains | null;
  meta: QueryMeta;
  resolution: EvsChartResolution;
  setResolution: (resolution: EvsChartResolution) => void;
}
