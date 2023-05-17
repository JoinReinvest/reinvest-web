import { PropsWithChildren, useState } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { DEFAULT_RESOLUTION, PROVIDER_NAME } from './constants';
import { Context } from './context';
import { useDataPoints } from './hooks/data-points';
import { useEvsChart } from './hooks/evs-chart';
import { State } from './interfaces';

export const useActiveAccountChart = createContextConsumer(Context, PROVIDER_NAME);

export function ActiveAccountChartProvider({ children }: PropsWithChildren) {
  const [resolution, setResolution] = useState<State['resolution']>(DEFAULT_RESOLUTION);
  const { chart, meta } = useEvsChart({ resolution });
  const { dataPoints, domains } = useDataPoints({ chart });

  return <Context.Provider value={{ chart, dataPoints, domains, meta, resolution, setResolution }}>{children}</Context.Provider>;
}
