import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InvestmentCard } from 'components/FormElements/InvestmentCard';
import { ModalTitle } from 'components/ModalElements/Title';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INVESTMENT_PRESET_AMOUNTS } from 'reinvest-app-common/src/constants/investment-amounts';
import { ONE_TIME_INVESTMENT_MIN_AMOUNT } from 'reinvest-app-common/src/constants/investment-limits';
import { generateInvestmentSchema } from 'reinvest-app-common/src/form-schemas/investment';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { useOneTimeInvestment } from 'views/investment/providers/OneTimeInvestment';

import { FlowFields, Investment } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE_FIRST_TIME = 'Make your initial one-time investment';
const TITLE_DEFAULT = 'Make your one-time investment';
const BUTTON_SKIP_LABEL = 'Skip';
const BUTTON_LABEL = 'Invest Now';

interface Fields {
  amount?: number;
}

const getDefaultValues = ({ oneTimeInvestment }: FlowFields): Fields => ({
  amount: oneTimeInvestment?.amount,
});

export const StepOneTimeInvestment: StepParams<FlowFields> = {
  identifier: Identifiers.ONE_TIME_INVESTMENT,

  willBePartOfTheFlow: fields => !fields._onlyRecurringInvestment,

  doesMeetConditionFields: fields => !fields._onlyRecurringInvestment,

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { createInvestment, createInvestmentMeta } = useOneTimeInvestment();
    const { activeAccount } = useActiveAccount();
    const presetOptions = useMemo(() => INVESTMENT_PRESET_AMOUNTS[activeAccount?.type ?? AccountType.Individual], [activeAccount]);
    const schema = useMemo(() => generateInvestmentSchema({ accountType: activeAccount?.type || undefined }), [activeAccount]);
    const { activeRecurringInvestment, activeRecurringInvestmentMeta } = useRecurringInvestment();
    const defaultValues = useMemo(() => getDefaultValues(storeFields), [storeFields]);
    const form = useForm<Fields>({
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

    const title = !storeFields?._forInitialInvestment ? TITLE_FIRST_TIME : TITLE_DEFAULT;

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting;
    const errorMessage = form.formState.errors.amount?.message;

    const bankAccount = storeFields._bankAccount ?? '';
    const bankAccountType = storeFields._bankAccountType ?? '';

    const onSubmit: SubmitHandler<Fields> = async ({ amount }) => {
      const amountToInvest = amount || parseInt(presetOptions[0]?.value || ONE_TIME_INVESTMENT_MIN_AMOUNT.toString());
      const investment: Investment = {
        amount: amountToInvest,
        type: 'one-time',
        date: new Date(),
      };

      if (amountToInvest) {
        await createInvestment({ investmentAmount: amountToInvest });
        await updateStoreFields({ oneTimeInvestment: investment, _shouldAgreeToOneTimeInvestment: true, _willSetUpOneTimeInvestments: true });
      }
    };

    const onSkipButtonClick = async () => {
      await updateStoreFields({ _willSetUpOneTimeInvestments: false, _shouldAgreeToOneTimeInvestment: false });

      moveToNextStep();
    };

    function onButtonBackClick() {
      moveToStepByIdentifier(Identifiers.ACCOUNT_SELECTION);
    }

    useEffect(() => {
      if (activeRecurringInvestmentMeta.isSuccess && activeRecurringInvestment) {
        updateStoreFields({ _shouldDisplayRecurringInvestment: false });
      } else {
        updateStoreFields({ _shouldDisplayRecurringInvestment: true });
      }
    }, [activeRecurringInvestmentMeta.isSuccess, activeRecurringInvestment, updateStoreFields]);

    async function onChangeBankAccount() {
      await updateStoreFields({ _bankAccount: undefined, _bankAccountType: undefined, _willUpdateBankAccount: true, _justAddedBankAccount: false });
      moveToStepByIdentifier(Identifiers.BANK_ACCOUNT_SELECTION);
    }

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        {activeRecurringInvestmentMeta.isLoading && (
          <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
            <IconSpinner />
          </div>
        )}

        {!activeRecurringInvestmentMeta.isLoading && (
          <>
            <FormContent willLeaveContentOnTop={!!storeFields._forInitialInvestment}>
              {!!storeFields._forInitialInvestment && (
                <ButtonBack
                  hideOnMobile
                  onClick={onButtonBackClick}
                />
              )}

              <ModalTitle
                title={title}
                isTitleCenteredOnMobile
              />

              <InvestmentCard
                presetOptions={presetOptions}
                defaultValue={defaultValues.amount}
                onChange={value => form.setValue('amount', value, { shouldValidate: true })}
                currentBankAccount={bankAccount}
                currentBankAccountType={bankAccountType}
                onChangeBankAccount={onChangeBankAccount}
                className="mx-auto"
              />

              {!!errorMessage && <FormMessage message={errorMessage} />}
            </FormContent>

            <ButtonStack>
              <Button
                label={BUTTON_SKIP_LABEL}
                variant="outlined"
                onClick={onSkipButtonClick}
              />

              <Button
                type="submit"
                label={BUTTON_LABEL}
                disabled={shouldButtonBeDisabled}
              />
            </ButtonStack>
          </>
        )}
      </Form>
    );
  },
};
