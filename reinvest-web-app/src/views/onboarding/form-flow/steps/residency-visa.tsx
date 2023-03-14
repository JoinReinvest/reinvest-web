import { zodResolver } from '@hookform/resolvers/zod';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { Select } from 'components/Select';
import { Title } from 'components/Title';
import { COUNTRIES_AS_OPTIONS } from 'constants/countries';
import { VISAS_AS_OPTIONS } from 'constants/visas';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'birthCountry' | 'citizenshipCountry' | 'visaType'>;

const schema = z.object({
  birthCountry: formValidationRules.birthCountry,
  citizenshipCountry: formValidationRules.citizenshipCountry,
  visaType: formValidationRules.visaType,
});

export const StepResidencyVisa: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_VISA,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { formState, control, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Please enter your US Green Card details. " />
        <WarningMessage message="US Residents Only" />

        <Select
          name="citizenshipCountry"
          control={control}
          options={COUNTRIES_AS_OPTIONS}
          placeholder="Citizenship Country"
        />

        <Select
          name="birthCountry"
          control={control}
          options={COUNTRIES_AS_OPTIONS}
          placeholder="Birth Country"
        />

        <Select
          name="visaType"
          control={control}
          options={VISAS_AS_OPTIONS}
          placeholder="Visa Type"
        />

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
