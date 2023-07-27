import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { DialogSubscriptionAgreement } from 'components/DialogSubscriptionAgreement';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { CheckboxLabeled } from 'components/FormElements/CheckboxLabeled';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

const TITLE = 'Withdrawal Request Agreement';
const SUBTITLE = 'Please review and approve below agreementto process your request';
const FIELD_LABEL = 'Withdrawal Request Agreement';
const BUTTON_LABEL = 'Continue';

type Fields = Pick<FlowFields, 'agreesToSubscriptionAgreement'>;

const SCHEMA: Schema<Fields> = z.object({
  agreesToSubscriptionAgreement: z.boolean().superRefine((value, context) => {
    if (!value) {
      context.addIssue({ code: 'custom' });
    }
  }),
});

export const StepSubscriptionAgreement: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.SUBSCRIPTION_AGREEMENT,

  doesMeetConditionFields: fields => !!fields._canWithdrawFunds,

  Component: ({ moveToPreviousStep, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { subscriptionAgreement, signAgreement, signAgreementMeta, initiateFundsWithdrawal, initiateFundsWithdrawalMeta } = useFundsWithdrawalManager();
    const { control, formState, handleSubmit } = useForm<Fields>({ mode: 'onChange', resolver: zodResolver(SCHEMA) });
    const [isDialogOpen, toggleIsDialogOpen] = useToggler();

    useEffect(() => {
      if (signAgreementMeta?.isSuccess && initiateFundsWithdrawalMeta.isSuccess) {
        moveToNextStep();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signAgreementMeta?.isSuccess, initiateFundsWithdrawalMeta.isSuccess]);

    const shouldButtonBeLoading = signAgreementMeta?.isLoading || initiateFundsWithdrawalMeta?.isLoading || formState.isSubmitting;
    const shouldButtonBeDisabled = shouldButtonBeLoading || !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async () => {
      await signAgreement();
      await initiateFundsWithdrawal();
    };

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent willLeaveContentOnTop>
            <div className="flex flex-col gap-36">
              <ButtonBack
                onClick={onButtonBackClick}
                disabled={shouldButtonBeLoading}
              />

              <Typography variant="h5">{TITLE}</Typography>
            </div>

            <Typography variant="paragraph-emphasized">{SUBTITLE}</Typography>

            <CheckboxLabeled
              name="agreesToSubscriptionAgreement"
              control={control}
              labelAsButtonLink
              onButtonLinkClick={toggleIsDialogOpen}
            >
              {FIELD_LABEL}
            </CheckboxLabeled>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label={BUTTON_LABEL}
              loading={shouldButtonBeLoading}
              disabled={shouldButtonBeDisabled}
            />
          </ButtonStack>
        </Form>

        {subscriptionAgreement && (
          <DialogSubscriptionAgreement
            isModalOpen={isDialogOpen}
            onModalOpenChange={toggleIsDialogOpen}
            subscriptionAgreement={subscriptionAgreement}
          />
        )}
      </>
    );
  },
};
