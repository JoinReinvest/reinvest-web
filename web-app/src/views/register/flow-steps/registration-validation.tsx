import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModal } from 'components/BlackModal';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
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

  Component: ({ storeFields }) => {
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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    useEffect(() => {
      if (storeFields.authenticationCodeConfirm) {
        setIsLoading(false);
      }
    }, [storeFields]);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
          <div className="relative flex h-full flex-col items-center justify-center">
            <IconSpinner />

            <Typography variant="h5">{title}</Typography>

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
