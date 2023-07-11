import { Separator } from '@radix-ui/react-separator';
import { IconChain } from 'assets/icons/IconChain';
import { IconEyeHide } from 'assets/icons/IconEyeHide';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { LogoIcon2 } from 'assets/LogoIcon2';
import { LogoPlaid } from 'assets/LogoPlaid';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useBankAccount } from 'providers/BankAccount';
import { FormEventHandler, useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'REINVEST uses Plaid to connect your account';
const BUTTON_LABEL = 'Continue';

const LIST_ITEMS = [
  {
    icon: <IconChain />,
    title: 'Connect effortlessly',
    description: 'Plaid lets you securely connect your financial accounts in seconds.',
  },
  {
    icon: <IconEyeHide className="h-24 w-24 stroke-black-01" />,
    title: 'Your data belongs to you',
    description: "Plaid doesn't sell personal info, ad will only use it with your permission.",
  },
];

export const StepBankAccountLanding: StepParams<FlowFields> = {
  identifier: Identifiers.BANK_ACCOUNT_LANDING,

  doesMeetConditionFields: fields => {
    return !fields._hasBankAccount || !!fields?._willUpdateBankAccount;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields, moveToPreviousStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const willOnlyShowRecurringInvestment = !!storeFields._onlyRecurringInvestment;
    const { currentBankAccount, currentBankAccountMeta } = useBankAccount();

    useEffect(() => {
      async function initializeBankAccountFields() {
        if (currentBankAccountMeta.isSuccess && currentBankAccount?.accountNumber && currentBankAccount?.accountType) {
          await updateStoreFields({
            _hasBankAccount: true,
            _bankAccount: currentBankAccount.accountNumber,
            _bankAccountType: currentBankAccount.accountType,
          });

          if (willOnlyShowRecurringInvestment) {
            moveToStepByIdentifier(Identifiers.RECURRING_INVESTMENT_AMOUNT);
          } else {
            moveToStepByIdentifier(Identifiers.ONE_TIME_INVESTMENT);
          }
        }
      }

      initializeBankAccountFields();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBankAccountMeta.isSuccess, currentBankAccountMeta?.isError, currentBankAccount]);

    if (currentBankAccountMeta.isLoading) {
      return (
        <div className="grid h-full w-full place-items-center">
          <IconSpinner />
        </div>
      );
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      moveToNextStep();
    };

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop={!!storeFields._forInitialInvestment}>
          {!!storeFields._forInitialInvestment && (
            <ButtonBack
              hideOnMobile
              onClick={onButtonBackClick}
            />
          )}

          <div className="flex flex-col gap-48">
            <header className="flex justify-center gap-14">
              <LogoIcon2 className="h-25 w-auto" />

              <Separator
                orientation="vertical"
                className="w-1 bg-black-01"
              />

              <LogoPlaid />
            </header>

            <div className="flex flex-col gap-40">
              <ModalTitle title={TITLE} />

              <ul className="flex flex-col gap-24">
                {LIST_ITEMS.map(({ icon, title, description }) => (
                  <li
                    className="flex gap-8"
                    key={lowerCaseWithoutSpacesGenerator(title)}
                  >
                    {icon}

                    <div className="flex flex-col gap-8">
                      <Typography variant="paragraph-emphasized">{title}</Typography>
                      <Typography variant="paragraph-large">{description}</Typography>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
