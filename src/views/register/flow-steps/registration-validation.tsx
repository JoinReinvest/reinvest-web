import { IconSpinner } from 'assets/icons/IconSpinner';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { Button } from 'components/Button';
import { CircleSuccess } from 'components/CircleSuccess';
import { Title } from 'components/Title';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { confirmEmail } from 'services/auth/confirmEmail';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';

import { RegisterFormFields } from '../form-fields';

export const StepRegistrationValidation: StepParams<RegisterFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<RegisterFormFields>) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

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
          setError('');

          return setIsLoading(false);
        }

        setError(result);
      });
    }, [storeFields.authenticationCode, storeFields.email]);

    return (
      <div className="relative flex h-full flex-col items-center justify-center">
        {isLoading && !error && <IconSpinner />}
        {error && <IconXCircle />}
        {!isLoading && !error && <CircleSuccess />}

        <Title title={error ? error : title} />

        <Button
          onClick={onButtonClick}
          label="Continue"
          disabled={isLoading || !!error}
        />
      </div>
    );
  },
};
