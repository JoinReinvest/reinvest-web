import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { StepParams } from 'services/form-flow';
import { areElementsTrue } from 'utilities/array-validations';

import { ForgotPasswordFormFields } from '../form-fields';

export const StepResetValidation: StepParams<ForgotPasswordFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.authenticationCode, fields.password];

    return areElementsTrue(requiredFields);
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
