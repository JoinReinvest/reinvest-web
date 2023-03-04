import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Title } from 'components/Title';
import { URL } from 'constants/urls';
import { allRequiredFieldsExists, StepParams } from 'services/form-flow';

import { Link } from '../../../components/Link';
import { ForgotPasswordFormFields } from '../form-fields';

export const StepResetValidation: StepParams<ForgotPasswordFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.authenticationCode, fields.password];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    return (
      <div className="relative flex h-full flex-col items-center justify-center">
        <IconCheckCircle className="mx-auto mb-24" />
        <Title title="Your Password Has Been Reset" />

        <Link
          href={URL.login}
          title="Continue"
          className="typo-button bg-green-frost-01 text-white"
        >
          Continue
        </Link>
      </div>
    );
  },
};
