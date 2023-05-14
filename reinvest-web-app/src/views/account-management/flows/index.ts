import { FlowIdentifiers } from '../enums/flow';
import { SubFlow } from '../interfaces/flows';
import { FLOW_DIVIDEND_REINVESTING } from './dividend-reinvesting';

export const FLOWS = new Map<FlowIdentifiers, SubFlow>([[FlowIdentifiers.DIVIDEND_REINVESTING, FLOW_DIVIDEND_REINVESTING]]);
