import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { Typography } from 'components/Typography';
import { useIndividualAccount } from 'hooks/individual-account';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EMPLOYMENT_STATUSES, EMPLOYMENT_STATUSES_VALUES } from 'reinvest-app-common/src/constants/employment_statuses';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

type Fields = Pick<FlowFields, 'employmentStatus'>;

const schema: Schema<Fields> = z.object({
  employmentStatus: z.enum(EMPLOYMENT_STATUSES_VALUES),
});

const TITLE = 'Employment Status';
const BUTTON_LABEL_EMPLOYED = 'Continue';
const BUTTON_LABEL_FALLBACK = 'Update';

export const StepEmploymentStatus: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.EMPLOYMENT_STATUS,

  Component: ({ storeFields, moveToNextStep, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { updateIndividualAccount, updateIndividualAccountMeta } = useIndividualAccount();
    const { setCurrentFlowIdentifier } = useAccountManagement();

    const form = useForm<Fields>({
      resolver: zodResolver(schema),
      defaultValues: async () => ({ employmentStatus: storeFields.employmentStatus }),
    });

    const employmentStatus = form.watch('employmentStatus');
    const isEmployed = useMemo(() => employmentStatus === EmploymentStatus.Employed, [employmentStatus]);
    const buttonLabel = useMemo(() => (isEmployed ? BUTTON_LABEL_EMPLOYED : BUTTON_LABEL_FALLBACK), [isEmployed]);

    useEffect(() => {
      if (updateIndividualAccountMeta.isSuccess && !isEmployed) {
        moveToStepByIdentifier(FlowStepIdentifiers.CONFIRMATION);
      }
    }, [isEmployed, updateIndividualAccountMeta.isSuccess, moveToStepByIdentifier]);

    const shouldButtonBeLoading = updateIndividualAccountMeta.isLoading || form.formState.isSubmitting;
    const shouldButtonBeDisabled = shouldButtonBeLoading || !form.formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async ({ employmentStatus }) => {
      // Only move to the next step if they are employed
      // otherwise update here.
      if (employmentStatus) {
        if (isEmployed) {
          await updateStoreFields({ employmentStatus });
          moveToNextStep();
        } else {
          await updateIndividualAccount({ employmentStatus: { status: employmentStatus } });
        }
      }
    };

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <Typography variant="h5">{TITLE}</Typography>

          <SelectionCards
            name="employmentStatus"
            control={form.control}
            options={EMPLOYMENT_STATUSES}
            required
            orientation="vertical"
            className="flex flex-col items-stretch gap-22 lg:gap-24"
            forWhiteBackground
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            loading={shouldButtonBeLoading}
            disabled={shouldButtonBeDisabled}
            label={buttonLabel}
          />
        </ButtonStack>
      </Form>
    );
  },
};
