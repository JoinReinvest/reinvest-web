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
import {
  MINIMUM_INVESTMENT_AMOUNT_FOR_CORPORATE_OR_TRUST,
  MINIMUM_INVESTMENT_AMOUNT_FOR_INDIVIDUAL,
} from 'views/initial-investment/constants/investment-amounts';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'investmentAmount'>;

const getSchema = ({ _selectedAccount }: FlowFields): Schema<Fields> => {
  const isIndividualAccount = _selectedAccount?.type?.toLowerCase() === 'individual';
  const minimum = isIndividualAccount ? MINIMUM_INVESTMENT_AMOUNT_FOR_INDIVIDUAL : MINIMUM_INVESTMENT_AMOUNT_FOR_CORPORATE_OR_TRUST;
  const maskedMinimum = maskCurrency(minimum);

  return z.object({
    investmentAmount: z.number().min(minimum, `Minimum investment amount is ${maskedMinimum}`),
  });
};

const TITLE = 'Choose your investment amount and frequency.';
const BUTTON_LABEL = 'Invest Now';

export const StepInvestmentAmount: StepParams<FlowFields> = {
  identifier: Identifiers.INVESTMENT_AMOUNT,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._selectedAccount];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const schema = getSchema(storeFields);
    const defaultValues: Fields = { investmentAmount: storeFields.investmentAmount };
    const { handleSubmit, formState, setValue } = useForm<Fields>({ resolver: zodResolver(schema), defaultValues: async () => defaultValues });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const errorMessage = formState.errors.investmentAmount?.message;

    const onSubmit: SubmitHandler<Fields> = async ({ investmentAmount }) => {
      await updateStoreFields({ investmentAmount });
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
            defaultValue={defaultValues.investmentAmount}
            onChange={value => setValue('investmentAmount', value, { shouldValidate: true })}
            currentBankAccount="Checking **** **** **** 0000"
            onChangeBankAccount={() => {
              // eslint-disable-next-line no-console
              console.info('change bank account');
            }}
          />

          {!!errorMessage && <FormMessage message={errorMessage} />}
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
