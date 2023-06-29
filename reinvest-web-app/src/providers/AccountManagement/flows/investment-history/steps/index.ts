import { StepCancelledInvestment } from './cancelled-investment';
import { StepInvestmentHistory } from './investment-history';
import { StepInvestmentSummary } from './investment-summary';
import { StepLoading } from './loading';

export const STEPS = [StepLoading, StepInvestmentHistory, StepInvestmentSummary, StepCancelledInvestment];
