import { FlowIdentifiers } from '../identifiers';
import { FlowMeta } from '../interfaces';
import { Flow } from './flow';

export const FlowRecurringInvestmentFailed: FlowMeta = {
  identifier: FlowIdentifiers.RECURRING_INVESTMENT_FAILED,
  modalTitle: 'Manage Account',
  Component: <Flow />,
  displayActiveAccountProfilePicture: true,
};
