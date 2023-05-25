import { ReactNode } from 'react';

import { FlowIdentifiers } from './identifiers';

export interface FlowMeta {
  Component: ReactNode;
  identifier: FlowIdentifiers;
  modalTitle: string;
}

export enum DividendAction {
  WITHDRAW_FUNDS = 'WITHDRAW_FUNDS',
  REINVEST_FUNDS = 'REINVEST_FUNDS',
}
