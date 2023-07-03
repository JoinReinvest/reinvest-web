import { StatementType } from 'reinvest-app-common/src/types/graphql';

import { CompanyTickerSymbol, Compliances } from '../../../../views/onboarding/form-flow/form-fields';

export interface FlowFields {
  _hasSucceded?: boolean;
  companyTickerSymbols?: CompanyTickerSymbol[];
  compliances?: Compliances;
  finraInstitutionName?: string;
  seniorPoliticalFigure?: string;
  statementTypes?: StatementType[];
}
