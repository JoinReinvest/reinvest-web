import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModal } from 'components/BlackModal';
import { Button } from 'components/Button';
import { CircleSuccess } from 'components/CircleSuccess';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { confirmEmail } from 'services/confirmEmail';
import { StepParams } from 'services/form-flow';
import { areElementsTrue } from 'utilities/array-validations';

import { RegisterFormFields } from '../form-fields';

export const StepRegistrationValidation: StepParams<RegisterFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password, fields.authenticationCode];

    return areElementsTrue(requiredFields);
  },

  Component: ({ storeFields }) => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

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
      setIsOpen(true);
      confirmEmail(storeFields.email, storeFields.authenticationCode, result => {
        if (result === 'SUCCESS') {
          setIsLoading(false);
        }
      });
    }, []);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
          <div className="relative flex h-full flex-col items-center justify-center">
            {isLoading ? <IconSpinner /> : <CircleSuccess />}

            <Typography
              variant="h5"
              className="text-center"
            >
              {title}
            </Typography>

            <Button
              onClick={onButtonClick}
              label="Continue"
              disabled={isLoading}
              className="absolute bottom-0 w-full md:relative md:bottom-auto"
            />
          </div>
        </BlackModal>
      </MainLayout>
    );
  },
};
