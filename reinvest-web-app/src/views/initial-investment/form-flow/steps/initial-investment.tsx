import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { ModalTitle } from 'components/ModalElements/Title';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { maskCurrency } from 'utils/currency';
import { Schema, z } from 'zod';

import { MINIMUM_INVESTMENT_AMOUNT_FOR_CORPORATE_OR_TRUST, MINIMUM_INVESTMENT_AMOUNT_FOR_INDIVIDUAL } from '../../constants/investment-amounts';
import { FlowFields, Investment } from '../fields';
import { Identifiers } from '../identifiers';

interface Fields {
  investmentAmount?: number;
}

const getSchema = ({ _isForIndividualAccount }: FlowFields): Schema<Fields> => {
  const minimum = _isForIndividualAccount ? MINIMUM_INVESTMENT_AMOUNT_FOR_INDIVIDUAL : MINIMUM_INVESTMENT_AMOUNT_FOR_CORPORATE_OR_TRUST;
  const maskedMinimum = maskCurrency(minimum);

  return z.object({
    investmentAmount: z.number().min(minimum, `Minimum investment amount is ${maskedMinimum}`),
  });
};

const getDefaultValues = ({ oneTimeInvestment }: FlowFields): Fields => ({
  investmentAmount: oneTimeInvestment?.amount,
});

export const StepInitialInvestment: StepParams<FlowFields> = {
  identifier: Identifiers.INITIAL_INVESTMENT,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const schema = useMemo(() => getSchema(storeFields), [storeFields]);
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
        type: 'one-time',
        date: new Date(),
      };

      await updateStoreFields({ oneTimeInvestment: investment });

      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="Make your initial one-time investment"
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
            type="submit"
            label="Invest Now"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
