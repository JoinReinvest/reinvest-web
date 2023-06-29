import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowDividendReinvesting } from './flow';

export const FLOW_DIVIDEND_REINVESTING: SubFlow = {
  identifier: FlowIdentifiers.DIVIDEND_REINVESTING,
  flow: <FlowDividendReinvesting />,
};
