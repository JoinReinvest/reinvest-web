import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { CircleSuccess } from 'components/CircleSuccess';
import { Title } from 'components/Title';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { confirmEmail } from 'services/auth/confirmEmail';
import { allRequiredFieldsExists, StepParams } from 'services/form-flow';

import { RegisterFormFields } from '../form-fields';

export const StepRegistrationValidation: StepParams<RegisterFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const title = useMemo(() => {
      if (isLoading) {
        return 'Creating your account';
      }

      return 'Your login credentials were successfully created';
    }, [isLoading]);

    const onButtonClick = () => {
      router.push('/');
    };

    useEffect(() => {
      confirmEmail(storeFields.email, storeFields.authenticationCode, result => {
        if (result === 'SUCCESS') {
          setIsLoading(false);
        }
      });
    }, []);

    return (
      <div className="relative flex h-full flex-col items-center justify-center">
        {isLoading ? <IconSpinner /> : <CircleSuccess />}

        <Title title={title} />

        <Button
          onClick={onButtonClick}
          label="Continue"
          disabled={isLoading}
        />
      </div>
    );
  },
};
