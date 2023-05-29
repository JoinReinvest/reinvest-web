import { FlowIdentifiers } from '../identifiers';
import { FlowMeta } from '../interfaces';
import { FlowInvestmentFailed as Flow } from './flow';

// TO-DO: On Release 5 this flow should be connected with the
// "Manage Account" flow.
export const FlowInvestmentFailed: FlowMeta = {
  identifier: FlowIdentifiers.INVESTMENT_FAILED,
  modalTitle: 'Manage Account',
  Component: <Flow />,
  displayActiveAccountProfilePicture: true,
};
