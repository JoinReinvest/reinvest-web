import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { useActiveAccount } from '../../../../providers/ActiveAccountProvider';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Choose the amount for your recurring investment';

type Fields = { amount?: number };

export const StepRecurringInvestmentAmount: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_AMOUNT,

  willBePartOfTheFlow: fields => !!fields._shouldDisplayRecurringInvestment,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount, fields.investmentAmount !== undefined, fields._willSetUpRecurringInvestment];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { amount: storeFields.recurringInvestmentAmount };
    const { activeAccount } = useActiveAccount();
    const { handleSubmit, setValue, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues: async () => defaultValues,
      resolver: zodResolver(generateInvestmentSchema({ accountType: activeAccount?.type || AccountType.Individual })),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const errorMessage = formState.errors.amount?.message;

    const onSubmit: SubmitHandler<Fields> = async ({ amount }) => {
      await updateStoreFields({ investmentAmount: amount, recurringInvestmentDate: new Date() });

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
            defaultValue={defaultValues.amount}
            onChange={value => setValue('amount', value, { shouldValidate: true })}
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
