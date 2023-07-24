import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { LinkButton } from 'components/LinkButton';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
import { URL } from 'constants/urls';
import { allRequiredFieldsExists, StepParams } from 'reinvest-app-common/src/services/form-flow';

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
      <ModalContent>
        <div className="flex flex-col items-center justify-center gap-24">
          <IconCheckCircle />

          <ModalTitle
            title="Your Password Has Been Reset"
            className="text-center"
          />
        </div>

        <ButtonStack>
          <LinkButton
            href={URL.login}
            label="Continue"
          />
        </ButtonStack>
      </ModalContent>
    );
  },
};
