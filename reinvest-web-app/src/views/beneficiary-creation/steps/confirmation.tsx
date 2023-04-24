import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';

import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepConfirmation: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.INVESTING_PROMPT,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const onSubmit: FormEventHandler<HTMLFormElement> = event => {
      event.preventDefault();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent
          useFixedGap
          willLeaveContentOnTop
        >
          <div className="flex flex-col gap-36">
            <Typography variant="h5">
              Let&apos;s build generational wealth! <br /> Make your first investment to set up your beneficiary&apos;s account and get started. 💰💪
            </Typography>

            <div className="flex justify-center">
              <IconCheckCircle />
            </div>
          </div>
        </FormContent>

        <ButtonStack useRowOnLgScreen>
          <Button
            type="submit"
            label="Invest"
          />
        </ButtonStack>
      </Form>
    );
  },
};
