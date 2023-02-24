import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { areElementsTrue } from 'utilities/array-validations';
import zod, { Schema } from 'zod';
import { formValidationRules } from '../../../formValidationRules'

import { RegisterFormFields } from '../form-fields';

type Fields = Pick<RegisterFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<RegisterFormFields> = {
  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password];

    return areElementsTrue(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: formValidationRules.authenticationCode,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const subtitleMessage = useMemo(() => `Enter the email authentication code sent to your email ${storeFields.email}.`, [storeFields.email]);

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Email"
          subtitle={subtitleMessage}
        />

        <InputAuthenticationCode
          name="authenticationCode"
          control={control}
          required
        />

        <div className="flex justify-between">
          <Link
            href="/"
            title="Resend Code"
          >
            Resend Code
          </Link>
          <Link
            href="/"
            title="Get Help"
          >
            Get Help
          </Link>
        </div>

        <Button
          type="submit"
          label="Sign Up"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
