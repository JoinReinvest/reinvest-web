import { StepAutomaticDividend } from './automatic-dividend';
import { StepInitialInvestment } from './initial-investment';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepRecurringDepositSchedule } from './recurring-deposit-schedule';
import { StepRecurringInvestment } from './recurring-investment';
import { StepRecurringInvestmentAmount } from './recurring-investment-amount';
import { StepRecurringInvestmentDate } from './recurring-investment-date';
import { StepRecurringInvestmentInterval } from './recurring-investment-interval';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepInitialInvestment,

  StepRecurringInvestment,
  StepRecurringInvestmentAmount,
  StepRecurringInvestmentInterval,
  StepRecurringInvestmentDate,
  StepRecurringDepositSchedule,

  StepAutomaticDividend,
  StepSubscriptionAgreements,
  StepInvestmentVerification,
  StepInvestmentCompleted,
];
