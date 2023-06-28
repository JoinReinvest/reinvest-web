import { InvestmentOverview, Maybe } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _cancelledInvestmentDetails?: {
    amountFormatted: string;
    tradeId: string;
  };
  _investments?: Maybe<InvestmentOverview>[];
  _selectedInvesmentId?: string;
  _userArrivedFromManageAccount?: boolean;
  _willCancelInvestment?: boolean;
}
