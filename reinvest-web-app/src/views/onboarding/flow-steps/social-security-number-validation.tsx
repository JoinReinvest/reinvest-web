import { IconXCircle } from 'assets/icons/IconXCircle';
import { LinkButton } from 'components/LinkButton';
import { GetHelpLink } from 'components/Links/GetHelp';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { EMAILS } from 'constants/urls';
import { StepComponentProps, StepParams } from 'services/form-flow';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepSocialSecurityNumberValidation: StepParams<OnboardingFormFields> = {
  // TO-DO: This step will be skipped if the social security number
  //      valid - use the fields `_isSocialSecurityNumberBanned` and
  //      `_isSocialSecurityNumberAlreadyAssigned` to determine the
  //      error that will be displayed.

  isAValidationView: true,

  identifier: Identifiers.SOCIAL_SECURITY_NUMBER_VALIDATION,

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
      <div>
        <Title title={getTitle()} />

        <div className="text-center">
          <Typography variant="paragraph-large">
            {getValidationDescription()}
            <GetHelpLink label={EMAILS.support} />
          </Typography>

          <IconXCircle className="mx-auto mt-40" />

          <LinkButton
            href={EMAILS.supportHref}
            label="Contact"
          />
        </div>
      </div>
    );
  },
};
