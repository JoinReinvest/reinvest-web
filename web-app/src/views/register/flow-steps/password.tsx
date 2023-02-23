import { zodResolver } from '@hookform/resolvers/zod';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { BlackModal } from 'components/BlackModal';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { PasswordInput } from 'components/FormElements/PasswordInput';
import { WhyRequiredLink } from 'components/Links/WhyRequiredLink';
import { PasswordChecklist } from 'components/PasswordChecklist';
import { Title } from 'components/Title';
import { env } from 'env';
import { formValidationRules } from 'formValidationRules';
import { MainLayout } from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import { signup } from 'services/signin';
import zod, { Schema } from 'zod';

import { FormFields } from '../form-fields';

interface Fields extends Pick<FormFields, 'password'> {
  passwordConfirmation: string;
}

export const StepPassword: StepParams<FormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const schema: Schema<Fields> = zod.object({
      password: formValidationRules.password,
      passwordConfirmation: formValidationRules.confirm_password,
    });

    const { handleSubmit, control, watch } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const onSubmit: SubmitHandler<Fields> = async fields => {
      updateStoreFields(fields);
      const poolData = {
        UserPoolId: env.aws.cognito.userPoolId,
        ClientId: env.aws.cognito.clientId,
      };
      await signup({ email: storeFields.email, password: fields.password }, new CognitoUserPool(poolData));
      moveToNextStep();
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title
              title="Sign up to REINVEST"
              subtitle="Create a unique password for your account to continue."
            />

            <PasswordInput control={control} />
            <PasswordInput
              name="passwordConfirmation"
              control={control}
            />

            <WhyRequiredLink href="/" />

            <PasswordChecklist
              password={fields.password}
              passwordConfirmation={fields.passwordConfirmation}
            />

            <Button
              type="submit"
              label="Sign Up"
              className="absolute bottom-0 w-full md:relative md:bottom-auto"
            />
          </Form>
        </BlackModal>
      </MainLayout>
    );
  },
};
