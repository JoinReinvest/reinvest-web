import { StepParams } from 'services/form-flow';
import { FormFields } from '../form-fields';
import { Button } from 'components/Button';
import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Typography } from 'components/Typography';
import { areElementsTrue } from 'utilities/array-validations';

export const StepReferralCodeApplied: StepParams<FormFields> = {
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];

    return areElementsTrue(requiredFields);
  },

  Component: ({ moveToNextStep }) => (
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
  ),
};
