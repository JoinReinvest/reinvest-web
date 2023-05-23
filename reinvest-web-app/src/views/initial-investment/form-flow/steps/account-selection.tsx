import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { AccountSelection } from 'components/FormElements/AccountSelection';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema, z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

interface Fields {
  accountId?: string;
}

const schema: Schema<Fields> = z.object({
  accountId: z.string().nonempty(),
});

const TITLE = 'Choose which account you want to invest in';
const BUTTON_LABEL = 'Continue';

export const StepAccountSelection: StepParams<FlowFields> = {
  identifier: Identifiers.ACCOUNT_SELECTION,

  willBePartOfTheFlow: fields => {
    const arrivesFromOnboarding = !!fields._forInitialInvestment;
    const hasMoreThanOneAccount = !!fields._hasMoreThanAnAccount;

    return arrivesFromOnboarding && hasMoreThanOneAccount;
  },

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { activeAccount, updateActiveAccount, availableAccounts, allAccounts } = useActiveAccount();
    const { control, handleSubmit, formState } = useForm<Fields>({
      resolver: zodResolver(schema),
      defaultValues: async () => ({ accountId: activeAccount?.id ?? undefined }),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ accountId }) => {
      const account = availableAccounts.find(account => account?.id === accountId);

      if (account) {
        const isActiveAccount = activeAccount?.id === account.id;

        !isActiveAccount && updateActiveAccount(account);
        moveToNextStep();
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ModalTitle
            title={TITLE}
            isTitleCenteredOnMobile={false}
          />

          <AccountSelection
            name="accountId"
            options={allAccounts}
            control={control}
          />
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
