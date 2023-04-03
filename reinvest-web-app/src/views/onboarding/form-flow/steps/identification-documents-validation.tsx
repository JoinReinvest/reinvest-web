import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { IconXCircle } from 'assets/icons/IconXCircle';
import { BlackModalContent } from 'components/BlackModal/BlackModalContent';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
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
    // TO-DO: If the documents were not valid, the text and
    //      action for the button may be different.
    //      https://www.figma.com/file/cNXTaZ5MhSXw4i34QJF4lv?node-id=507:85955#390094223

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
      <BlackModalContent>
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
      </BlackModalContent>
    );
  },
};
