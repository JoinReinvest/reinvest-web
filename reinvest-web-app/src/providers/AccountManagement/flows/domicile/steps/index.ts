import { StepConfirmation } from './confirmation';
import { StepCurrentDomicile } from './current-domicile';
import { StepDomicileGreenCard } from './domicile-green-card';
import { StepDomicileType } from './domicile-type';
import { StepDomicileVisa } from './domicile-visa';
import { StepLoading } from './loading';

export const STEPS = [StepLoading, StepCurrentDomicile, StepDomicileType, StepDomicileGreenCard, StepDomicileVisa, StepConfirmation];
