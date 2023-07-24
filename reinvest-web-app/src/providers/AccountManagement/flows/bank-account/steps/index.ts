import { StepBankAccountSelection } from './bank-account-selection';
import { StepConfirmation } from './confirmation';
import { StepCurrentBankAccount } from './current-bank-account';
import { StepDisclaimer } from './disclaimer';
import { StepLoading } from './loading';

export const STEPS = [StepLoading, StepCurrentBankAccount, StepDisclaimer, StepBankAccountSelection, StepConfirmation];
