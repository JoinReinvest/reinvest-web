import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
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
    const { companyMajorStakeholderApplicants, accountType } = fields;

    return !!companyMajorStakeholderApplicants?.length && accountType === DraftAccountType.Corporate;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const majorStakeholderApplicants = storeFields.companyMajorStakeholderApplicants || [];
    const numberOfApplicants = majorStakeholderApplicants.length;
    const hasReachedMaximumNumberOfApplicants = numberOfApplicants >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = majorStakeholderApplicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        await updateStoreFields({
          _currentCompanyMajorStakeholder: { ...applicant, _index: applicant._index },
          _isEditingCompanyMajorStakeholderApplicant: true,
        });
        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = async () => {
      await updateStoreFields({ _currentCompanyMajorStakeholder: undefined });
      moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
    };

    const onContinue = async () => {
      moveToStepByIdentifier(Identifiers.PROFILE_PICTURE);
    };

    return (
      <ModalContent>
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <ModalTitle title="Your applicants." />

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
      </ModalContent>
    );
  },
};
