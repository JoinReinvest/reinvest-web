import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectFilterable } from 'components/FormElements/SelectFilterable';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
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
    return fields.residency === DomicileType.GreenCard && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    return fields.residency === DomicileType.GreenCard && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { domicile: { forGreenCard: storeFields.domicile?.forGreenCard } };
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      const { domicile } = fields;

      if (domicile?.forGreenCard?.birthCountry && domicile?.forGreenCard?.citizenshipCountry) {
        await completeProfileMutate({
          input: {
            domicile: {
              type: DomicileType.GreenCard,
              forGreenCard: { birthCountry: domicile.forGreenCard.birthCountry, citizenshipCountry: domicile.forGreenCard.citizenshipCountry },
            },
          },
        });
      }
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

          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}
          <div className="flex w-full flex-col gap-16">
            <SelectFilterable
              name="domicile.forGreenCard.citizenshipCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Citizenship Country"
            />

            <SelectFilterable
              name="domicile.forGreenCard.birthCountry"
              control={control}
              options={COUNTRIES}
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
