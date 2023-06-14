import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetAccountStats } from 'reinvest-app-common/src/services/queries/getAccountStats';

import { IconWarning } from '../../../../../assets/icons/IconWarning';
import { InvestmentInformation } from '../../../../../components/InvestmentInformation';
import { useActiveAccount } from '../../../../../providers/ActiveAccountProvider';
import { getApiClient } from '../../../../../services/getApiClient';
import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Beneficiary Account Removed';
const BUTTON_LABEL = 'Dashboard';
const INVESTMENT_INFORMATION_LABEL = 'Account Value';
const INFORMATION_MESSAGE = 'Updated Individual Account Value.';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._hasSucceded !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { activeAccount } = useActiveAccount();
    const { data } = useGetAccountStats(getApiClient, { accountId: activeAccount?.id || '' });

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col items-center gap-40">
            <Typography
              variant="h3"
              className="text-center md:text-left"
            >
              {TITLE}
            </Typography>
            {data?.accountValue && (
              <InvestmentInformation
                label={INVESTMENT_INFORMATION_LABEL}
                amount={data?.accountValue}
                type="one-time"
              />
            )}
          </div>
          <div className="mt-32 flex gap-8">
            <IconWarning className="stroke-gray-01" />
            <Typography
              variant="paragraph"
              className="grow text-gray-01"
            >
              {INFORMATION_MESSAGE}
            </Typography>
          </div>
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
