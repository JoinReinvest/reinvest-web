import { StepAccountType } from './account-type';
import { StepFullName } from './full-name';
import { StepProfilePicture } from './profile-picture';
import { StepResidencyGreenCard } from './residency-green-card';
import { StepResidencyStatus } from './residency-status';
import { StepResidencyVisa } from './residency-visa';

export const FLOW_STEPS = [StepAccountType, StepFullName, StepResidencyStatus, StepResidencyGreenCard, StepResidencyVisa, StepProfilePicture];
