import { StepAuthenticationCode } from './authentication-code';
import { StepConfirmation } from './confirmation';
import { StepCurrentEmailAddress } from './current-email-address';
import { StepNewEmailAddress } from './new-email-address';

export const STEPS = [StepCurrentEmailAddress, StepNewEmailAddress, StepAuthenticationCode, StepConfirmation];
