import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { z } from 'zod';

import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<BeneficiaryCreationFormFields, 'firstName' | 'lastName'>>;

const schema = z.object({
  firstName: formValidationRules.firstName,
  lastName: formValidationRules.lastName,
});

export const StepFullName: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.FULL_NAME,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const defaultValues: Fields = { firstName: storeFields?.firstName || '', lastName: storeFields?.lastName || '' };
    const { formState, handleSubmit, control } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ firstName, lastName }) => {
      await updateStoreFields({ firstName, lastName });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent
          useFixedGap
          willLeaveContentOnTop
        >
          <Typography variant="paragraph-large">Enter your beneficiary&apos;s name</Typography>

          <Input
            name="firstName"
            control={control}
            placeholder="First Name"
            required
          />

          <Input
            name="lastName"
            control={control}
            placeholder="Last Name"
            required
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
