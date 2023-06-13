import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowInvestmentHistory } from './flow';

export const FLOW_INVESTMENT_HISTORY: SubFlow = {
  identifier: FlowIdentifiers.INVESTMENT_HISTORY,
  flow: <FlowInvestmentHistory />,
  selfManagesModal: true,
};
