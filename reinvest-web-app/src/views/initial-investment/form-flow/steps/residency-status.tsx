import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS, RESIDENCY_STATUS_VALUES } from 'reinvest-app-common/src/constants/residenty-status';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'residency'>;

const schema = z.object({
  residency: z.enum(RESIDENCY_STATUS_VALUES),
});

export const StepResidencyStatus: StepParams<FlowFields> = {
  identifier: Identifiers.RESIDENCY_STATUS,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateProfileDetails;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { ...storeFields };
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { handleSubmit, formState, control } = form;

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      return moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle
            title="Residency Status"
            subtitle="Please select your US residency status."
            informationMessage="REINVEST does not accept non-US residents at this time."
          />
          <RadioGroupOptions
            name="residency"
            control={control}
            options={RESIDENCY_STATUS_AS_RADIO_GROUP_OPTIONS}
          />
        </FormContent>

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
