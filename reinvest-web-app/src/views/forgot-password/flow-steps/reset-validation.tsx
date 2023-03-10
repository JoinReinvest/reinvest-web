import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { LinkButton } from 'components/LinkButton';
import { Title } from 'components/Title';
import { URL } from 'constants/urls';
import { allRequiredFieldsExists, StepParams } from 'services/form-flow';

import { ForgotPasswordFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepResetValidation: StepParams<ForgotPasswordFormFields> = {
  identifier: Identifiers.VALIDATION_COMPLETION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.authenticationCode, fields.password];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    return (
      <div className="relative flex h-full flex-col items-center justify-center">
        <div>
          <IconCheckCircle className="mx-auto mb-24" />
          <Title
            title="Your Password Has Been Reset"
            className="text-center"
          />
        </div>
        <LinkButton
          href={URL.login}
          label="Continue"
        />
      </div>
    );
  },
};
