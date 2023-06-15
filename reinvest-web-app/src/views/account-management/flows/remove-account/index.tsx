import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowRemoveAccount } from './flow';

export const FLOW_REMOVE_ACCOUNT: SubFlow = {
  identifier: FlowIdentifiers.REMOVE_ACCOUNT,
  flow: <FlowRemoveAccount />,
};
