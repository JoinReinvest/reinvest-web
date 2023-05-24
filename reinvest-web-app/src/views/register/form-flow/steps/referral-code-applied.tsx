import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
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
    <ModalContent>
      <div className="relative flex h-full flex-col gap-24 md:justify-center">
        <IconCheckCircle className="mx-auto" />
        <ModalTitle title="Referral code applied" />
      </div>

      <ButtonStack>
        <Button
          label="Continue"
          onClick={moveToNextStep}
        />
      </ButtonStack>
    </ModalContent>
  ),
};
