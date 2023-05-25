import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { ModalTitle } from 'components/ModalElements/Title';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useInvestmentContext } from 'providers/InvestmentProvider';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, Investment } from '../fields';
import { Identifiers } from '../identifiers';

interface Fields {
  amount?: number;
}

const getDefaultValues = ({ oneTimeInvestment }: FlowFields): Fields => ({
  amount: oneTimeInvestment?.amount,
});

export const StepInitialInvestment: StepParams<FlowFields> = {
  identifier: Identifiers.INITIAL_INVESTMENT,

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { createInvestment, createInvestmentMeta } = useInvestmentContext();
    const { activeAccount } = useActiveAccount();
    const schema = useMemo(() => generateInvestmentSchema({ accountType: activeAccount?.type || undefined }), [activeAccount]);
    const defaultValues = useMemo(() => getDefaultValues(storeFields), [storeFields]);
    const { handleSubmit, setValue, formState } = useForm<Fields>({
      mode: 'onChange',
      defaultValues: async () => defaultValues,
      resolver: zodResolver(schema),
    });

    useEffect(() => {
      if (createInvestmentMeta.isSuccess) {
        updateStoreFields({ _shouldAgreeToOneTimeInvestment: true });
        createInvestmentMeta.reset();
        moveToNextStep();
      }
    }, [createInvestmentMeta.isSuccess, moveToNextStep, updateStoreFields, createInvestmentMeta]);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const errorMessage = formState.errors.amount?.message;
    const bankAccount = storeFields.bankAccount;

    const onSubmit: SubmitHandler<Fields> = async ({ amount }) => {
      const investment: Investment = {
        amount,
        type: 'one-time',
        date: new Date(),
      };

      if (amount) {
        await createInvestment({ investmentAmount: amount });
        await updateStoreFields({ oneTimeInvestment: investment, _shouldAgreeToOneTimeInvestment: true });
      }
    };

    const onSkipButtonClick = async () => {
      await updateStoreFields({ _willSetUpOneTimeInvestments: false, _shouldAgreeToOneTimeInvestment: false });

      moveToNextStep();
    };

    async function onChangeBankAccount() {
      await updateStoreFields({ bankAccount: '', _willUpdateBankAccount: true });
      moveToStepByIdentifier(Identifiers.BANK_SELECTION);
    }

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="Make your initial one-time investment"
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
            label="Skip"
            variant="outlined"
            onClick={onSkipButtonClick}
          />
          <Button
            type="submit"
            label="Invest Now"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
