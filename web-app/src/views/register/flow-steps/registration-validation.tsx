import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { CircleSuccess } from 'components/CircleSuccess';
import { Typography } from 'components/Typography';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { StepParams } from 'services/form-flow';
import { areElementsTrue } from 'utilities/array-validations';

import { FormFields } from '../form-fields';

export const StepRegistrationValidation: StepParams<FormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return areElementsTrue(requiredFields);
  },

  Component: () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    const title = useMemo(() => {
      if (isLoading) {
        return 'Creating your account';
      }

      return 'Your password has successfully been reset. ';
    }, [isLoading]);

    const onButtonClick = () => {
      router.push('/');
    };

    useEffect(() => {
      // TO-DO: Attempt to create an user with the fields gathered
      //    thus far - then update the `title` according to the API's
      //    response - this should be done as soon as we arrive to this
      //    view.

      const timeout = setTimeout(() => {
        setIsLoading(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }, []);

    return (
      <div className="relative flex h-full flex-col items-center justify-center">
        {isLoading ? <IconSpinner /> : <CircleSuccess />}

        <Typography variant="h5">{title}</Typography>

        <Button
          onClick={onButtonClick}
          label="Continue"
          disabled={isLoading}
        />
      </div>
    );
  },
};
