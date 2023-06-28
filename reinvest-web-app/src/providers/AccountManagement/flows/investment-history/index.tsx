import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowInvestmentHistory } from './flow';

export const FLOW_INVESTMENT_HISTORY: SubFlow = {
  identifier: FlowIdentifiers.INVESTMENT_HISTORY,
  flow: <FlowInvestmentHistory />,
  selfManagesModal: true,
};
