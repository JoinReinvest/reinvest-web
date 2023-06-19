import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetActiveRecurringInvestment } from 'reinvest-app-common/src/services/queries/getActiveRecurringInvestment';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';

import { IconBank } from '../../../../../assets/icons/IconBank';
import { ButtonBack } from '../../../../../components/ButtonBack';
import { Separator } from '../../../../../components/Separator';
import { Typography } from '../../../../../components/Typography';
import { useActiveAccount } from '../../../../../providers/ActiveAccountProvider';
import { getApiClient } from '../../../../../services/getApiClient';
import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Cancel Transaction';
const TITLE = 'Recurring Investment';

export const StepCurrentRecurringInvestment: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_RECURRING_INVESTMENT,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { data: bankAccount, isLoading: isBankAccountLoading } = useReadBankAccount(getApiClient, { accountId: activeAccount?.id ?? '' });
    const { data, isLoading } = useGetActiveRecurringInvestment(getApiClient, { accountId: activeAccount?.id ?? '' });
    const { handleSubmit, formState } = useForm({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useFlowsManager();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading || isBankAccountLoading;
    const onSubmit = async () => {
      await updateStoreFields({ _hasSucceded: true });
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-24">
            <Typography variant="h5">{TITLE}</Typography>
            <Typography
              variant="h6"
              className="text-gray-02"
            >
              From
            </Typography>
            <div className="flex items-center gap-16">
              <IconBank />
              <Typography variant="paragraph-emphasized">
                {bankAccount?.bankName} {bankAccount?.accountNumber}
              </Typography>
            </div>
            <div className="flex flex-col gap-16">
              <div className="flex justify-between">
                <Typography variant="paragraph-emphasized-regular">Frequency</Typography>
                <Typography variant="paragraph-emphasized">{data?.schedule.frequency}</Typography>
              </div>
              <Separator />
              <div className="flex justify-between">
                <Typography variant="paragraph-emphasized-regular">Amount</Typography>
                <Typography variant="paragraph-emphasized">{data?.amount.formatted}</Typography>
              </div>
              <Separator />
              <div className="flex justify-between">
                <Typography variant="paragraph-emphasized-regular">Status</Typography>
                <Typography
                  variant="paragraph-emphasized"
                  className="text-tertiary-success"
                >
                  {data?.status}
                </Typography>
              </div>
            </div>
          </div>
        </FormContent>
        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
            variant="outlined-red"
          />
        </ButtonStack>
      </Form>
    );
  },
};
