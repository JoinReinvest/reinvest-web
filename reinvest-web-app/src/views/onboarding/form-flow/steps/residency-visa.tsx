import { zodResolver } from '@hookform/resolvers/zod';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { COUNTRIES_AS_OPTIONS } from 'constants/countries';
import { VISAS_AS_OPTIONS } from 'constants/visas';
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
    } = useUpdateDataIndividualOnboarding({
      ...storeFields,
      ...getValues(),
      domicile: { forVisa: getValues().domicile?.forVisa },
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      updateData(Identifiers.RESIDENCY_VISA);
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Please enter your US Visa details." />
        <WarningMessage message="US Residents Only" />

        {profileDetailsError && <FormMessage message={profileDetailsError.message} />}

        <Select
          name="domicile.forVisa.citizenshipCountry"
          control={control}
          options={COUNTRIES_AS_OPTIONS}
          placeholder="Citizenship Country"
        />

        <Select
          name="domicile.forVisa.birthCountry"
          control={control}
          options={COUNTRIES_AS_OPTIONS}
          placeholder="Birth Country"
        />

        <Select
          name="domicile.forVisa.visaType"
          control={control}
          options={VISAS_AS_OPTIONS}
          placeholder="Visa Type"
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
          loading={isLoading}
        />
      </Form>
    );
  },
};
