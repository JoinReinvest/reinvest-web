import { FlowIdentifiers } from '../enums/flow';
import { SubFlow } from '../interfaces/flows';
import { FLOW_DIVIDEND_REINVESTING } from './dividend-reinvesting';
import { FLOW_INVESTMENT_HISTORY } from './investment-history';

export const FLOWS = new Map<FlowIdentifiers, SubFlow>([
  [FlowIdentifiers.INVESTMENT_HISTORY, FLOW_INVESTMENT_HISTORY],
  [FlowIdentifiers.DIVIDEND_REINVESTING, FLOW_DIVIDEND_REINVESTING],
]);
