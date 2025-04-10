import { ConfirmationView } from 'components/ConfirmationView';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useAuth } from '../../../../AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Your email is updated';
const BUTTON_LABEL = 'Relogin';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._hasSucceded !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();
    const { actions } = useAuth();

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
      await actions.signOut();
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
