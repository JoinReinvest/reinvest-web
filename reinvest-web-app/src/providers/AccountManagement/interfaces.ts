import { ReactNode } from 'react';

import { FlowIdentifiers } from './enums';
import { useCurrentFlow } from './hooks/current-flow';
import { useModal } from './hooks/modal';
import { useQueryFlow } from './hooks/query-flow';

export interface State extends HookModal, HookCurrentFlow, HookQueryFlow {
  modalTitle: string;
}

type HookModal = ReturnType<typeof useModal>;
type HookCurrentFlow = ReturnType<typeof useCurrentFlow>;
type HookQueryFlow = ReturnType<typeof useQueryFlow>;

export interface SubFlow {
  flow: ReactNode;
  identifier: FlowIdentifiers;
  selfManagesModal?: boolean;
}
