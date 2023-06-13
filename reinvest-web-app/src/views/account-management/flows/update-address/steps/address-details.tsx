import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Your address.';
const BUTTON_LABEL = 'Update Address';

export const StepAddressDetails: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.ADDRESS_DETAILS,

  doesMeetConditionFields: fields => {
    return !!fields?._currentAddress;
  },

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useFlowsManager();

    const address = storeFields?._currentAddress;
    const addressCityWithState = [address?.city, address?.state].join(', ');
    const addressFields = [address?.addressLine1, address?.addressLine2, addressCityWithState, address?.zip];
    const validAddressFields = addressFields.filter(Boolean);

    const onSubmit: FormEventHandler<HTMLFormElement> = event => {
      event.preventDefault();
      moveToNextStep();
    };

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <Typography
              variant="paragraph-emphasized"
              className="flex flex-col"
            >
              {validAddressFields.map((field, index) => (
                <span key={index}>{field}</span>
              ))}
            </Typography>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
