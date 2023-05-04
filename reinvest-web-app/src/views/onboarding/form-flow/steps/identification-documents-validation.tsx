import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ModalContent } from 'components/ModalElements/Content';
import { Typography } from 'components/Typography';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepIdentificationDocumentsValidation: StepParams<OnboardingFormFields> = {
  isAValidationView: true,

  identifier: Identifiers.IDENTIFICATION_DOCUMENTS_VALIDATION,

  willBePartOfTheFlow: fields => {
    return !fields.accountType && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
    ];

    const individualFields = [fields.ssn];

    return fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(requiredFields) && allRequiredFieldsExists(individualFields);
  },
  Component: ({ storeFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const hasSucceded = !!storeFields._didDocumentIdentificationValidationSucceed;

    const titleGenerator = () => {
      if (hasSucceded) {
        return 'Account Information Verified!';
      }

      return 'We cannot approve your account at this time';
    };

    const iconGenerator = () => {
      if (hasSucceded) {
        return <IconCheckCircle />;
      }

      return <IconXCircle />;
    };

    const onContinueButtonClick = () => {
      moveToNextStep();
    };

    return (
      <ModalContent>
        <div className="relative flex flex-col items-center gap-36">
          {iconGenerator()}

          <Typography variant="h5">{titleGenerator()}</Typography>
        </div>

        <ButtonStack>
          <Button
            label="Continue"
            onClick={onContinueButtonClick}
          />
        </ButtonStack>
      </ModalContent>
    );
  },
};
