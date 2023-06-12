import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { Schema } from 'zod';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { PasswordChecklist } from '../../../../../components/Checklist/Password';
import { InputPassword } from '../../../../../components/FormElements/InputPassword';
import { Typography } from '../../../../../components/Typography';
import { useAuth } from '../../../../../providers/AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Type your new password';

type Fields = Omit<FlowFields, 'currentPassword'>;
export const StepNewPassword: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_PASSWORD,

  isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep, storeFields }: StepComponentProps<FlowFields>) => {
    const { actions } = useAuth();
    const schema: Schema<Fields> = formValidationRules.confirmationPassword;

    const { control, handleSubmit, formState, watch, reset } = useForm<Fields>({ mode: 'onSubmit', resolver: zodResolver(schema) });

    const fields = {
      password: watch('password'),
      passwordConfirmation: watch('passwordConfirmation'),
    };

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      if (fields.password && storeFields.currentPassword) {
        const result = await actions.changePassword(storeFields.currentPassword, fields.password);

        if (result === 'SUCCESS') {
          await updateStoreFields({ _hasSucceded: true });
          moveToNextStep();
          reset();
        }
      }
    };

    const onButtonBackClick = () => {
      reset();
      moveToPreviousStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <InputPassword
              name="password"
              control={control}
              required
            />

            <InputPassword
              name="passwordConfirmation"
              control={control}
              required
              placeholder="Confirm Password"
            />
            <PasswordChecklist
              password={fields.password}
              passwordConfirmation={fields.passwordConfirmation}
              blackColorText
            />
          </div>
        </FormContent>
        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
