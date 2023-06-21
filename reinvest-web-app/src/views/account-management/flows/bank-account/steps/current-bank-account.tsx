import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useCurrentBankAccount } from 'hooks/current-bank-account';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManager } from 'views/account-management/contexts/FlowsManager';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Your bank account';
const NOTICES = [
  'REINVEST allows only 1 bank account to be linked to an account at a time.',
  'If you remove your bank account, it will be removed from your beneficiary account as well.',
];
const BUTTON_LABEL = 'Change';

export const StepCurrentBankAccount: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_BANK_ACCOUNT,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { bankAccountDisplay, currentBankAccountMeta } = useCurrentBankAccount();

    if (currentBankAccountMeta?.isLoading) {
      return (
        <div className="grid h-full w-full place-items-center">
          <IconSpinner color="black" />
        </div>
      );
    }

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      await updateStoreFields({ _willUpdateBankAccount: true });
      moveToNextStep();
    }

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          <Typography variant="h4-expanded">{TITLE}</Typography>

          <Typography variant="paragraph-emphasized">{bankAccountDisplay}</Typography>

          {NOTICES.map((notice, index) => (
            <Typography
              key={index}
              variant="paragraph-emphasized-regular"
            >
              {notice}
            </Typography>
          ))}
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={currentBankAccountMeta.isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
