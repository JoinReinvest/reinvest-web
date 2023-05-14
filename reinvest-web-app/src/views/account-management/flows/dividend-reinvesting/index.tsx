import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowDividendReinvesting } from './flow';

export const FLOW_DIVIDEND_REINVESTING: SubFlow = {
  identifier: FlowIdentifiers.DIVIDEND_REINVESTING,
  flow: <FlowDividendReinvesting />,
};
