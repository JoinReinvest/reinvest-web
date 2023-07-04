import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { InputEmail } from '../../../../../components/FormElements/InputEmail';
import { Typography } from '../../../../../components/Typography';
import { useAuth } from '../../../../../providers/AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Type your new email';

type Fields = Omit<FlowFields, '_email' | 'authenticationCode'>;
export const StepNewEmailAddress: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_EMAIL_ADDRESS,

  isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { actions } = useAuth();
    const schema: Schema<Fields> = zod.object({
      newEmail: formValidationRules.email,
    });

    const { control, handleSubmit, formState, reset } = useForm<Fields>({ mode: 'onSubmit', resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<Fields> = async fields => {
      const result = await actions.changeEmail(fields.newEmail);

      if (result === 'SUCCESS') {
        await updateStoreFields(fields);
        moveToNextStep();
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
            <InputEmail
              name="newEmail"
              control={control}
              required
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
