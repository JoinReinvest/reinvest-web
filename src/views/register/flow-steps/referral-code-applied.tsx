import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { areArrayElementsTrue, StepComponentProps, StepParams } from 'services/form-flow';

import { RegisterFormFields } from '../form-fields';

export const StepReferralCodeApplied: StepParams<RegisterFormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];

    return areArrayElementsTrue(requiredFields);
  },

  Component: ({ moveToNextStep }: StepComponentProps<RegisterFormFields>) => (
    <div className="relative flex h-full flex-col items-center justify-center">
      <IconCheckCircle className="mx-auto mb-24" />
      <Title title="Referral code applied" />

      <Button
        label="Continue"
        onClick={moveToNextStep}
        className="absolute bottom-0 w-full md:relative md:bottom-auto"
      />
    </div>
  ),
};
