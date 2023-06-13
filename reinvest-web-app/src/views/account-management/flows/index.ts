import { FlowIdentifiers } from '../enums/flow';
import { SubFlow } from '../interfaces/flows';
import { FLOW_CHANGE_PASSWORD } from './change-password';
import { FLOW_DIVIDEND_REINVESTING } from './dividend-reinvesting';
import { FLOW_CHANGE_NAME } from './edit-name';
import { FLOW_UPDATE_ADDRESS } from './update-address';

export const FLOWS = new Map<FlowIdentifiers, SubFlow>([
  [FlowIdentifiers.DIVIDEND_REINVESTING, FLOW_DIVIDEND_REINVESTING],
  [FlowIdentifiers.UPDATE_ADDRESS, FLOW_UPDATE_ADDRESS],
  [FlowIdentifiers.CHANGE_PASSWORD, FLOW_CHANGE_PASSWORD],
  [FlowIdentifiers.NAME, FLOW_CHANGE_NAME],
]);
