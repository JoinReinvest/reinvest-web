import { FC, useEffect, useMemo, useState } from 'react';

import { CurrentFormStep } from '../interfaces';
import { FlowStore } from '../services/flow-store';
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
      const fields = getFields();

      return () => (
        <Component
          storeFields={fields}
          updateStoreFields={updateFields}
          moveToNextStep={moveToNextValidStep}
        />
      );
    }

    return () => <></>;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  const meta = useCurrentStepMeta({ flowStore, currentStep });

  useEffect(() => {
    const fields = getFields();
    const initialStep = isFormFlowResumable ? flowStore.getLastIncompleteStep(fields) : flowStore.getHead();

    setCurrentStep(initialStep);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveToNextValidStep = () => {
    const fields = getFields();
    const nextStep = flowStore.getNextValidStep(currentStep, fields);

    setCurrentStep(nextStep);
  };

  const moveToPreviousValidStep = () => {
    const fields = getFields();
    const previousStep = flowStore.getPreviousValidStep(currentStep, fields);

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
