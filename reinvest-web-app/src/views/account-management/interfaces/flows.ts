import { ReactNode } from 'react';

import { FlowIdentifiers } from '../enums/flow';

export interface SubFlow {
  flow: ReactNode;
  identifier: FlowIdentifiers;
  selfManagesModal?: boolean;
}
