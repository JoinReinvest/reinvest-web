import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { Flow } from './flow';

export const FLOW_BANK_ACCOUNT: SubFlow = {
  identifier: FlowIdentifiers.BANK_ACCOUNT,
  flow: <Flow />,
  selfManagesModal: true,
};
