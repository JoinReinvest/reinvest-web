import { StepAutomaticDividend } from './automatic-dividend';
import { StepBankSelection } from './bank-selection';
import { StepConfirmation } from './confirmation';
import { StepInitialInvestment } from './initial-investment';
import { StepInvestmentCompleted } from './investment-completed';
import { StepInvestmentVerification } from './investment-verification';
import { StepLanding } from './landing';
import { StepRecurringDepositSchedule } from './recurring-deposit-schedule';
import { StepRecurringInvestment } from './recurring-investment';
import { StepRecurringInvestmentAmount } from './recurring-investment-amount';
import { StepRecurringInvestmentDate } from './recurring-investment-date';
import { StepRecurringInvestmentInterval } from './recurring-investment-interval';
import { StepSubscriptionAgreements } from './subscription-agreements';

export const STEPS = [
  StepLanding,
  StepBankSelection,
  StepConfirmation,
  StepInitialInvestment,
  StepAutomaticDividend,

  StepRecurringInvestment,
  StepRecurringInvestment,
  StepRecurringInvestmentAmount,
  StepRecurringInvestmentInterval,
  StepRecurringInvestmentDate,
  StepRecurringDepositSchedule,

  StepSubscriptionAgreements,
  StepInvestmentVerification,
  StepInvestmentCompleted,
];
