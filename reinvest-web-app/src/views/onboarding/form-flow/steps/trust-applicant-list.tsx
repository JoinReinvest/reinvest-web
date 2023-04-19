import { BlackModalContent } from 'components/BlackModal/BlackModalContent';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType, SimplifiedDomicileType } from 'reinvest-app-common/src/types/graphql';
import { formatDateForApi } from 'reinvest-app-common/src/utilities/dates';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
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
    return accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const router = useRouter();
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
        });
        moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
      }
    };

    const onAddNewApplication = async () => {
      await updateStoreFields({ _currentTrustTrusteeGrantorOrProtector: undefined });
      moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_DETAILS);
    };

    const onContinue = async () => {
      if (storeFields.accountId) {
        const stakeholders = storeFields.trustTrusteesGrantorsOrProtectors?.map(applicant => ({
          name: {
            firstName: applicant.firstName,
            lastName: applicant.lastName,
            middleName: applicant.middleName,
          },
          dateOfBirth: {
            dateOfBirth: formatDateForApi(applicant.dateOfBirth || ''),
          },
          address: {
            addressLine1: 'Address line 1',
            addressLine2: 'Address line 2',
            city: 'Test city',
            zip: '11111',
            country: 'USA',
            state: 'California',
          },
          idScan: applicant.idScan || [],
          ssn: {
            ssn: applicant.socialSecurityNumber || '',
          },
          domicile: {
            type: applicant.domicile || SimplifiedDomicileType.Citizen,
          },
        }));

        await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { stakeholders } });
      }
    };

    useEffect(() => {
      if (isSuccess && storeFields.isCompletedProfile) {
        router.push('/');
      }

      if (isSuccess && !storeFields.isCompletedProfile) {
        moveToNextStep();
      }
    }, [isSuccess, storeFields, moveToNextStep, router]);

    if (isLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <BlackModalTitle title="Verifying your applicant information." />
        </div>
      );
    }

    return (
      <BlackModalContent>
        <div className="flex flex-col gap-60 lg:justify-center lg:gap-16">
          <BlackModalTitle title="Your applicants." />
          {error && <ErrorMessagesHandler error={error} />}
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
