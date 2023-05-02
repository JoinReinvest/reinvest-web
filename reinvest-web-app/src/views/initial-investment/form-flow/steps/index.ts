import { StepAutomaticDividend } from './automatic-dividend';
import { StepInitialInvestment } from './initial-investment';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepRecurringInvestment } from './recurring-investment';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepInitialInvestment,
  StepRecurringInvestment,
  StepAutomaticDividend,
  StepSubscriptionAgreements,
  StepInvestmentVerification,
  StepInvestmentCompleted,
];
