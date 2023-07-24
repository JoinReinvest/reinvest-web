import { StepConfirmation } from './confirmation';
import { StepCurrentDetails } from './current-details';
import { StepEmploymentDetails } from './employment-details';
import { StepEmploymentStatus } from './employment-status';
import { StepLoading } from './loading';

export const STEPS = [StepLoading, StepCurrentDetails, StepEmploymentStatus, StepEmploymentDetails, StepConfirmation];
