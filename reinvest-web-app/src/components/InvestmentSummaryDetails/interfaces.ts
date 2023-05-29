import { InvestmentSummary, Maybe } from 'reinvest-app-common/src/types/graphql';

export interface Props {
  investment: Maybe<InvestmentSummary>;
}

export type Details = Detail[];

export interface Detail {
  label: string;
  value: string;
}
