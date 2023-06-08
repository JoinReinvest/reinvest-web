import { FlowIdentifiers } from '../enums/flow';
import { SubFlow } from '../interfaces/flows';
import { FLOW_DIVIDEND_REINVESTING } from './dividend-reinvesting';
import { FLOW_UPDATE_ADDRESS } from './update-address';

export const FLOWS = new Map<FlowIdentifiers, SubFlow>([
  [FlowIdentifiers.DIVIDEND_REINVESTING, FLOW_DIVIDEND_REINVESTING],
  [FlowIdentifiers.UPDATE_ADDRESS, FLOW_UPDATE_ADDRESS],
]);
