import { zodResolver } from '@hookform/resolvers/zod';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { ResendCodeLink } from 'components/Links/ResendCodeLink';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { SubmitHandler, useForm } from 'react-hook-form';
import { cognitoCallbacks } from 'services/auth/signin';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { getUserPoll } from 'services/getUserPool';
import zod, { Schema } from 'zod';

import { LoginFormFields } from '../form-fields';

const sendMfaCode = async (email: string, authCode: string) => {
  const userPool = getUserPoll();

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  return new Promise((resolve, reject) => {
    cognitoUser.sendMFACode(authCode, cognitoCallbacks(resolve, reject));
  });
};

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<LoginFormFields>) => {
    const schema: Schema<LoginFormFields> = zod.object({
      email: formValidationRules.email,
      password: formValidationRules.password,
      authenticationCode: formValidationRules.authenticationCode,
    });

    const { handleSubmit, control, formState } = useForm<LoginFormFields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<LoginFormFields> = async fields => {
      try {
        await sendMfaCode(storeFields.email, fields.authenticationCode);
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />

        <InputAuthenticationCode
          name="authenticationCode"
          control={control}
          required
        />

        <div className="my-20 flex justify-between">
          <ResendCodeLink href="/" />
          <GetHelpLink />
        </div>

        <Button
          type="submit"
          label="Sign Up"
          variant="default"
          disabled={shouldButtonBeDisabled}
          // loading={isValidatingEmail}
        />
      </Form>
    );
  },
};
