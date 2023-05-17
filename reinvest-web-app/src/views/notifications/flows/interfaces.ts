import { ReactNode } from 'react';

import { FlowIdentifiers } from './identifiers';

export interface FlowMeta {
  Component: ReactNode;
  identifier: FlowIdentifiers;
  modalTitle: string;
}
