import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { Flow } from './flow';

export const FLOW_BANK_ACCOUNT: SubFlow = {
  identifier: FlowIdentifiers.BANK_ACCOUNT,
  flow: <Flow />,
  selfManagesModal: true,
};
