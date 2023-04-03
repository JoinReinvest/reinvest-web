import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { BlackModalContent } from 'components/BlackModal/BlackModalContent';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

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
    <BlackModalContent>
      <div className="relative flex h-full flex-col gap-24 md:justify-center">
        <IconCheckCircle className="mx-auto" />
        <BlackModalTitle title="Referral code applied" />
      </div>

      <ButtonStack>
        <Button
          label="Continue"
          onClick={moveToNextStep}
        />
      </ButtonStack>
    </BlackModalContent>
  ),
};
