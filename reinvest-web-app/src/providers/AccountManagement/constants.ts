import { FlowIdentifiers, QueryFlowIdentifiers } from './enums';

export const QUERY_FLOW_IDENTIFIER_VALUES = Object.values(QueryFlowIdentifiers);

export const QUERY_MANAGED_FLOWS = new Map<QueryFlowIdentifiers, FlowIdentifiers>([
  [QueryFlowIdentifiers.MANAGE_BANK_ACCOUNT, FlowIdentifiers.BANK_ACCOUNT],
  [QueryFlowIdentifiers.MANAGE_PASSWORD, FlowIdentifiers.CHANGE_PASSWORD],
  [QueryFlowIdentifiers.MANAGE_INVESTMENT, FlowIdentifiers.INVESTMENT_HISTORY],
  [QueryFlowIdentifiers.MANAGE_RECURRING_INVESTMENT, FlowIdentifiers.RECURRING_INVESTMENTS],
]);
