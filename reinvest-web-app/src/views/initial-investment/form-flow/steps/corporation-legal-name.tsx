import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<FlowFields, 'corporationLegalName'>;

const schema = z.object({
  corporationLegalName: z.string().trim().min(1),
});

export const StepCorporationLegalName: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATION_LEGAL_NAME,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateCompanyData;
  },

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { corporationLegalName: storeFields.corporationLegalName || '' };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Enter your Corporation's legal name." />

          <Input
            name="corporationLegalName"
            control={control}
            placeholder="Corporate Legal Name"
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
