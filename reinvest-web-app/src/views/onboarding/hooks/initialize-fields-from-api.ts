import { useEffect } from 'react';
import { useGetPhoneCompleted } from 'reinvest-app-common/src/services/queries/getPhoneCompleted';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

import { OnboardingFormFields } from '../form-flow/form-fields';

interface Params {
  updateStoreFields: (fields: Partial<OnboardingFormFields>) => Promise<void>;
}

export const useInitializeFieldsFromApi = ({ updateStoreFields }: Params) => {
  const { data: profileData } = useGetUserProfile(getApiClient);
  const { data: phoneCompleted } = useGetPhoneCompleted(getApiClient);

  useEffect(() => {
    async function updateStoreFieldsWithProfileData() {
      if (profileData) {
        const profileDetails = profileData.details;

        const statementTypes = (profileDetails?.statements?.map(statement => statement?.type || null).filter(statementType => statementType) ||
          []) as StatementType[];
        const finraInstitutionName = profileData?.details?.statements?.find(statement => statement?.type === StatementType.FinraMember)?.details;

        const identificationDocuments: DocumentFile[] = profileDetails?.idScan?.map(idScan => ({ id: idScan?.id, fileName: idScan?.fileName })) || [];

        await updateStoreFields({
          address: profileDetails?.address,
          name: {
            firstName: profileDetails?.firstName || '',
            lastName: profileDetails?.lastName || '',
            middleName: profileDetails?.middleName || '',
          },
          dateOfBirth: profileDetails?.dateOfBirth,
          residency: profileDetails?.domicile?.type,
          experience: profileDetails?.experience,
          isAccreditedInvestor: statementTypes.includes(StatementType.AccreditedInvestor),
          statementTypes,
          identificationDocuments,
          isCompletedProfile: !!profileData?.isCompleted,
          finraInstitutionName: finraInstitutionName ? (finraInstitutionName[0] as string) : '',
          ssn: profileData?.details?.ssn || '',
        });
      }
    }

    updateStoreFieldsWithProfileData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileData]);

  useEffect(() => {
    async function updateStoreFieldPhoneNumber() {
      if (phoneCompleted) {
        await updateStoreFields({
          _isPhoneCompleted: phoneCompleted,
        });
      }
    }

    updateStoreFieldPhoneNumber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phoneCompleted]);
};
