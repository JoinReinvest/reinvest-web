import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Select } from 'components/Select';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { COUNTRIES } from 'reinvest-app-common/src/constants/countries';
import { VISAS_AS_OPTIONS } from 'reinvest-app-common/src/constants/visas';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DomicileType } from 'reinvest-app-common/src/types/graphql';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { z } from 'zod';

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
    return fields.residency === DomicileType.Visa;
  },
  doesMeetConditionFields(fields) {
    return fields.residency === DomicileType.Visa;
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
      await updateData(Identifiers.RESIDENCY_VISA, {
        ...storeFields,
        ...getValues(),
        domicile: { forVisa: getValues().domicile?.forVisa },
      });
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

          {profileDetailsError && <FormMessage message={profileDetailsError.message} />}

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
