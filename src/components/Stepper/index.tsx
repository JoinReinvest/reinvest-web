import { Step } from './Step';

export interface StepperProps {
  steps: string[];
  currentIndex?: number;
}

export const Stepper = ({ steps, currentIndex = 0 }: StepperProps) => {
  const lastStepIndex = steps.length - 1;

  return (
    <div className="mb-20 p-5">
      <div className="mx-4 p-4">
        <div className="flex items-center">
          {steps.map((label, index) => (
            <Step
              key={label}
              label={label}
              stepIndex={index}
              currentIndex={currentIndex}
              lastIndex={lastStepIndex}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
