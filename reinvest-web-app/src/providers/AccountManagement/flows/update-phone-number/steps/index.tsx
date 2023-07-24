import { StepAuthenticationCode } from './authentication-code';
import { StepConfirmation } from './confirmation';
import { StepCurrentPhoneNumber } from './current-phone_number';
import { StepLoading } from './loading';
import { StepNewPhoneNumber } from './new-phone-number';

export const STEPS = [StepLoading, StepCurrentPhoneNumber, StepNewPhoneNumber, StepAuthenticationCode, StepConfirmation];
