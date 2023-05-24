import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import { Maybe, Notification, NotificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { FLOWS } from '../flows';
import { FlowIdentifiers } from '../flows/identifiers';
import { FlowMeta } from '../flows/interfaces';
import { useModalManagerContext } from './modal-manager';

type UpdateCurrentFlowParams = { identifier: FlowIdentifiers; notification: Maybe<Notification> };
type UpdateCurrentFlowNullableParams = { identifier: null };
type UpdateCurrentFlow = (params: UpdateCurrentFlowParams | UpdateCurrentFlowNullableParams) => void;

interface State {
  currentFlow: FlowMeta | null;
  currentFlowIdentifier: FlowIdentifiers | null;
  notification: Maybe<Notification>;
  notificationObjectType: NotificationObjectType | null;
  setNotification: (value: Maybe<Notification>) => void;
  updateCurrentFlow: UpdateCurrentFlow;
}

const Context = createContext<State>({
  notification: null,
  notificationObjectType: null,
  currentFlow: null,
  currentFlowIdentifier: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateCurrentFlow: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNotification: () => {},
});

export const useFlowsManagerContext = createContextConsumer<State>(Context, 'FlowsManager');

export function FlowsManagerProvider({ children }: PropsWithChildren) {
  const { updateModalTitle } = useModalManagerContext();
  const [currentFlowIdentifier, setCurrentFlowIdentifier] = useState<State['currentFlowIdentifier']>(null);
  const [notification, setNotification] = useState<State['notification']>(null);
  const notificationObjectType = useMemo(() => notification?.onObject?.type || null, [notification]);

  const currentFlow = useMemo(() => {
    if (currentFlowIdentifier) {
      const flow = FLOWS.get(currentFlowIdentifier);

      return flow || null;
    }

    return null;
  }, [currentFlowIdentifier]);

  const updateCurrentFlow: UpdateCurrentFlow = payload => {
    const flow = payload.identifier && FLOWS.get(payload.identifier);

    if (flow && payload.notification) {
      updateModalTitle(flow.modalTitle);
      setNotification(payload.notification);
    } else {
      setCurrentFlowIdentifier(null);
      updateModalTitle(null);
    }

    setCurrentFlowIdentifier(payload.identifier);
  };

  return (
    <Context.Provider value={{ currentFlow, currentFlowIdentifier, notification, notificationObjectType, updateCurrentFlow, setNotification }}>
      {children}
    </Context.Provider>
  );
}
