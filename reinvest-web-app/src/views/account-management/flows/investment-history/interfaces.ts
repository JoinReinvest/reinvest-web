import { Scalars, Usd } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _cancelledInvestmentDetails?: {
    amountFormatted: string;
    tradeId: string;
  };
  _investments?: InvestmentOverview[];
  _selectedInvesmentId?: string;
  _willCancelInvestment?: boolean;
}

// TO-DO: Deprecate once GraphQL types are generated
// with the API state from the DEV environment.
export interface InvestmentOverview {
  amount: Usd;
  createdAt: Scalars['ISODateTime'];
  id: Scalars['ID'];
  tradeId: Scalars['String'];
}
