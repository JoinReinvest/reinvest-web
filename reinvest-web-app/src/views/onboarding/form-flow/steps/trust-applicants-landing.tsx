import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepTrustApplicantsLanding: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === AccountType.Trust;
  },

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const onAddNewApplicant = () => {
      updateStoreFields({ _willHaveTrustTrusteesGrantorsOrProtectors: true });
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ _willHaveTrustTrusteesGrantorsOrProtectors: false });
      moveToNextStep();
    };

    return (
      <Form>
        <FormContent>
          <BlackModalTitle
            title="Other Trustees, Grantors and Protectors "
            subtitle="For all other  Trustees, Grantors and Protectors that are included in the same Trust, we require their information."
          />
        </FormContent>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Add Applicant"
            className="text-green-frost-01"
            onClick={onAddNewApplicant}
          />

          <Button
            label="Skip"
            onClick={onSkip}
          />
        </ButtonStack>
      </Form>
    );
  },
};
