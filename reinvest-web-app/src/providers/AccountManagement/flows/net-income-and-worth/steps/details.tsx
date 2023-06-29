import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Select } from 'components/Select';
import { Typography } from 'components/Typography';
import { useIndividualAccount } from 'hooks/individual-account';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NET_WORTHS_AS_OPTIONS } from 'reinvest-app-common/src/constants/net-worths';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Update your net worth and income';
const BUTTON_LABEL = 'Update';

const schema: Schema<FlowFields> = z.object({
  netIncome: formValidationRules.netIncome,
  netWorth: formValidationRules.netWorth,
});

export const StepDetails: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.DETAILS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const form = useForm<FlowFields>({ resolver: zodResolver(schema), defaultValues: async () => storeFields });
    const { updateIndividualAccount, updateIndividualAccountMeta } = useIndividualAccount();
    const { setCurrentFlowIdentifier } = useAccountManagement();

    useEffect(() => {
      if (updateIndividualAccountMeta.isSuccess) {
        moveToNextStep();
      }
    }, [updateIndividualAccountMeta.isSuccess, moveToNextStep]);

    const shouldButtonBeLoading = updateIndividualAccountMeta.isLoading || form.formState.isSubmitting;
    const shouldButtonBeDisabled = !form.formState.isValid || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<FlowFields> = async ({ netIncome, netWorth }) => {
      if (netIncome && netWorth) {
        await updateStoreFields({ netIncome, netWorth });
        await updateIndividualAccount({ netIncome: { range: netIncome }, netWorth: { range: netWorth } });
      }
    };

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <Typography variant="h5">{TITLE}</Typography>

          <div className="flex w-full flex-col gap-16">
            <Select
              name="netIncome"
              control={form.control}
              options={NET_WORTHS_AS_OPTIONS}
              placeholder="Net Income"
              forWhiteBackground
              required
            />

            <Select
              name="netWorth"
              control={form.control}
              options={NET_WORTHS_AS_OPTIONS}
              placeholder="Net Worth"
              forWhiteBackground
              required
            />
          </div>
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
    );
  },
};
