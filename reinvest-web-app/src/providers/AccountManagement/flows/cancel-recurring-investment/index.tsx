import { FlowIdentifiers } from '../../enums';
import { SubFlow } from '../../interfaces';
import { FlowCancelRecurringInvestment } from './flow';

export const FLOW_CANCEL_RECURRING_INVESTMENT: SubFlow = {
  identifier: FlowIdentifiers.RECURRING_INVESTMENTS,
  flow: <FlowCancelRecurringInvestment />,
};
