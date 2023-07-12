import { InvestmentStatus } from 'reinvest-app-common/src/types/graphql';

export const INVESTMENT_STATUS_THAT_ALLOW_CANCELLATION: InvestmentStatus[] = [InvestmentStatus.InProgress, InvestmentStatus.Funded];
