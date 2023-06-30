import { StepConfirmation } from './confirmation';
import { StepDomicileGreenCard } from './domicile-green-card';
import { StepDomicileType } from './domicile-type';
import { StepDomicileVisa } from './domicile-visa';
import { StepLoading } from './loading';

export const STEPS = [StepLoading, StepDomicileType, StepDomicileGreenCard, StepDomicileVisa, StepConfirmation];
