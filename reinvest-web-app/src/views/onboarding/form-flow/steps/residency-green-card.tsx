import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Select } from 'components/Select';
import { COUNTRIES_AS_OPTIONS } from 'constants/countries';
import { formValidationRules } from 'formValidationRules';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DomicileType } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'domicile'>;

const schema = z.object({
  domicile: z.object({
    forGreenCard: z.object({
      birthCountry: formValidationRules.birthCountry,
      citizenshipCountry: formValidationRules.citizenshipCountry,
    }),
  }),
});

export const StepResidencyGreenCard: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_GREEN_CARD,
  willBePartOfTheFlow(fields) {
    return (fields.residency === DomicileType.GreenCard || fields.residency === DomicileType.Citizen) && !fields.isCompletedProfile;
  },
  doesMeetConditionFields(fields) {
    return (fields.residency === DomicileType.GreenCard || fields.residency === DomicileType.Citizen) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, control, handleSubmit, getValues } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      isLoading,
      updateData,
      isSuccess,
      error: { profileDetailsError },
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      updateData(Identifiers.RESIDENCY_GREEN_CARD, { ...storeFields, ...getValues() });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Please enter your US Green Card details."
            informationMessage="US Residents Only"
          />

          {profileDetailsError && <FormMessage message={profileDetailsError.message} />}
          <div className="flex w-full flex-col gap-16">
            <Select
              name="domicile.forGreenCard.citizenshipCountry"
              control={control}
              options={COUNTRIES_AS_OPTIONS}
              placeholder="Citizenship Country"
            />

            <Select
              name="domicile.forGreenCard.birthCountry"
              control={control}
              options={COUNTRIES_AS_OPTIONS}
              placeholder="Birth Country"
            />
          </div>
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
