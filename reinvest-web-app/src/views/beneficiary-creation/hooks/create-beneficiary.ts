import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';
import { useOpenBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/openBeneficiaryAccount';
import { BeneficiaryAccount, CreateBeneficiaryInput, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { sendFilesToS3Bucket } from 'services/sendFilesToS3Bucket';

import { BeneficiaryCreationFormFields } from '../form-fields';

interface Return {
  createBeneficiary: (storeFields: BeneficiaryCreationFormFields) => Promise<void>;
  error: ErrorResponse | null;
  hasSucceded: boolean;
  isLoading: boolean;
  beneficiary?: Maybe<BeneficiaryAccount>;
}

export function useCreateBeneficiary(): Return {
  const { individualAccount, userProfileMeta } = useActiveAccount();
  const { error: errorAvatarLink, isLoading: isAvatarLinkMutationLoading, mutateAsync: createAvatarLinkMutate } = useCreateAvatarFileLink(getApiClient);

  const {
    data: beneficiary,
    error: mutationError,
    isLoading: isMutationLoading,
    mutateAsync: openBeneficiaryAccountMutate,
    isSuccess: isMutationSuccess,
  } = useOpenBeneficiaryAccount(getApiClient);

  async function createBeneficiary(storeFields: BeneficiaryCreationFormFields) {
    const individualAccountId = individualAccount?.id;
    const { firstName, lastName } = storeFields;

    if (firstName && lastName && individualAccountId) {
      const avatarLinkId = await maybeCreateAvatarLink(storeFields);

      const input: CreateBeneficiaryInput = {
        name: {
          firstName,
          lastName,
        },
        ...(avatarLinkId && { avatar: { id: avatarLinkId } }),
      };

      await openBeneficiaryAccountMutate({ input, individualAccountId });
      userProfileMeta.refetch();
    }
  }

  async function maybeCreateAvatarLink({ profilePicture }: BeneficiaryCreationFormFields) {
    const hasFile = !!profilePicture?.file;

    if (hasFile) {
      const avatarLink = await createAvatarLinkMutate({});

      if (avatarLink?.url && avatarLink.id && profilePicture?.file) {
        await sendFilesToS3Bucket([{ file: profilePicture.file, url: avatarLink.url, id: avatarLink.id, fileName: profilePicture.file.name }]);

        return avatarLink.id;
      }
    }

    return null;
  }

  return {
    beneficiary,
    createBeneficiary,
    error: mutationError || errorAvatarLink,
    isLoading: isMutationLoading || isAvatarLinkMutationLoading,
    hasSucceded: isMutationSuccess,
  };
}
