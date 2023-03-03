import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
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
    const router = useRouter();

    const onButtonClick = () => {
      router.push(URL.login);
    };

    return (
      <div className="relative flex h-full flex-col items-center justify-center">
        <IconCheckCircle className="mx-auto mb-24" />
        <Title title="Your Password Has Been Reset" />

        <Button
          label="Continue"
          onClick={onButtonClick}
          className="absolute bottom-0 w-full md:relative md:bottom-auto"
        />
      </div>
    );
  },
};
