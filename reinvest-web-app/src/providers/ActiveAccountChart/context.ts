import { createContext } from 'react';
import { EvsChartResolution } from 'reinvest-app-common/src/types/graphql';

import { ChartMeta, State } from './interfaces';

const DEFAULT_META: ChartMeta = {
  isLoading: false,
  isSuccess: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetch: () => {},
};

export const Context = createContext<State>({
  chart: null,
  dataPoints: [],
  domains: null,
  meta: DEFAULT_META,
  resolution: EvsChartResolution.Day,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setResolution: () => {},
});
