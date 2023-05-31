import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { DialogSubscriptionAgreement } from 'components/DialogSubscriptionAgreement';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { CheckboxLabeled } from 'components/FormElements/CheckboxLabeled';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { useToggler } from 'hooks/toggler';
import { useInvestmentContext } from 'providers/InvestmentProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'agreesToOneTimeInvestment' | 'agreesToRecurringInvestment'>;

const getSchema = ({ _shouldAgreeToOneTimeInvestment, _shouldAgreeToRecurringInvestment }: FlowFields): Schema<Fields> => {
  return z
    .object({
      agreesToOneTimeInvestment: z.boolean(),
      agreesToRecurringInvestment: z.boolean(),
    })
    .superRefine((fields, context) => {
      const agreedToOneTimeStatement = _shouldAgreeToOneTimeInvestment ? !!fields.agreesToOneTimeInvestment : true;
      const agreedToRecurringStatement = _shouldAgreeToRecurringInvestment ? !!fields.agreesToRecurringInvestment : true;
      const missedAnAgreement = [agreedToOneTimeStatement, agreedToRecurringStatement].some(agreement => !agreement);

      if (missedAnAgreement) {
        context.addIssue({ code: 'custom' });
      }
    });
};

const TITLE = 'Approve subscription agreements';
const SUBTITLE = 'I have read through the selected documents referenced below:';
const LABEL_AGREEMENT_ONE_TIME = 'One Time Investment Agreement';
const LABEL_AGREEMENT_RECURRING = 'Recurring Investment Agreement';

export const StepSubscriptionAgreements: StepParams<FlowFields> = {
  identifier: Identifiers.SUBSCRIPTION_AGREEMENTS,

  doesMeetConditionFields: fields => {
    const requiredFields = [!!fields.oneTimeInvestment, fields.optsInForAutomaticDividendReinvestment !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { subscriptionAgreement, signSubscriptionAgreement, signSubscriptionAgreementMeta } = useInvestmentContext();
    const { subscriptionRecurringInvestmentAgreement, signRecurringInvestmentSubscriptionAgreement } = useRecurringInvestment();
    const [isDialogInvestmentOpen, toggleIsDialogInvestmentOpen] = useToggler();
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

    const shouldButtonsBeDisabled = !formState.isValid || formState.isSubmitting;
    const shouldAgreeToOneTimeInvestment = !!storeFields._shouldAgreeToOneTimeInvestment;
    const shouldAgreeToRecurringInvestment = !!storeFields._shouldAgreeToRecurringInvestment;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const { agreesToOneTimeInvestment, agreesToRecurringInvestment } = fields;
      await updateStoreFields({ agreesToOneTimeInvestment, agreesToRecurringInvestment });

      if (subscriptionAgreement) {
        await signSubscriptionAgreement();
        await signRecurringInvestmentSubscriptionAgreement();
      }
    };

    useEffect(() => {
      if (signSubscriptionAgreementMeta.isSuccess) {
        signSubscriptionAgreementMeta.reset();
        moveToNextStep();
      }
    }, [signSubscriptionAgreementMeta, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop={!storeFields._forInitialInvestment}>
          <ModalTitle
            title={TITLE}
            subtitle={SUBTITLE}
          />

          <div className="flex flex-col gap-16">
            {shouldAgreeToOneTimeInvestment && (
              <>
                <CheckboxLabeled
                  name="agreesToOneTimeInvestment"
                  control={control}
                  labelAsButtonLink
                  onButtonLinkClick={toggleIsDialogInvestmentOpen}
                >
                  {LABEL_AGREEMENT_ONE_TIME}
                </CheckboxLabeled>

                {subscriptionAgreement && (
                  <DialogSubscriptionAgreement
                    subscriptionAgreement={subscriptionAgreement}
                    isModalOpen={isDialogInvestmentOpen}
                    onModalOpenChange={toggleIsDialogInvestmentOpen}
                  />
                )}
              </>
            )}

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
