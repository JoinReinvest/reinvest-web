import { IconSpinner } from 'assets/icons/IconSpinner';
import { useActiveAccountConfiguration } from 'providers/ActiveAccountConfigurationProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { activeAccountConfigurationMeta } = useActiveAccountConfiguration();

    useEffect(() => {
      if (activeAccountConfigurationMeta.isSuccess) {
        moveToNextStep();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeAccountConfigurationMeta.isSuccess]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
