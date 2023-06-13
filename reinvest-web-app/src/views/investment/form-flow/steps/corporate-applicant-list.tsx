import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ModalContent } from 'components/ModalElements/Content';
import { ModalTitle } from 'components/ModalElements/Title';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useUpdateCompanyForVerification } from 'reinvest-app-common/src/services/queries/updateCompanyForVerification';
import { AccountType, SimplifiedDomicileType } from 'reinvest-app-common/src/types/graphql';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { useActiveAccount } from '../../../../providers/ActiveAccountProvider';
import { getApiClient } from '../../../../services/getApiClient';
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
    const { activeAccount } = useActiveAccount();
    const corporationLegalName = lowerCaseWithoutSpacesGenerator(storeFields.corporationLegalName || '');
    const majorStakeholderApplicants = storeFields.companyMajorStakeholderApplicants || storeFields.trustTrusteesGrantorsOrProtectors || [];
    const { mutateAsync } = useUpdateCompanyForVerification(getApiClient);

    const indexedStakeholderApplicants: IndexedSchema<Applicant>[] = majorStakeholderApplicants.map((item, index) => ({
      ...item,
      _index: index,
    }));

    const onEditApplicant = async (applicant: IndexedSchema<Applicant>) => {
      const hasIndex = applicant._index !== undefined;

      if (hasIndex) {
        if (activeAccount?.type === AccountType.Trust) {
          await updateStoreFields({
            _currentTrustTrusteeGrantorOrProtector: { ...applicant, _index: applicant._index },
            _isEditingTrustTrusteeGrantorOrProtector: true,
          });
        } else {
          await updateStoreFields({
            _currentCompanyMajorStakeholder: { ...applicant, _index: applicant._index },
            _isEditingCompanyMajorStakeholderApplicant: true,
          });
        }

        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_DETAILS);
      }
    };

    const onContinue = async () => {
      const { corporationLegalName, corporationType, businessAddress, companyMajorStakeholderApplicants } = storeFields;

      if (
        storeFields._shouldUpdateCompanyData &&
        activeAccount?.id &&
        corporationLegalName &&
        corporationType &&
        businessAddress &&
        companyMajorStakeholderApplicants
      ) {
        const stakeholdersForInput = companyMajorStakeholderApplicants.map(stakeholder => ({
          id: stakeholder.id,
          name: {
            firstName: stakeholder.firstName,
            lastName: stakeholder.lastName,
            middleName: stakeholder.middleName,
          },
          dateOfBirth: { dateOfBirth: stakeholder.dateOfBirth },
          ssn: { ssn: stakeholder.socialSecurityNumber },
          address: {
            addressLine1: stakeholder?.residentialAddress?.addressLine1 || '',
            addressLine2: stakeholder?.residentialAddress?.addressLine2 || '',
            zip: stakeholder?.residentialAddress?.zip || '',
            state: stakeholder?.residentialAddress?.state || '',
            city: stakeholder?.residentialAddress?.city || '',
            country: stakeholder?.residentialAddress?.country || '',
          },
          domicile: {
            type: stakeholder.domicile || SimplifiedDomicileType.Resident,
          },
          idScan: stakeholder.idScan || [],
        }));

        await mutateAsync({
          accountId: activeAccount.id,
          input: {
            companyType: { type: corporationType },
            address: {
              addressLine1: businessAddress.addressLine1 || '',
              addressLine2: businessAddress.addressLine2 || '',
              zip: businessAddress.zip || '',
              state: businessAddress.state || '',
              city: businessAddress.city || '',
              country: businessAddress.country || '',
            },
            companyName: { name: corporationLegalName },
            stakeholders: stakeholdersForInput,
          },
        });
      }

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
