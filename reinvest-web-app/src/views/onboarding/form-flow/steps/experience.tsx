import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { EXPERIENCES_AS_OPTIONS } from 'reinvest-app-common/src/constants/experiences';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DraftAccountType, Experience } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'experience'>;

const schema = z.object({
  experience: z.enum([Experience.VeryExperienced, Experience.Expert, Experience.NoExperience, Experience.SomeExperience]),
});

export const StepExperience: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EXPERIENCE,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual && !fields.isCompletedProfile;
  },
  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn];

    return fields.accountType === DraftAccountType.Individual && !fields.isCompletedProfile && allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess, data } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ experience }) => {
      await updateStoreFields({ experience });
      await completeProfileMutate({ input: { investingExperience: { experience } } });
    };

    useEffect(() => {
      if (isSuccess) {
        if (data?.isCompleted) {
          updateStoreFields({ isCompletedProfile: true });
        }

        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep, data, updateStoreFields]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="What is your experience with real estate investment?" />

          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}
          <SelectionCards
            name="experience"
            control={control}
            options={EXPERIENCES_AS_OPTIONS}
            className="flex flex-col items-stretch justify-center gap-22 lg:gap-24"
            orientation="vertical"
            required
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
