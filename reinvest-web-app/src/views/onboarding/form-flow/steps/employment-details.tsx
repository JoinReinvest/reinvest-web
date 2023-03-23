import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { Select } from 'components/Select';
import { INDUESTRIES_AS_OPTIONS, INDUSTRIES_VALUES } from 'constants/industries';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { AccountType } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'employmentDetails'>;

const schema = z.object({
  employmentDetails: z.object({
    employerName: formValidationRules.employerName,
    occupation: formValidationRules.occupation,
    industry: z.enum(INDUSTRIES_VALUES),
  }),
});

export const StepEmploymentDetails: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EMPLOYMENT_DETAILS,

  willBePartOfTheFlow: ({ employmentStatus, accountType }) => {
    const isEmployed = employmentStatus === 'employed';
    const isCreatingAnIndividualAccount = accountType === AccountType.Individual;

    return isEmployed && isCreatingAnIndividualAccount;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ employmentStatus: undefined });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Are you currently employed?" />

          <div className="flex w-full flex-col gap-16">
            <Input
              name="employmentDetails.employerName"
              control={control}
              placeholder="Name of Employer"
              required
            />

            <Input
              name="employmentDetails.occupation"
              control={control}
              placeholder="Title"
              required
            />

            <Select
              name="employmentDetails.industry"
              control={control}
              options={INDUESTRIES_AS_OPTIONS}
              placeholder="Industry"
              required
            />
          </div>
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
