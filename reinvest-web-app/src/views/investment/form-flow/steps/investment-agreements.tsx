import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { DialogSubscriptionAgreement } from 'components/DialogSubscriptionAgreement';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { CheckboxLabeled } from 'components/FormElements/CheckboxLabeled';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { useToggler } from 'hooks/toggler';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/createSubscriptionAgreement';
import { useSignSubscriptionAgreement } from 'reinvest-app-common/src/services/queries/signSubscriptionAgreement';
import { getApiClient } from 'services/getApiClient';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'agreesToOneTimeInvestment' | 'agreesToRecurringInvestment'>;

const getSchema = ({ _shouldAgreeToRecurringInvestment }: FlowFields): Schema<Fields> => {
  return z
    .object({
      agreesToOneTimeInvestment: z.boolean(),
      agreesToRecurringInvestment: z.boolean(),
    })
    .superRefine((fields, context) => {
      const shouldHaveAgreedToOneTimeStatement = !!fields.agreesToOneTimeInvestment;
      const shouldHaveAgreedToRecurringStatement = _shouldAgreeToRecurringInvestment && !!fields.agreesToRecurringInvestment;

      if (shouldHaveAgreedToOneTimeStatement === false || shouldHaveAgreedToRecurringStatement === false) {
        context.addIssue({ code: 'custom' });
      }
    });
};

const TITLE = 'Approve subscription agreements';
const SUBTITLE = 'I have read through the selected documents referenced below:';
const LABEL_AGREEMENT_ONE_TIME = 'One Time Investment Agreement';
const LABEL_AGREEMENT_RECURRING = 'Recurring Investment Agreement';

export const StepInvestmentAgreements: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_AGREEMENTS,

  doesMeetConditionFields: fields => {
    const requiredFields = [!!fields._selectedAccount, !!fields.investmentAmount];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { subscriptionRecurringInvestmentAgreement, signRecurringInvestmentSubscriptionAgreement } = useRecurringInvestment();
    // TO-DO: Use data to display one time investment subscription agreement
    const { mutate: createSubscriptionAgreementMutation } = useCreateSubscriptionAgreement(getApiClient);
    const { mutate: signSubscriptionAgreement } = useSignSubscriptionAgreement(getApiClient);
    const [isDialogRecurringAgreementOpen, toggleIsDialogRecurringAgreementOpen] = useToggler(false);

    const defaultValues: Fields = {
      agreesToOneTimeInvestment: !!storeFields.agreesToOneTimeInvestment,
      agreesToRecurringInvestment: !!storeFields.agreesToRecurringInvestment,
    };

    const { handleSubmit, control, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues: async () => defaultValues,
      resolver: zodResolver(getSchema(storeFields)),
    });

    useEffect(() => {
      const { investmentId } = storeFields;

      if (investmentId) {
        createSubscriptionAgreementMutation({ investmentId });
      }
    }, [createSubscriptionAgreementMutation, storeFields]);

    const shouldButtonsBeDisabled = !formState.isValid || formState.isSubmitting;
    const shouldAgreeToRecurringInvestment = !!storeFields._shouldAgreeToRecurringInvestment;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const { investmentId } = storeFields;
      const { agreesToOneTimeInvestment, agreesToRecurringInvestment } = fields;
      await updateStoreFields({ agreesToOneTimeInvestment, agreesToRecurringInvestment });

      if (investmentId) {
        await signSubscriptionAgreement({ investmentId });
        await signRecurringInvestmentSubscriptionAgreement();
        moveToNextStep();
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ModalTitle
            title={TITLE}
            subtitle={SUBTITLE}
            isTitleCenteredOnMobile={false}
          />

          <div className="flex flex-col gap-16">
            <CheckboxLabeled
              name="agreesToOneTimeInvestment"
              control={control}
              labelAsButtonLink
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              onButtonLinkClick={() => {}}
            >
              {LABEL_AGREEMENT_ONE_TIME}
            </CheckboxLabeled>

            {shouldAgreeToRecurringInvestment && (
              <>
                <CheckboxLabeled
                  name="agreesToRecurringInvestment"
                  control={control}
                  labelAsButtonLink
                  onButtonLinkClick={toggleIsDialogRecurringAgreementOpen}
                >
                  {LABEL_AGREEMENT_RECURRING}
                </CheckboxLabeled>

                {subscriptionRecurringInvestmentAgreement && (
                  <DialogSubscriptionAgreement
                    subscriptionAgreement={subscriptionRecurringInvestmentAgreement}
                    isModalOpen={isDialogRecurringAgreementOpen}
                    onModalOpenChange={toggleIsDialogRecurringAgreementOpen}
                  />
                )}
              </>
            )}
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Accept"
            disabled={shouldButtonsBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
