import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { maskCurrency } from 'utils/currency';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Choose the amount for your recurring investment';
const MINIMUM_AMOUNT = 100;
const MASKED_MINIMUM_AMOUNT = maskCurrency(MINIMUM_AMOUNT);

type Fields = Pick<FlowFields, 'recurringInvestmentAmount'>;

const schema: Schema<Fields> = z.object({
  recurringInvestmentAmount: z.string().min(MINIMUM_AMOUNT, `Minimum investment amount is ${MASKED_MINIMUM_AMOUNT}`),
});

export const StepRecurringInvestmentAmount: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_AMOUNT,

  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount, fields.investmentAmount !== undefined, fields._willSetUpRecurringInvestment];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { recurringInvestmentAmount: storeFields.recurringInvestmentAmount };
    const { handleSubmit, setValue, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues: async () => defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const errorMessage = formState.errors.recurringInvestmentAmount?.message;

    const onSubmit: SubmitHandler<Fields> = async ({ recurringInvestmentAmount }) => {
      await updateStoreFields({ recurringInvestmentAmount, recurringInvestmentDate: new Date() });

      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ModalTitle
            title={TITLE}
            isTitleCenteredOnMobile={false}
          />

          <InvestmentCard
            defaultValue={defaultValues.recurringInvestmentAmount || ''}
            onChange={value => setValue('recurringInvestmentAmount', value?.toString(), { shouldValidate: true })}
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
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
