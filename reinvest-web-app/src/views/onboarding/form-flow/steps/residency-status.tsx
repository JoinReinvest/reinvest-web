import { zodResolver } from '@hookform/resolvers/zod';
import { WarningMessage } from 'components/BlackModal/WarningMessage';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { Title } from 'components/Title';
import { RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS, RESIDENCY_STATUS_VALUES } from 'constants/residenty-status';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { DomicileType } from 'types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'domicile'>;

const schema = z.object({
  domicile: z.object({
    type: z.enum(RESIDENCY_STATUS_VALUES),
  }),
});

export const StepResidencyStatus: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.RESIDENCY_STATUS,

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.accountType,
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
    ];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { domicile: storeFields.domicile };
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { getValues, handleSubmit } = form;
    const { isLoading } = useUpdateDataIndividualOnboarding({ ...storeFields, ...getValues() });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);

      if (getValues().domicile.type === DomicileType.Visa) {
        moveToStepByIdentifier(Identifiers.RESIDENCY_VISA);
      } else {
        moveToStepByIdentifier(Identifiers.RESIDENCY_GREEN_CARD);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Residency Status"
          subtitle="Please select your US residency status."
        />
        <WarningMessage message="REINVEST does not accept non-US residents at this time." />

        <RadioGroupOptions
          name="domicile.type"
          control={form.control}
          options={RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS}
        />

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
