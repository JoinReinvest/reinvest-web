import { BlackModalContent } from 'components/BlackModal/BlackModalContent';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { AddressInput, DraftAccountType, SimplifiedDomicileType } from 'reinvest-app-common/src/types/graphql';
import { formatDateForApi } from 'reinvest-app-common/src/utilities/dates';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
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
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);

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
      if (storeFields.accountId) {
        const stakeholders = storeFields.companyMajorStakeholderApplicants?.map(applicant => ({
          name: {
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            middleName: applicant.middleName,
          },
          dateOfBirth: {
            dateOfBirth: formatDateForApi(applicant.dateOfBirth || ''),
          },
          address: { ...applicant.residentialAddress, country: 'USA' } as AddressInput,
          idScan: applicant.idScan || [],
          ssn: {
            ssn: applicant.socialSecurityNumber || '',
          },
          domicile: {
            type: applicant.domicile || SimplifiedDomicileType.Citizen,
          },
        }));

        await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { stakeholders } });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToStepByIdentifier(Identifiers.PROFILE_PICTURE);
      }
    }, [isSuccess, moveToStepByIdentifier]);

    return (
      <BlackModalContent>
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <BlackModalTitle title="Your applicants." />
          {error && <ErrorMessagesHandler error={error} />}

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
            disabled={isLoading}
            loading={isLoading}
          />
        </ButtonStack>
      </BlackModalContent>
    );
  },
};
