import { InvestmentSummary } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _hasSuccessfullyApprovedFees?: boolean;
  _willApproveFees?: boolean;
  investment?: InvestmentSummary | null;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  FEES_DETAILS = 'FEES_DETAILS',
  CONFIRMATION = 'CONFIRMATION',
}
