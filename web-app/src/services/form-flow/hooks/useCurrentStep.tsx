import { FC, useEffect, useMemo, useState } from 'react';

import { CurrentFormStep } from '../interfaces';
import { FlowStore } from '../flow-store';
import { useCurrentStepMeta } from './useCurrentStepMeta';
import { useFields } from './useFields';

type UseFieldsWithStorageParams<FormFields> = ReturnType<typeof useFields<FormFields>>;

interface Params<FormFields> extends UseFieldsWithStorageParams<FormFields> {
  flowStore: FlowStore<FormFields>;
  isFormFlowResumable: boolean;
}

export function useCurrentStep<FormFields>({ flowStore, getFields, updateFields, isFormFlowResumable }: Params<FormFields>) {
  const [currentStep, setCurrentStep] = useState<CurrentFormStep<FormFields>>(null);

  const CurrentStepView = useMemo<FC>(() => {
    const Component = currentStep?.Component;

    if (Component) {
      return () => (
        <Component
          storeFields={getFields()}
          updateStoreFields={updateFields}
          moveToNextStep={moveToNextValidStep}
        />
      );
    }

    return () => <></>;
  }, [currentStep, getFields, updateFields]);

  const meta = useCurrentStepMeta({ flowStore, currentStep });

  useEffect(() => {
    const initialStep = isFormFlowResumable ? flowStore.getLastIncompleteStep(getFields()) : flowStore.getHead();

    setCurrentStep(initialStep);
  }, [getFields, isFormFlowResumable, flowStore]);

  const moveToNextValidStep = () => {
    const nextStep = flowStore.getNextValidStep(currentStep, getFields());

    setCurrentStep(nextStep);
  };

  const moveToPreviousValidStep = () => {
    const previousStep = flowStore.getPreviousValidStep(currentStep, getFields());

    setCurrentStep(previousStep);
  };

  return {
    currentStep,
    meta,
    CurrentStepView,
    moveToNextValidStep,
    moveToPreviousValidStep,
  };
}
