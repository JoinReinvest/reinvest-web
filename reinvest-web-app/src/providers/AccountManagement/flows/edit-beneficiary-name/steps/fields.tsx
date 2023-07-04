import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useUpdateBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/updateBeneficiaryAccount';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = "Edit beneficiary's name";

type Fields = Pick<FlowFields, 'name'>;

const schema = z.object({
  name: z.object({
    firstName: formValidationRules.firstName,
    lastName: formValidationRules.lastName,
  }),
});

export const StepFields: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.FIELDS,

  Component: ({ moveToNextStep, storeFields, updateStoreFields, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'onSubmit',
      defaultValues: async () => ({ name: storeFields.name }),
      resolver: zodResolver(schema),
    });

    const { mutateAsync: updateBeneficiaryAccount, isSuccess } = useUpdateBeneficiaryAccount(getApiClient);
    const { toggleShouldRefetchAccounts } = useAccountManagement();
    const { activeAccount } = useActiveAccount();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<Fields> = async ({ name }) => {
      const accountId = activeAccount?.id;

      if (accountId) {
        await updateBeneficiaryAccount({ accountId, input: { name } });
        await updateStoreFields({ _hasSucceded: true, name });
      }
    };

    const onButtonBackClick = () => {
      moveToPreviousStep();
    };

    useEffect(() => {
      if (isSuccess) {
        toggleShouldRefetchAccounts(true);
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep, toggleShouldRefetchAccounts]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <Input
              name="name.firstName"
              control={control}
              placeholder="First Name"
              required
            />

            <Input
              name="name.lastName"
              control={control}
              placeholder="Last Name"
              required
            />
          </div>
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
