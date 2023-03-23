import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { EMPLOYMENT_STATUSES } from 'constants/employment_statuses';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'employmentStatus'>;

const schema = z.object({
  employmentStatus: z.enum(['employed', 'unemployed', 'retired', 'student']),
});

export const StepEmploymentStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_STATUS,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === AccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ employmentStatus: undefined });
      moveToNextStep();
    };

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Are you currently employed?" />

          <SelectionCards
            name="employmentStatus"
            control={form.control}
            options={EMPLOYMENT_STATUSES}
            required={false}
            orientation="vertical"
            className="flex flex-col items-stretch gap-22 lg:gap-24"
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />

          <Button
            label="Skip"
            variant="outlined"
            onClick={onSkip}
            className="text-green-frost-01"
          />
        </ButtonStack>
      </Form>
    );
  },
};
