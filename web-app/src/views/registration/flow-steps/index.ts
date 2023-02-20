import { StepAuthenticationCode } from './authentication-code';
import { StepEmail } from './email';
import { StepPassword } from './password';
import { StepReferralCode } from './referral-code';
import { StepReferralCodeApplied } from './referral-code-applied';
import { StepRegistrationValidation } from './registration-validation';

export const FLOW_STEPS = [
  StepEmail,
  StepReferralCode,
  StepReferralCodeApplied,
  StepPassword,
  StepPassword,
  StepAuthenticationCode,
  StepRegistrationValidation,
];
