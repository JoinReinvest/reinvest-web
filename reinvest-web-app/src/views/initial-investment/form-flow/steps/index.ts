import { StepFullName } from '../../../onboarding/form-flow/steps/full-name';
import { StepAutomaticDividend } from './automatic-dividend';
import { StepBankSelection } from './bank-selection';
import { StepConfirmation } from './confirmation';
import { StepInitialInvestment } from './initial-investment';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepLanding } from './landing';
import { StepRecurringInvestment } from './recurring-investment';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepLanding,
  StepBankSelection,
  StepConfirmation,
  StepInitialInvestment,
  StepRecurringInvestment,
  StepAutomaticDividend,
  StepSubscriptionAgreements,
  StepInvestmentVerification,
  StepInvestmentCompleted,
  StepFullName,
];
