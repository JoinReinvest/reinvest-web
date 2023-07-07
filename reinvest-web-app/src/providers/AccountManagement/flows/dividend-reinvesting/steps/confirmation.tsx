import { ConfirmationView } from 'components/ConfirmationView';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE_OPT_IN = 'You have opted-in for automatic dividend reinvesting.';
const TITLE_OPT_OUT = 'You have opted-out for automatic dividend reinvesting.';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();

    const hadOptedIn = !!storeFields?.willOptIn;
    const title = hadOptedIn ? TITLE_OPT_IN : TITLE_OPT_OUT;

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    }

    return (
      <ConfirmationView
        title={title}
        buttonLabel={BUTTON_LABEL}
        onSubmit={onSubmit}
      />
    );
  },
};
