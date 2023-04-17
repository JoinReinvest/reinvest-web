import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { MAXIMUM_NUMBER_OF_APPLICANTS } from '../schemas';

export const StepCorporateApplicantsLanding: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANTS_LANDING,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const applicants = storeFields?.trustTrusteesGrantorsOrProtectors || [];
    const hasReachedMaximumNumberOfApplicants = applicants.length >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const onAddNewApplicant = () => {
      updateStoreFields({ _willHaveMajorStakeholderApplicants: true });
      moveToNextStep();
    };

    const onSkip = () => {
      updateStoreFields({ _willHaveMajorStakeholderApplicants: false });
      moveToNextStep();
    };

    return (
      <Form>
        <FormContent>
          <BlackModalTitle
            title="Major Stakeholder Applicants"
            subtitle="For each major stakeholder with a 20% or greater equity stake, we require their information."
          />
        </FormContent>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Skip"
            onClick={onSkip}
            className="text-green-frost-01"
          />

          <Button
            label="Add Applicant"
            onClick={onAddNewApplicant}
            disabled={hasReachedMaximumNumberOfApplicants}
          />
        </ButtonStack>
      </Form>
    );
  },
};
