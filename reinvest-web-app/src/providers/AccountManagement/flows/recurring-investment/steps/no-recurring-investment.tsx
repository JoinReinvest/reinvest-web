import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { FormEvent } from 'react';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useAddRecurringInvestmentModal } from '../providers/AddRecurringInvestmentModal';

const TITLE = "You don't have a scheduled investment";
const BUTTON_LABEL = 'Invest';

export const StepNoRecurringInvestment: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NO_RECURRING_INVESTMENT,

  doesMeetConditionFields: fields => {
    return !fields.activeRecurringInvestment?.id;
  },

  Component: () => {
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const { activeRecurringInvestmentMeta } = useRecurringInvestment();
    const { onModalOpenChange } = useAddRecurringInvestmentModal();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      onModalOpenChange(true);
      activeRecurringInvestmentMeta.remove();
    }

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          <Typography variant="h6">{TITLE}</Typography>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
