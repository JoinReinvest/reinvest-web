import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { Title } from 'components/Title';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'services/form-flow';
import { ButtonStack } from 'components/FormElements/ButtonStack';

import { RegisterFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepReferralCodeApplied: StepParams<RegisterFormFields> = {
  identifier: Identifiers.REFERRAL_CODE_VERIFICATION,
  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.referralCode];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ moveToNextStep }: StepComponentProps<RegisterFormFields>) => (
    <div className="relative flex h-full flex-col gap-24 md:justify-center">
      <IconCheckCircle className="mx-auto" />

      <Title title="Referral code applied" />

      <ButtonStack>
        <Button
          label="Continue"
          onClick={moveToNextStep}
        />
      </ButtonStack>
    </div>
  ),
};
