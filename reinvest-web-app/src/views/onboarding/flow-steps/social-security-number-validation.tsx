import { IconXCircle } from 'assets/icons/IconXCircle';
import { LinkButton } from 'components/LinkButton';
import { GetHelpLink } from 'components/Links/GetHelp';
import { Title } from 'components/Title';
import { Typography } from 'components/Typography';
import { EMAILS } from 'constants/urls';
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
            Please reach out to <GetHelpLink label={EMAILS.support} />
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
