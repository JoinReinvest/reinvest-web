import { IconXCircle } from 'assets/icons/IconXCircle';
import { Link } from 'components/Link';
import { LinkButton } from 'components/LinkButton';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { StepParams } from 'services/form-flow';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepSocialSecurityNumberValidation: StepParams<OnboardingFormFields> = {
  // TO-DO: This step will be skipped if the social security number
  //      valid - use the fields `_isSocialSecurityNumberBanned` and
  //      `_isSocialSecurityNumberAlreadyAssigned` to determine the
  //      error that will be displayed.

  isAValidationView: true,

  identifier: Identifiers.SOCIAL_SECURITY_NUMBER_VALIDATION,

  Component: () => {
    return (
      <div>
        <Title title="Enter your first and last name as it appears on your ID" />

        <div className="text-center">
          <Typography variant="paragraph-large">
            Please reach out to{' '}
            <Link
              href="mailto:support@reinvestcommunity.com"
              title="Support email"
            >
              support@reinvestcommunity.com
            </Link>
          </Typography>

          <IconXCircle className="mx-auto mt-40" />

          <LinkButton
            href="mailto:support@reinvestcommunity.com"
            label="Contact"
          />
        </div>
      </div>
    );
  },
};
