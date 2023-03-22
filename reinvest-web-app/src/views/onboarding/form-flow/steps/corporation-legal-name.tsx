import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { Input } from 'components/FormElements/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'corporationLegalName'>;

const schema = z.object({
  corporationLegalName: z.string().min(1),
});

export const StepCorporationLegalName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_LEGAL_NAME,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === 'CORPORATE';
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { corporationLegalName: storeFields.corporationLegalName || '' };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <BlackModalTitle title="Enter your Corporation's legal name." />

        <Input
          name="corporationLegalName"
          control={control}
          placeholder="Corporate Legal Name"
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
