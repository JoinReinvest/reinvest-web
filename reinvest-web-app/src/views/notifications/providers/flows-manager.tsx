import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { Maybe, NotificationObject } from 'reinvest-app-common/src/types/graphql';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { FLOWS } from '../flows';
import { FlowIdentifiers } from '../flows/identifiers';
import { FlowMeta } from '../flows/interfaces';
import { useModalManagerContext } from './modal-manager';

type UpdateCurrentFlowParams = { identifier: FlowIdentifiers; notificationObject: Maybe<NotificationObject> };
type UpdateCurrentFlowNullableParams = { identifier: null };
type UpdateCurrentFlow = (params: UpdateCurrentFlowParams | UpdateCurrentFlowNullableParams) => void;

interface State {
  currentFlow: FlowMeta | null;
  currentFlowIdentifier: FlowIdentifiers | null;
  notificationObject: Maybe<NotificationObject>;
  setNotificationObject: (value: Maybe<NotificationObject>) => void;
  updateCurrentFlow: UpdateCurrentFlow;
}

const Context = createContext<State>({
  notificationObject: null,
  currentFlow: null,
  currentFlowIdentifier: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCurrentFlow: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNotificationObject: () => {},
});

export const useFlowsManagerContext = createContextConsumer<State>(Context, 'FlowsManager');

export function FlowsManagerProvider({ children }: PropsWithChildren) {
  const { updateModalTitle } = useModalManagerContext();
  const [currentFlowIdentifier, setCurrentFlowIdentifier] = useState<State['currentFlowIdentifier']>(null);
  const [notificationObject, setNotificationObject] = useState<State['notificationObject']>(null);

  const currentFlow = useMemo(() => {
    if (currentFlowIdentifier) {
      const flow = FLOWS.get(currentFlowIdentifier);

      return flow || null;
    }

    return null;
  }, [currentFlowIdentifier]);

  const updateCurrentFlow: UpdateCurrentFlow = payload => {
    const flow = payload.identifier && FLOWS.get(payload.identifier);

    if (flow && payload.notificationObject) {
      updateModalTitle(flow.modalTitle);
      setNotificationObject(payload.notificationObject);
    } else {
      setCurrentFlowIdentifier(null);
      updateModalTitle(null);
    }

    setCurrentFlowIdentifier(payload.identifier);
  };

  return (
    <Context.Provider value={{ currentFlow, currentFlowIdentifier, notificationObject, updateCurrentFlow, setNotificationObject }}>{children}</Context.Provider>
  );
}
