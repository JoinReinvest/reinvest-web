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

export const StepCorporateApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_LIST,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants, companyMajorStakeholderApplicants } = fields;
    const hasMajorStakeholderApplicants = !!companyMajorStakeholderApplicants?.length;

    return !!_willHaveMajorStakeholderApplicants && hasMajorStakeholderApplicants;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const majorStakeholderApplicants = storeFields.companyMajorStakeholderApplicants || [];
    const numberOfApplicants = majorStakeholderApplicants.length;
    const hasReachedMaximumNumberOfApplicants = numberOfApplicants >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = majorStakeholderApplicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = (applicant: IndexedSchema<Applicant>) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        // set the current major stakeholder applicant as this value
        updateStoreFields({ _currentCompanyMajorStakeholder: applicant, _isEditingCompanyMajorStakeholderApplicant: true });
        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = () => {
      updateStoreFields({ _currentCompanyMajorStakeholder: undefined });
      moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
    };

    const onContinue = () => {
      moveToNextStep();
    };

    return (
      <BlackModalContent>
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <BlackModalTitle title="Your applicants." />

          <ul className="flex flex-col gap-16">
            {indexedStakeholderApplicants.map(applicant => generateApplicantListItem(corporationLegalName, applicant, () => onEditApplicant(applicant)))}
          </ul>
        </div>

        <ButtonStack>
          <Button
            variant="outlined"
            label="Add Applicant"
            onClick={onAddNewApplication}
            className="text-green-frost-01"
            disabled={hasReachedMaximumNumberOfApplicants}
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
