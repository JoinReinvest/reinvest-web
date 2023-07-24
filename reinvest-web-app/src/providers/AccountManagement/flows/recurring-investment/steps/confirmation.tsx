import { ConfirmationView } from 'components/ConfirmationView';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE_CANCEL = 'Your recurring investments are canceled';
const TITLE_REINSTATE = 'Your transaction is reinstated';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._action !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { onModalOpenChange } = useAccountManagement();

    const action = storeFields?._action;
    const hadCancelledRecurringInvestment = action === 'cancel';
    const title = hadCancelledRecurringInvestment ? TITLE_CANCEL : TITLE_REINSTATE;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      onModalOpenChange(false);
    };

    return (
      <ConfirmationView
        onSubmit={onSubmit}
        title={title}
        buttonLabel={BUTTON_LABEL}
      />
    );
  },
};
