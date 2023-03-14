import { StepAuthenticationCode } from './authentication-code';
import { StepEmail } from './email';
import { StepPassword } from './password';
import { StepResetValidation } from './reset-validation';

export const FLOW_STEPS = [StepEmail, StepAuthenticationCode, StepPassword, StepResetValidation];
