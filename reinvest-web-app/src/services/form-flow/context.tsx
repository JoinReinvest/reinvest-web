import { createContext } from 'react';

import { ContextState } from './interfaces';

export const Context = createContext<ContextState>({
  CurrentStepView: () => <></>,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  moveToPreviousValidStep: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  moveToNextValidStep: () => {},
  progressPercentage: 0,
  meta: {
    previousStepIdentifier: null,
    currentStepIdentifier: null,
    nextStepIdentifier: null,
    isFirstStep: true,
    isLastStep: false,
  },
});
