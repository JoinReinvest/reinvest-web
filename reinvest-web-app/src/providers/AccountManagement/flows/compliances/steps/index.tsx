import { StepCompanyTickerSymbols } from './company-ticker-symbols';
import { StepConfirmation } from './confirmation';
import { StepCurrentCompliance } from './current-compliance';
import { StepFinraInstitution } from './finra-institution';
import { StepLoading } from './loading';
import { StepSelectCompliance } from './select-compliance';
import { StepSeniorPoliticalFigure } from './senior-political-figure';
import { StepUpdate } from './update';

export const STEPS = [
  StepLoading,
  StepCurrentCompliance,
  StepSelectCompliance,
  StepFinraInstitution,
  StepCompanyTickerSymbols,
  StepSeniorPoliticalFigure,
  StepUpdate,
  StepConfirmation,
];
