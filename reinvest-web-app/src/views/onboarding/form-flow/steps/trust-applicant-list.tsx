import { BlackModalContent } from 'components/BlackModal/BlackModalContent';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { Applicant, IndexedSchema, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { MAXIMUM_NUMBER_OF_APPLICANTS } from '../schemas';
import { generateApplicantListItem } from '../utilities';

export const StepTrustApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANT_LIST,

  doesMeetConditionFields: fields => {
    const { _willHaveTrustTrusteesGrantorsOrProtectors, trustTrusteesGrantorsOrProtectors } = fields;
    const hasApplicants = !!trustTrusteesGrantorsOrProtectors?.length;

    return !!_willHaveTrustTrusteesGrantorsOrProtectors && hasApplicants;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const applicants = storeFields.trustTrusteesGrantorsOrProtectors || [];
    const hasReachedMaximumNumberOfApplicants = applicants.length >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const indexedApplicants: IndexedSchema<Applicant>[] = applicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = (applicant: IndexedSchema<Applicant>) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        updateStoreFields({ _currentTrustTrusteeGrantorOrProtector: applicant, _isEditingTrustTrusteeGrantorOrProtector: true });
        moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = () => {
      updateStoreFields({ _currentTrustTrusteeGrantorOrProtector: undefined });
      moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
    };

    const onContinue = () => {
      moveToNextStep();
    };

    return (
      <BlackModalContent>
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <BlackModalTitle title="Your applicants." />

          <ul className="flex flex-col gap-16">
            {indexedApplicants.map(applicant => generateApplicantListItem(corporationLegalName, applicant, () => onEditApplicant(applicant)))}
          </ul>
        </div>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Add Applicant"
            onClick={onAddNewApplication}
            disabled={hasReachedMaximumNumberOfApplicants}
            className="text-green-frost-01"
          />

          <Button
            label="Continue"
            onClick={onContinue}
          />
        </ButtonStack>
      </BlackModalContent>
    );
  },
};
