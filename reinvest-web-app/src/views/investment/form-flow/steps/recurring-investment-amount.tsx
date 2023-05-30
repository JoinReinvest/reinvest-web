import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { ModalTitle } from 'components/ModalElements/Title';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateRecurringInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { FlowFields, Investment } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Choose the amount for your recurring investment';

interface Fields {
  amount?: number;
}

const getDefaultValues = ({ recurringInvestment }: FlowFields): Fields => ({
  amount: recurringInvestment?.amount,
});

export const StepRecurringInvestmentAmount: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_INVESTMENT_AMOUNT,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestment;
  },

  doesMeetConditionFields: fields => {
    return !!fields._willSetUpRecurringInvestment;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const schema = generateRecurringInvestmentSchema({ accountType: activeAccount?.type ?? AccountType.Individual });
    const defaultValues = useMemo(() => getDefaultValues(storeFields), [storeFields]);
    const { handleSubmit, setValue, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues,
      resolver: zodResolver(schema),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const errorMessage = formState.errors.amount?.message;
    const bankAccount = storeFields.bankAccount;

    const onSubmit: SubmitHandler<Fields> = async ({ amount }) => {
      const investment: Investment = {
        amount,
        type: 'recurrent',
        date: new Date(),
      };

      await updateStoreFields({ recurringInvestment: investment });

      moveToNextStep();
    };

    async function onChangeBankAccount() {
      await updateStoreFields({ bankAccount: '', _willUpdateBankAccount: true, _justAddedBankAccount: false });
      moveToStepByIdentifier(Identifiers.BANK_SELECTION);
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title={TITLE}
            isTitleCenteredOnMobile
          />

          <InvestmentCard
            defaultValue={defaultValues.amount}
            onChange={value => setValue('amount', value, { shouldValidate: true })}
            currentBankAccount={bankAccount}
            onChangeBankAccount={onChangeBankAccount}
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
