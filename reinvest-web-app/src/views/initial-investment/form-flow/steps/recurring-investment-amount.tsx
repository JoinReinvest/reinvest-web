import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { maskCurrency } from 'utils/currency';
import { Schema, z } from 'zod';

import { FlowFields, Investment } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Choose the amount for your recurring investment';
const MINIMUM_AMOUNT = 100;
const MASKED_MINIMUM_AMOUNT = maskCurrency(MINIMUM_AMOUNT);

interface Fields {
  investmentAmount?: number;
}

const schema: Schema<Fields> = z.object({
  investmentAmount: z.number().min(MINIMUM_AMOUNT, `Minimum investment amount is ${MASKED_MINIMUM_AMOUNT}`),
});

const getDefaultValues = ({ recurringInvestment }: FlowFields): Fields => ({
  investmentAmount: recurringInvestment?.amount,
});

export const StepRecurringInvestmentAmount: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_AMOUNT,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestments;
  },

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.oneTimeInvestment, fields._willSetUpRecurringInvestments];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues = useMemo(() => getDefaultValues(storeFields), [storeFields]);
    const { handleSubmit, setValue, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues: async () => defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const errorMessage = formState.errors.investmentAmount?.message;

    const onSubmit: SubmitHandler<Fields> = async ({ investmentAmount }) => {
      const investment: Investment = {
        amount: investmentAmount,
        type: 'recurrent',
        date: new Date(),
      };

      await updateStoreFields({ recurringInvestment: investment });

      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title={TITLE}
            isTitleCenteredOnMobile
          />

          <InvestmentCard
            defaultValue={defaultValues.investmentAmount}
            onChange={value => setValue('investmentAmount', value, { shouldValidate: true })}
            currentBankAccount="Checking **** **** **** 0000"
            onChangeBankAccount={() => {
              // eslint-disable-next-line no-console
              console.info('change bank account');
            }}
            className="mx-auto"
          />

          {!!errorMessage && <FormMessage message={errorMessage} />}
        </FormContent>

        <ButtonStack>
          <Button
            label="Skip"
            disabled
          />

          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
