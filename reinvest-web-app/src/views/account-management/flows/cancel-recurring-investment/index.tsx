import { FlowIdentifiers } from '../../enums/flow';
import { SubFlow } from '../../interfaces/flows';
import { FlowCancelRecurringInvestment } from './flow';

export const FLOW_CANCEL_RECURRING_INVESTMENT: SubFlow = {
  identifier: FlowIdentifiers.RECURRING_INVESTMENTS,
  flow: <FlowCancelRecurringInvestment />,
};
