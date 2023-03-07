import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputSocialSecurityNumber } from 'components/FormElements/InputSocialSecurityNumber';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'socialSecurityNumber'>;

const schema = z.object({
  socialSecurityNumber: formValidationRules.socialSecurityNumber,
});

export const StepSocialSecurityNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SOCIAL_SECURITY_NUMBER,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = ({ socialSecurityNumber }) => {
      //  TO-DO: Begin verifying if the social security number is valid
      //      and assigned to another account
      const isSocialSecurityNumberValid = true;
      const isSocialSecurityNumberAlreadyAssigned = false;
      const updatedMeta = { ...storeFields.meta, isSocialSecurityNumberValid, isSocialSecurityNumberAlreadyAssigned };
      updateStoreFields({ socialSecurityNumber, meta: updatedMeta });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Enter your first and last name as it appears on your ID" />

        <InputSocialSecurityNumber
          name="socialSecurityNumber"
          control={control}
        />

        <OpenModalLink
          label="Required. Why?"
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => {}} //
        />

        <Typography variant="paragraph-large">*REINVEST is required by law to collect your social security number.</Typography>

        <Typography
          variant="paragraph"
          className="text-gray-02"
        >
          We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.
        </Typography>

        <Button
          type="submit"
          label="Continue"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
