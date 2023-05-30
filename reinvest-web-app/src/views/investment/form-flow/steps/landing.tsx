import { IconSpinner } from 'assets/icons/IconSpinner';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

export const StepLanding: StepParams<FlowFields> = {
  identifier: Identifiers.LANDING,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    useEffect(() => {
      moveToNextStep();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
