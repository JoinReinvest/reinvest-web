import { EvsChartPoint, Maybe } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';
import { ChartDataPoint } from 'types/chart';

export function parseEvsChartPoint(dataPoint: Maybe<EvsChartPoint>): ChartDataPoint {
  const date = formatDate(dataPoint?.date || '', 'CHART', { currentFormat: 'API' });
  const value = dataPoint?.usd || 0;

  return { date, value };
}
