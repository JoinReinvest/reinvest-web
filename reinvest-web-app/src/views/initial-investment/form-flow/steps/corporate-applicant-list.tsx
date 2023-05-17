import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { Applicant, IndexedSchema } from '../../../onboarding/form-flow/form-fields';
import { MAXIMUM_NUMBER_OF_APPLICANTS } from '../../../onboarding/form-flow/schemas';
import { generateApplicantListItem } from '../../../onboarding/form-flow/utilities';
import { FlowFields } from '../fields';
// import { Applicant, IndexedSchema } from '../form-fields';
import { Identifiers } from '../identifiers';

export const StepCorporateApplicantList: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_LIST,

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
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
            // onClick={onAddNewApplication}
            className="text-green-frost-01"
            disabled={hasReachedMaximumNumberOfApplicants}
          />

          <Button
            label="Continue"
            // onClick={onContinue}
          />
        </ButtonStack>
      </ModalContent>
    );
  },
};
