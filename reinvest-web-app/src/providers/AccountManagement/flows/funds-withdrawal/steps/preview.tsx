import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { AccountValuePreview } from '../components/AccountValuePreview';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

const DISCLAIMER = [
  `REINVEST users can only request to withdraw funds that are no longer within the (30) day grace period.
  You can only withdraw your all eligible funds with REINVEST at once. REINVEST does not permit partial withdrawals of eligible funds.`,
  'Would you like to request fund withdrawal?',
];
const BUTTON_LABEL = 'Request Fund Withdrawal';

export const StepPreview: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.PREVIEW,

  doesMeetConditionFields: fields => !!fields._canWithdrawFunds,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const { simulationMeta, abortRequest } = useFundsWithdrawalManager();

    if (simulationMeta?.isLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />
        </div>
      );
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      moveToNextStep();
    }

    async function onButtonBackClick() {
      await abortRequest();
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          <AccountValuePreview />

          {DISCLAIMER.map((text, index) => (
            <Typography
              variant="paragraph-large"
              key={index}
            >
              {text}
            </Typography>
          ))}
        </FormContent>

        <ButtonStack>
          <Button
            variant="error"
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
