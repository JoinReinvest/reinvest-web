import { ConfirmationView } from 'components/ConfirmationView';
import { useAccountManagement } from 'providers/AccountManagement';
import { useUserProfile } from 'providers/UserProfile';
import { FormEvent } from 'react';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Your domicile has been updated';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  Component: () => {
    const { updateUserProfileMeta } = useUserProfile();
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      updateUserProfileMeta.reset();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    }

    return (
      <ConfirmationView
        onSubmit={onSubmit}
        title={TITLE}
        buttonLabel={BUTTON_LABEL}
      />
    );
  },
};
