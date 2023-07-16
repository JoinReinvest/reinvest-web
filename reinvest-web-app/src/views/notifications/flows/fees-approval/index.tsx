import { FlowIdentifiers } from '../identifiers';
import { FlowMeta } from '../interfaces';
import { Flow } from './flow';

export const FlowFeesApproval: FlowMeta = {
  identifier: FlowIdentifiers.APPROVE_FEES,
  modalTitle: '',
  Component: <Flow />,
  displayActiveAccountProfilePicture: false,
  selfManagesModal: true,
};
