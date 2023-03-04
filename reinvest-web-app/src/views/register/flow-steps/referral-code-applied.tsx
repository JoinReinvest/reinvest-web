import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';

import { RegisterFormFields } from '../form-fields';

export const StepReferralCodeApplied: StepParams<RegisterFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ moveToNextStep }: StepComponentProps<RegisterFormFields>) => (
    <div className="relative flex h-full flex-col gap-24 md:justify-center">
      <IconCheckCircle className="mx-auto" />

      <Title title="Referral code applied" />

      <Button
        label="Continue"
        onClick={moveToNextStep}
      />
    </div>
  ),
};
