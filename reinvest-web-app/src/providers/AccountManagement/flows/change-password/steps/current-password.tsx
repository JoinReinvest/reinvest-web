import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputPassword } from 'components/FormElements/InputPassword';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import zod, { Schema } from 'zod';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Continue';
const TITLE = 'Type your current password';

type Fields = Pick<FlowFields, 'currentPassword'>;
export const StepCurrentPassword: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_PASSWORD,

  Component: ({ moveToNextStep, updateStoreFields, storeFields }: StepComponentProps<FlowFields>) => {
    const schema: Schema<Fields> = zod.object({
      currentPassword: formValidationRules.password,
    });
    const { control, handleSubmit, formState, setError, clearErrors } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      shouldFocusError: true,
    });
    const { setCurrentFlowIdentifier } = useAccountManagement();

    useEffect(() => {
      if (storeFields?._wasCurrentPasswordIncorrect) {
        setError('currentPassword', { type: 'value', message: 'Current Password Incorrect' });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const shouldBackButtonBeDisabled = formState.isSubmitting;
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ currentPassword }) => {
      clearErrors();
      await updateStoreFields({ currentPassword });
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldBackButtonBeDisabled}
          />

          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <InputPassword
              name="currentPassword"
              control={control}
              required
              iconWhite={false}
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
