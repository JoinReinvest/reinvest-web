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

export const StepTrustApplicantList: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANT_LIST,

  doesMeetConditionFields: fields => {
    const { trustTrusteesGrantorsOrProtectors } = fields;

    return !!trustTrusteesGrantorsOrProtectors?.length;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const applicants = storeFields.trustTrusteesGrantorsOrProtectors || [];
    const hasReachedMaximumNumberOfApplicants = applicants.length >= MAXIMUM_NUMBER_OF_APPLICANTS;

    const indexedApplicants: IndexedSchema<Applicant>[] = applicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        await updateStoreFields({
          _currentTrustTrusteeGrantorOrProtector: { ...applicant, _index: applicant._index },
          _isEditingTrustTrusteeGrantorOrProtector: true,
          _willHaveTrustTrusteesGrantorsOrProtectors: true,
        });
        moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = async () => {
      await updateStoreFields({ _currentTrustTrusteeGrantorOrProtector: undefined, _willHaveTrustTrusteesGrantorsOrProtectors: true });
      moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
    };

    const onContinue = async () => {
      moveToStepByIdentifier(Identifiers.PROFILE_PICTURE);
    };

    return (
      <ModalContent>
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <ModalTitle title="Your applicants." />
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
      </ModalContent>
    );
  },
};
