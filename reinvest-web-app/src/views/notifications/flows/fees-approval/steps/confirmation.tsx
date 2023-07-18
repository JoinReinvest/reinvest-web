import { ConfirmationView } from 'components/ConfirmationView';
import { useNotifications } from 'providers/Notifications';
import { FormEventHandler, useEffect } from 'react';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';
import { useModalManagerContext } from 'views/notifications/providers/modal-manager';

import { useFlow } from '../flow';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'The investment fees has been approved';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  doesMeetConditionFields: fields => !!fields._hasSuccessfullyApprovedFees && !!fields.investment,

  Component: () => {
    const { resetStoreFields, moveToFirstStep } = useFlow();
    const { markAsRead, notificationsMeta } = useNotifications();
    const { onModalOpenChange } = useModalManagerContext();
    const { updateCurrentFlow, notification } = useFlowsManagerContext();

    useEffect(() => {
      async function markNotificationAsRead() {
        if (notification?.id) {
          await markAsRead({ notificationId: notification.id });
        }
      }

      markNotificationAsRead();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      updateCurrentFlow({ identifier: null });
      onModalOpenChange(false);

      notificationsMeta.refetch();
      await resetStoreFields();
      moveToFirstStep();
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
