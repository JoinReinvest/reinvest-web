import { useMemo } from 'react';

import { ContextStateMeta, CurrentFormStep } from '../interfaces';
import { FlowStore } from '../services/flow-store';

interface Params<FormFields> {
  currentStep: CurrentFormStep<FormFields>;
  flowStore: FlowStore<FormFields>;
}

export const useCurrentStepMeta = <FormFields>({ flowStore, currentStep }: Params<FormFields>) => {
  const { isFirstStep, isLastStep } = useMemo<ContextStateMeta>(() => {
    const flowHead = flowStore.getHead();
    const flowTail = flowStore.getTail();

    const isFirstStep = currentStep?.index === flowHead?.index;
    const isLastStep = currentStep?.index === flowTail?.index;

    return { isFirstStep, isLastStep };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  return { isFirstStep, isLastStep };
};
