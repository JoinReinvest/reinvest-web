import { IconXCircle } from 'assets/icons/IconXCircle';
import { BlackModalContent } from 'components/BlackModal/BlackModalContent';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { LinkButton } from 'components/LinkButton';
import { GetHelpLink } from 'components/Links/GetHelp';
import { Typography } from 'components/Typography';
import { EMAILS } from 'constants/urls';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepSocialSecurityNumberValidation: StepParams<OnboardingFormFields> = {
  // TO-DO: This step will be skipped if the social security number
  //      valid - use the fields `_isSocialSecurityNumberBanned` and
  //      `_isSocialSecurityNumberAlreadyAssigned` to determine the
  //      error that will be displayed.

  isAValidationView: true,

  identifier: Identifiers.SOCIAL_SECURITY_NUMBER_VALIDATION,

  willBePartOfTheFlow: fields => {
    const { _isSocialSecurityNumberAlreadyAssigned, _isSocialSecurityNumberBanned } = fields;

    return !!_isSocialSecurityNumberAlreadyAssigned || !!_isSocialSecurityNumberBanned;
  },

  Component: ({ storeFields }: StepComponentProps<OnboardingFormFields>) => {
    const { _isSocialSecurityNumberAlreadyAssigned, _isSocialSecurityNumberBanned } = storeFields;

    const getTitle = () => {
      if (_isSocialSecurityNumberAlreadyAssigned) {
        return 'Your credentials are associated with an active REINVEST account';
      }

      if (_isSocialSecurityNumberBanned) {
        return 'You are unable to create a REINVEST profile at this time.';
      }

      return '';
    };

    const getValidationDescription = () => {
      if (_isSocialSecurityNumberAlreadyAssigned) {
        return 'Please login to your active account. If you believe this an error, ';
      }

      if (_isSocialSecurityNumberBanned) {
        return 'Please reach out to ';
      }

      return '';
    };

    return (
      <BlackModalContent>
        <div className="flex w-full flex-col gap-36">
          <IconXCircle className="mx-auto" />

          <div className="flex w-full flex-col gap-24">
            <Typography
              className="lg:text-center"
              variant="h5"
            >
              {getTitle()}
            </Typography>

            <Typography
              variant="paragraph-large"
              className="lg:text-center"
            >
              {getValidationDescription()}
              <GetHelpLink label={EMAILS.support} />
            </Typography>
          </div>
        </div>

        <ButtonStack>
          <LinkButton
            href={EMAILS.supportHref}
            label="Contact"
          />
        </ButtonStack>
      </BlackModalContent>
    );
  },
};
