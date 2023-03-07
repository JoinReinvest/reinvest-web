import { StepFullName } from './full-name';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';

export const FLOW_STEPS = [StepFullName, StepResidencyStatus, StepResidencyGreenCard, StepResidencyVisa];
