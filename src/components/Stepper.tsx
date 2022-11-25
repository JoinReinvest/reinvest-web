import { Stepper as PrimitiveStepper, StepperProps } from '@hookooekoo/ui-stepper';

export const Stepper = ({ steps, currentIndex = 0 }: StepperProps) => (
  <PrimitiveStepper
    steps={steps}
    currentIndex={currentIndex}
  />
);
