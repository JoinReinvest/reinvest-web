import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo } from 'react';
import { ModalProps } from 'types/modal';

import { QUERY_FLOW_IDENTIFIER_VALUES, QUERY_MANAGED_FLOWS } from '../constants';
import { FlowIdentifiers, QueryFlowIdentifiers } from '../enums';

interface Params {
  onModalOpenChange: ModalProps['onModalOpenChange'];
  setCurrentFlowIdentifier: (state: FlowIdentifiers | null) => void;
}

interface Returns {
  deprecateQueryFlow: () => void;
  queryFlowIdentifier: FlowIdentifiers | null;
}

export function useQueryFlow({ setCurrentFlowIdentifier, onModalOpenChange }: Params): Returns {
  const router = useRouter();
  const routerQueryKeys = useMemo(() => Object.keys({ ...router.query }), [router]);

  const activeQueryKey = useMemo<QueryFlowIdentifiers | null>(() => {
    const queryKey = routerQueryKeys.find(key => QUERY_FLOW_IDENTIFIER_VALUES.includes(key as QueryFlowIdentifiers));

    return (queryKey as QueryFlowIdentifiers) ?? null;
  }, [routerQueryKeys]);

  const queryFlowIdentifier = useMemo<FlowIdentifiers | null>(() => {
    if (activeQueryKey) {
      const flowIdentifier = QUERY_MANAGED_FLOWS.get(activeQueryKey);

      return flowIdentifier ?? null;
    }

    return null;
  }, [activeQueryKey]);

  /** Use at the end of the flow that expects to be triggered with a query. */
  const deprecateQueryFlow = useCallback(() => {
    const currentRoute = router.pathname;

    router.replace(currentRoute, undefined, { shallow: true });
  }, [router]);

  useEffect(() => {
    if (queryFlowIdentifier) {
      setCurrentFlowIdentifier(queryFlowIdentifier);
      onModalOpenChange(true);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryFlowIdentifier, setCurrentFlowIdentifier]);

  return { queryFlowIdentifier, deprecateQueryFlow };
}
