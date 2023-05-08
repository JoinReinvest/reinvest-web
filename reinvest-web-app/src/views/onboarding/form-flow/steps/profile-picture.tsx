import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useOpenAccount } from 'reinvest-app-common/src/services/queries/openAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { sendFilesToS3Bucket } from 'services/sendFilesToS3Bucket';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const FILE_SIZE_LIMIT_IN_MEGABYTES = 5.0;
const ACCEPTED_FILES_MIME_TYPES: PartialMimeTypeKeys = ['pdf', 'png', 'jpeg'];

const schema = z.object({
  profilePicture: generateFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES),
});

export const StepProfilePicture: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields(fields) {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.address,
      fields.experience,
      fields.accountType,
    ];

    return allRequiredFieldsExists(profileFields);
  },

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const router = useRouter();
    const { profilePicture, accountId } = storeFields;
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: { profilePicture: profilePicture || null },
    });

    const {
      error: profileDetailsError,
      isLoading: isCompleteProfileDetailsLoading,
      mutateAsync: completeProfileMutate,
    } = useCompleteProfileDetails(getApiClient);
    const { error: createAvatarLinkError, isLoading: isCreateAvatarLinkLoading, mutateAsync: createAvatarLinkMutate } = useCreateAvatarFileLink(getApiClient);

    const {
      error: individualDraftAccountError,
      isLoading: isIndividualDraftAccountLoading,
      mutateAsync: completeIndividualDraftAccountMutate,
    } = useCompleteIndividualDraftAccount(getApiClient);

    const {
      error: openAccountError,
      isLoading: isOpenAccountLoading,
      mutateAsync: openAccountMutate,
      isSuccess: isOpenAccountSuccess,
    } = useOpenAccount(getApiClient);

    const {
      mutateAsync: completeTrustDraftAccount,
      error: completeDraftAccountError,
      isLoading: isCompleteDraftAccountLoading,
    } = useCompleteTrustDraftAccount(getApiClient);

    const {
      mutateAsync: completeCorporateDraftAccount,
      error: completeCorporateDraftAccountError,
      isLoading: isCompleteCorporateDraftAccountLoading,
    } = useCompleteTrustDraftAccount(getApiClient);

    const shouldButtonBeLoading =
      isCreateAvatarLinkLoading || isCompleteProfileDetailsLoading || isCompleteDraftAccountLoading || isCompleteCorporateDraftAccountLoading;

    const shouldButtonBeDisabled =
      !formState.isValid || formState.isSubmitting || isIndividualDraftAccountLoading || isOpenAccountLoading || shouldButtonBeLoading;

    const shouldSkipButtonBeDisabled = formState.isSubmitting || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ profilePicture }) => {
      await updateStoreFields({ profilePicture });
      const hasFile = !!profilePicture?.file;
      let avatarId = '';

      if (hasFile) {
        const avatarLink = await createAvatarLinkMutate({});

        if (avatarLink?.url && avatarLink.id && profilePicture?.file) {
          await sendFilesToS3Bucket([{ file: profilePicture.file, url: avatarLink.url, id: avatarLink.id, fileName: profilePicture.file.name }]);
          avatarId = avatarLink.id;
        }
      }

      if (accountId && avatarId) {
        if (!storeFields.isCompletedProfile) {
          await completeProfileMutate({ input: { verifyAndFinish: true } });
        }

        const avatar = { id: avatarId };

        let draftAccount = null;

        if (storeFields.accountType === DraftAccountType.Individual) {
          draftAccount = await completeIndividualDraftAccountMutate({
            accountId,
            input: { avatar },
          });
        }

        if (storeFields.accountType === DraftAccountType.Trust) {
          draftAccount = await completeTrustDraftAccount({ accountId, input: { avatar } });
        }

        if (storeFields.accountType === DraftAccountType.Corporate) {
          draftAccount = await completeCorporateDraftAccount({ accountId, input: { avatar } });
        }

        if (draftAccount?.isCompleted) {
          await openAccountMutate({ draftAccountId: accountId });
        }
      }
    };

    const onSkip = async () => {
      if (accountId) {
        if (!storeFields.isCompletedProfile) {
          await completeProfileMutate({ input: { verifyAndFinish: true } });
        }

        await openAccountMutate({ draftAccountId: accountId });
      }
    };

    const onFileChange = async (file: File) => {
      await updateStoreFields({ profilePicture: { fileName: file.name, file } });
    };

    useEffect(() => {
      if (isOpenAccountSuccess) {
        router.push('/');
      }
    });

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Upload Profile Picture" />
          {individualDraftAccountError && <ErrorMessagesHandler error={individualDraftAccountError} />}
          {createAvatarLinkError && <ErrorMessagesHandler error={createAvatarLinkError} />}
          {openAccountError && <ErrorMessagesHandler error={openAccountError} />}
          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}
          {completeDraftAccountError && <ErrorMessagesHandler error={completeDraftAccountError} />}
          {completeCorporateDraftAccountError && <ErrorMessagesHandler error={completeCorporateDraftAccountError} />}
          <div className="flex w-full flex-col items-center gap-12">
            <InputAvatar
              name="profilePicture"
              control={control}
              altText="Profile picture for account"
              sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
              onFileChange={onFileChange}
              accountType={storeFields.accountType}
            />

            <Typography
              variant="paragraph-large"
              className="text-white/50"
            >
              Customize your profile picture
            </Typography>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            label="Skip"
            variant="outlined"
            onClick={onSkip}
            className="text-green-frost-01"
            disabled={shouldSkipButtonBeDisabled}
          />

          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
