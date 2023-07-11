import { StepConfirmation } from './confirmation';
import { StepCurrentRecurringInvestment } from './current-recurring-investment';
import { StepLoading } from './loading';
import { StepNoRecurringInvestment } from './no-recurring-investment';

export const STEPS = [StepLoading, StepCurrentRecurringInvestment, StepConfirmation, StepNoRecurringInvestment];
