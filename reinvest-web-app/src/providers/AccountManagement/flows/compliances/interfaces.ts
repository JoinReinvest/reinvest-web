import { CompanyTickerSymbol, Compliances } from 'views/onboarding/form-flow/form-fields';

export interface FlowFields {
  _hasSucceded?: boolean;
  companyTickerSymbols?: CompanyTickerSymbol[];
  compliances?: Compliances;
  finraInstitutionName?: string;
  seniorPoliticalFigure?: string;
}

export enum FlowStepIdentifiers {
  LOADING = 'LOADING',
  CURRENT_COMPLIANCE = 'CURRENT_COMPLIANCE',
  NEW_COMPLIANCE = 'NEW_COMPLIANCE',
  FINRA_INSTITUTION = 'FINRA_INSTITUTION',
  COMPANY_TICKER_SYMBOLS = 'COMPANY_TICKER_SYMBOLS',
  SENIOR_POLITICAL_FIGURES = 'SENIOR_POLITICAL_FIGURES',
  UPDATE = 'UPDATE',
  CONFIRMATION = 'CONFIRMATION',
}
