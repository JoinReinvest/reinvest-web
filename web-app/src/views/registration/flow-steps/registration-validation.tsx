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
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
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
        </BlackModal>
      </MainLayout>
    );
  },
};
