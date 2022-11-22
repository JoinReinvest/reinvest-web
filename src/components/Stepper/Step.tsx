import cx from 'classnames';

import { Dot } from './Dot';
import { Line } from './Line';

interface StepProps {
  currentIndex: number;
  label: string;
  lastIndex: number;
  stepIndex: number;
}

export const Step = ({ label, stepIndex, currentIndex, lastIndex }: StepProps) => {
  const hasPassed = stepIndex <= currentIndex;
  const isActive = stepIndex === currentIndex;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === lastIndex;
  const isBeforeCurrentIndex = stepIndex < currentIndex;

  return (
    <>
      <div className="flex flex-col items-center text-black relative">
        <Dot
          isFilled={hasPassed}
          size={isActive ? 'lg' : 'sm'}
        />
        <div
          className={cx({
            'absolute top-0 mt-16 text-12 whitespace-nowrap': true,
            'left-0 text-left': isFirstStep,
            'right-0 text-right': isLastStep,
          })}
        >
          <span>{label}</span>
        </div>
      </div>

      {!isLastStep && <Line isFilled={isBeforeCurrentIndex} />}
    </>
  );
};
