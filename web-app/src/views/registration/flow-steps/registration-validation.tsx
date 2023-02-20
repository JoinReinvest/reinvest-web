import { StepParams } from 'services/form-flow';
import { FormFields } from '../form-fields';
import { Button } from 'components/Button';
import { areElementsTrue } from 'utilities/array-validations';
import { useMemo } from 'react';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Typography } from 'components/Typography';
import { useRouter } from 'next/router';

export const StepRegistrationValidation: StepParams<FormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return areElementsTrue(requiredFields);
  },

  Component: () => {
    const router = useRouter();

    const isLoading = true;

    const title = useMemo(() => {
      if (isLoading) {
        return 'Creating your account';
      }

      return 'Your password has successfully been reset. ';
    }, [isLoading]);

    const onButtonClick = () => {
      router.push('/');
    };

    return (
      <div className="flex flex-col">
        <div className="flex flex-col items-center">
          <IconSpinner />

          <Typography variant="h5">{title}</Typography>
        </div>

        <Button
          onClick={onButtonClick}
          label="Continue"
          disabled={isLoading}
        />
      </div>
    );
  },
};
