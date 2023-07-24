import { useMemo } from 'react';
import { EvsChart, Maybe } from 'reinvest-app-common/src/types/graphql';
import { ChartDataPoint, ChartDataPointDomains } from 'types/chart';

import { DEFAULT_MIN_DOMAIN, MAX_DOMAIN_CAP } from '../constants';
import { parseEvsChartPoint } from '../utilities';

interface Params {
  chart: Maybe<EvsChart> | null;
}

interface Return {
  dataPoints: ChartDataPoint[];
  domains: ChartDataPointDomains;
}

export function useDataPoints({ chart }: Params): Return {
  const dataPoints = useMemo(() => {
    const chartPoints = chart?.dataPoints || [];

    return chartPoints.map(parseEvsChartPoint);
  }, [chart]);

  const domains: ChartDataPointDomains = useMemo(() => {
    const values = dataPoints.map(dataPoint => dataPoint.value);
    const min = DEFAULT_MIN_DOMAIN;
    const max = Math.round(Math.max(...values) * MAX_DOMAIN_CAP);

    return { min, max };
  }, [dataPoints]);

  return { dataPoints, domains };
}
