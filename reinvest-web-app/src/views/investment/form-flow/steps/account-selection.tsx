import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { AccountSelection } from 'components/FormElements/AccountSelection';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
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

const getDefaultValues = (storeFields: FlowFields): Fields => {
  const firstAvailableAccount = storeFields._availableAccounts?.at(0);
  const selectedAccount = storeFields._selectedAccount;
  const accountId = selectedAccount?.id || firstAvailableAccount?.id;

  return { accountId: accountId || undefined };
};

const TITLE = 'Choose which account you want to invest in';
const BUTTON_LABEL = 'Continue';

export const StepAccountSelection: StepParams<FlowFields> = {
  identifier: Identifiers.ACCOUNT_SELECTION,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = getDefaultValues(storeFields);
    const { control, handleSubmit, formState } = useForm<Fields>({ resolver: zodResolver(schema), defaultValues: async () => defaultValues });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ accountId }) => {
      const account = storeFields._availableAccounts?.find(account => account?.id === accountId);

      if (account) {
        await updateStoreFields({ _selectedAccount: account });
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
            options={storeFields._availableAccounts || []}
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
