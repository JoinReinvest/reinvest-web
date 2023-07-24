import { ConfirmationView } from 'components/ConfirmationView';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Your beneficiary name has been updated';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._hasSucceded];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    };

    return (
      <ConfirmationView
        onSubmit={onSubmit}
        title={TITLE}
        buttonLabel={BUTTON_LABEL}
      />
    );
  },
};
