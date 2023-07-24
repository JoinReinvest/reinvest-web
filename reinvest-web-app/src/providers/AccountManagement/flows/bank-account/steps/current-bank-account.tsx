import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useBankAccount } from 'providers/BankAccount';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE_DEFAULT = 'Your bank account';
const TITLE_NO_ACCOUNT = 'You have no Bank Account linked.';

const NOTICES = [
  'REINVEST allows only 1 bank account to be linked to an account at a time.',
  'If you remove your bank account, it will be removed from your beneficiary account as well.',
];

const BUTTON_NO_ACCOUNT_LABEL = 'Connect';
const BUTTON_LABEL = 'Change';

export const StepCurrentBankAccount: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_BANK_ACCOUNT,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const hasBankAccount = !!storeFields?._hasBankAccount;
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const { bankAccountDisplay } = useBankAccount();

    const title = hasBankAccount ? TITLE_DEFAULT : TITLE_NO_ACCOUNT;
    const buttonLabel = hasBankAccount ? BUTTON_LABEL : BUTTON_NO_ACCOUNT_LABEL;

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      moveToNextStep();
    }

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          {hasBankAccount ? (
            <>
              <Typography variant="h4-expanded">{title}</Typography>

              <div className="flex flex-col gap-16">
                <Typography variant="paragraph-emphasized">{bankAccountDisplay}</Typography>

                <Typography variant="h6">
                  {NOTICES.map((notice, index) => (
                    <span key={index}>
                      {notice}
                      <br />
                    </span>
                  ))}
                </Typography>
              </div>
            </>
          ) : (
            <Typography variant="h6">{title}</Typography>
          )}
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={buttonLabel}
          />
        </ButtonStack>
      </Form>
    );
  },
};
