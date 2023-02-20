import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { BlackModal } from 'components/BlackModal';
import { Button } from 'components/Button';
import { Typography } from 'components/Typography';
import { MainLayout } from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { StepParams } from 'services/form-flow';
import { areElementsTrue } from 'utilities/array-validations';

import { FormFields } from '../form-fields';

export const StepReferralCodeApplied: StepParams<FormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];

    return areElementsTrue(requiredFields);
  },

  Component: ({ moveToNextStep }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
          <div>
            <div>
              <IconCheckCircle />
              <Typography variant="h5">Referral code applied </Typography>
            </div>

            <Button
              label="Continue"
              onClick={moveToNextStep}
            />
          </div>
        </BlackModal>
      </MainLayout>
    );
  },
};
