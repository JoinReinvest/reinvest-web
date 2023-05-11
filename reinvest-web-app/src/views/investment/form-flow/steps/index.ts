import { StepInvestmentVerification } from 'views/initial-investment/form-flow/steps/investment-verification';

import { StepAccountSelection } from './account-selection';
import { StepInvestmentAgreements } from './investment-agreements';
import { StepInvestmentAmount } from './investment-amount';
import { StepInvestmentCompleted } from './investment-confirmation';
import { StepOptInAutomaticDividendReinvestment } from './opt-in-automatic-dividend-reinvestment';
import { StepRecurringDepositSchedule } from './recurring-deposit-schedule';
import { StepRecurringInvestment } from './recurring-investment';
import { StepRecurringInvestmentAmount } from './recurring-investment-amount';
import { StepRecurringInvestmentDate } from './recurring-investment-date';
import { StepRecurringInvestmentInterval } from './recurring-investment-interval';
import { StepSubscriptionAgreement } from './subscription-agreement';

export const STEPS = [
  StepAccountSelection,
  StepInvestmentAmount,
  StepOptInAutomaticDividendReinvestment,

  StepRecurringInvestment,
  StepRecurringInvestmentAmount,
  StepRecurringInvestmentInterval,
  StepRecurringInvestmentDate,
  StepRecurringDepositSchedule,

  StepSubscriptionAgreement,
  StepInvestmentAgreements,
  StepInvestmentVerification,
  StepInvestmentCompleted,
];
