import { useMemo } from 'react';

import { FlowStep } from '../flow-step';
import { FlowStore } from '../flow-store';
import { ContextStateMeta, CurrentFormStep } from '../interfaces';

interface Params<FormFields> {
  currentStep: CurrentFormStep<FormFields>;
  flowStore: FlowStore<FormFields>;
}

export const useCurrentStepMeta = <FormFields>({ flowStore, currentStep }: Params<FormFields>) => {
  const { isFirstStep, isLastStep } = useMemo<ContextStateMeta>(() => {
    const flowHead: FlowStep<FormFields> | null = flowStore.getHead();
    const flowTail: FlowStep<FormFields> | null = flowStore.getTail();

    const isFirstStep = currentStep?.index === flowHead?.index;
    const isLastStep = currentStep?.index === flowTail?.index;

    return { isFirstStep, isLastStep };
  }, [currentStep]);

  return { isFirstStep, isLastStep };
};
