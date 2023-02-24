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

import { ForgotPasswordFormFields } from '../form-fields';

type Fields = Pick<ForgotPasswordFormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<ForgotPasswordFormFields> = {
  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email];

    return areElementsTrue(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<ForgotPasswordFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: zod.string().regex(/^\d{8}$/, { message: 'Invalid authentication code' }),
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const subtitleMessage = useMemo(() => `Enter the email authentication code sent to your email ${storeFields.email}.`, [storeFields.email]);

    const onSubmit: SubmitHandler<Fields> = fields => {
      // TO-DO: Validate that the authentication code the one we
      //    expect - if so call `updateStoreFields(fields)`, and then
      //    invoke `moveToNextStep()`, otherwise add an error to the input
      //    saying that they wrote the wrong authentication code.
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
          label="Sign In"
          disabled={shouldButtonBeDisabled}
        />
      </Form>
    );
  },
};
