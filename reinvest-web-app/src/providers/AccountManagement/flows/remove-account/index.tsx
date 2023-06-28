import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowRemoveAccount } from './flow';

export const FLOW_REMOVE_ACCOUNT: SubFlow = {
  identifier: FlowIdentifiers.REMOVE_ACCOUNT,
  flow: <FlowRemoveAccount />,
};
