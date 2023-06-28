import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { parsePhoneNumber } from 'reinvest-app-common/src/utilities/phoneNumber';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { Typography } from '../../../../../components/Typography';
import { useAuth } from '../../../../../providers/AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Update Phone Number';
const TITLE = 'Your phone number';

export const StepCurrentPhoneNumber: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_PHONE_NUMBER,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { user } = useAuth();
    const { handleSubmit, formState } = useForm({ mode: 'onSubmit' });
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const [phoneNumber, setPhoneNumber] = useState('');

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit = async () => {
      moveToNextStep();
    };

    useEffect(() => {
      user?.getUserAttributes((_err, attrs) => setPhoneNumber(parsePhoneNumber(attrs?.find(attr => attr.Name === 'phone_number')?.Value ?? '').formatted));
    }, [user]);

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            {phoneNumber && (
              <Typography
                variant="paragraph-emphasized"
                className="flex flex-col"
              >
                {phoneNumber}
              </Typography>
            )}
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
