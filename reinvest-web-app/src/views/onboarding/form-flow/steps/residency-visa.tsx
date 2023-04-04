import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Select } from 'components/Select';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { VISAS_AS_OPTIONS } from 'reinvest-app-common/src/constants/visas';
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
    forVisa: z.object({
      birthCountry: formValidationRules.birthCountry,
      citizenshipCountry: formValidationRules.citizenshipCountry,
      visaType: formValidationRules.visaType,
    }),
  }),
});

export const StepResidencyVisa: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_VISA,
  willBePartOfTheFlow(fields) {
    return fields.residency === DomicileType.Visa && !fields.isCompletedProfile;
  },
  doesMeetConditionFields(fields) {
    return fields.residency === DomicileType.Visa && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      const { domicile } = fields;

      if (domicile?.forVisa?.visaType && domicile?.forVisa?.birthCountry && domicile?.forVisa?.citizenshipCountry) {
        await completeProfileMutate({
          input: {
            domicile: {
              type: DomicileType.Visa,
              forVisa: {
                visaType: domicile.forVisa.visaType,
                birthCountry: domicile.forVisa.birthCountry,
                citizenshipCountry: domicile.forVisa.citizenshipCountry,
              },
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
            title="Please enter your US Visa details."
            informationMessage="US Residents Only"
          />

          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}

          <div className="flex w-full flex-col gap-16">
            <Select
              name="domicile.forVisa.citizenshipCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Citizenship Country"
            />

            <Select
              name="domicile.forVisa.birthCountry"
              control={control}
              options={COUNTRIES}
              placeholder="Birth Country"
            />

            <Select
              name="domicile.forVisa.visaType"
              control={control}
              options={VISAS_AS_OPTIONS}
              placeholder="Visa Type"
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
