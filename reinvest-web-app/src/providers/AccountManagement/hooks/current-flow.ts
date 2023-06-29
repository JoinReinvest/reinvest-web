import { useMemo, useState } from 'react';

import { FlowIdentifiers } from '../enums';
import { FLOWS } from '../flows';
import { SubFlow } from '../interfaces';

interface Returns {
  currentFlow: SubFlow | null;
  currentFlowIdentifier: FlowIdentifiers | null;
  setCurrentFlowIdentifier: (state: FlowIdentifiers | null) => void;
}

export function useCurrentFlow(): Returns {
  const [currentFlowIdentifier, setCurrentFlowIdentifier] = useState<FlowIdentifiers | null>(null);

  const currentFlow = useMemo<SubFlow | null>(() => {
    if (currentFlowIdentifier) {
      const flow = FLOWS.get(currentFlowIdentifier);

      return flow || null;
    }

    return null;
  }, [currentFlowIdentifier]);

  return { currentFlow, currentFlowIdentifier, setCurrentFlowIdentifier };
}
