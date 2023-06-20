import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { TextArea } from 'components/FormElements/TextArea';
import { Typography } from 'components/Typography';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

const TITLE = 'Why are you requesting to withdraw funds?';
const FIELD_PLACEHOLDER = 'Reason';
const BUTTON_LABEL = 'Continue';

interface Fields {
  reason: string;
}

const SCHEMA: Schema<Fields> = z.object({
  reason: z.string().trim().min(1),
});

export const StepReason: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.REASON,

  Component: ({ storeFields, moveToPreviousStep, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { createRequestDraft, createRequestDraftMeta, subscriptionAgreement, createAgreement, createdAgreementMeta } = useFundsWithdrawalManager();
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(SCHEMA),
      defaultValues: { reason: storeFields?.reasonForRequest },
    });

    useEffect(() => {
      if (createdAgreementMeta.isSuccess) {
        createdAgreementMeta.reset();
        moveToNextStep();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createdAgreementMeta.isSuccess]);

    useEffect(() => {
      async function initializeAgreement() {
        if (createRequestDraftMeta.isSuccess) {
          if (subscriptionAgreement) {
            createdAgreementMeta.reset();
            moveToNextStep();
          }

          if (!subscriptionAgreement) {
            await createAgreement();
          }
        }
      }

      initializeAgreement();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [createRequestDraftMeta.isSuccess]);

    const shouldButtonBeLoading = formState.isLoading || createRequestDraftMeta.isLoading;
    const shouldButtonBeDisabled = shouldButtonBeLoading || !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async ({ reason }) => {
      await updateStoreFields({ reasonForRequest: reason });
      await createRequestDraft({ reason });
    };

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col gap-36">
            <ButtonBack
              onClick={onButtonBackClick}
              disabled={shouldButtonBeLoading}
            />

            <Typography variant="h5">{TITLE}</Typography>
          </div>

          <TextArea
            name="reason"
            control={control}
            placeholder={FIELD_PLACEHOLDER}
            required
          />
        </FormContent>

        <ButtonStack>
          <Button
            variant="error"
            type="submit"
            label={BUTTON_LABEL}
            loading={shouldButtonBeLoading}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
