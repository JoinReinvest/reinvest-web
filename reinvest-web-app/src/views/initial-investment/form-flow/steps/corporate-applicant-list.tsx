import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { Applicant, IndexedSchema } from '../../../onboarding/form-flow/form-fields';
import { generateApplicantListItem } from '../../../onboarding/form-flow/utilities';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

export const StepCorporateApplicantList: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_LIST,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateStakeholderData;
  },

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const majorStakeholderApplicants = storeFields.companyMajorStakeholderApplicants || [];

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

    const onContinue = async () => {
      moveToStepByIdentifier(Identifiers.INVESTMENT_VERIFICATION);
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
            label="Submit"
            onClick={onContinue}
          />
        </ButtonStack>
      </ModalContent>
    );
  },
};
