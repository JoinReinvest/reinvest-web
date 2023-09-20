import { DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';
import { EvsChartResolution } from 'reinvest-app-common/src/types/graphql';

import { State } from './interfaces';

export const Context = createContext<State>({
  chart: null,
  dataPoints: [],
  domains: null,
  meta: DEFAULT_QUERY_META,
  resolution: EvsChartResolution.Day,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setResolution: () => {},
});
