import { FlowIdentifiers } from '../identifiers';
import { FlowMeta } from '../interfaces';
import { FlowInvestmentFailed as Flow } from './flow';

export const FlowInvestmentFailed: FlowMeta = {
  identifier: FlowIdentifiers.INVESTMENT_FAILED,
  modalTitle: 'Manage Account',
  Component: <Flow />,
  displayActiveAccountProfilePicture: true,
};
