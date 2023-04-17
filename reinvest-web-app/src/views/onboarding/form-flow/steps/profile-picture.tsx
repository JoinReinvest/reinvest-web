import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Typography } from 'components/Typography';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useOpenAccount } from 'reinvest-app-common/src/services/queries/openAccount';
import { useRemoveDraftAccount } from 'reinvest-app-common/src/services/queries/removeDraftAccount';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { sendFilesToS3Bucket } from 'services/sendFilesToS3Bucket';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const FILE_SIZE_LIMIT_IN_MEGABYTES = 5.0;

export const StepProfilePicture: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.PROFILE_PICTURE,

  doesMeetConditionFields(fields) {
    const profileFields = [
      fields.name?.firstName,
      fields.name?.lastName,
      fields.dateOfBirth,
      fields.residency,
      fields.ssn,
      fields.identificationDocuments?.length,
      fields.accountType,
    ];

    const individualAccountFields = [fields.netIncome, fields.netWorth];

    return (fields.accountType === DraftAccountType.Individual && allRequiredFieldsExists(profileFields)) || allRequiredFieldsExists(individualAccountFields);
  },

  Component: ({ storeFields, updateStoreFields }: StepComponentProps<OnboardingFormFields>) => {
    const router = useRouter();
    const { profilePicture, accountId } = storeFields;
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onChange',
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
      error: removeDraftAccountError,
      isLoading: isRemoveDraftAccountLoading,
      mutateAsync: removeDraftAccountMutate,
    } = useRemoveDraftAccount(getApiClient);

    const {
      error: openAccountError,
      isLoading: isOpenAccountLoading,
      mutateAsync: openAccountMutate,
      isSuccess: isOpenAccountSuccess,
    } = useOpenAccount(getApiClient);

    const shouldButtonBeDisabled =
      !formState.isValid ||
      formState.isSubmitting ||
      isCreateAvatarLinkLoading ||
      isIndividualDraftAccountLoading ||
      isOpenAccountLoading ||
      isRemoveDraftAccountLoading;

    const shouldButtonBeLoading =
      isCreateAvatarLinkLoading || isIndividualDraftAccountLoading || isOpenAccountLoading || isCompleteProfileDetailsLoading || isRemoveDraftAccountLoading;

    const shouldSkipButtonBeDisabled = formState.isSubmitting || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ profilePicture }) => {
      await updateStoreFields({ profilePicture });
      const willUploadAvatar = !profilePicture?.id;
      const hasFile = !!profilePicture?.file;
      let avatarId = '';

      if (!willUploadAvatar && hasFile) {
        const avatarLink = await createAvatarLinkMutate({});

        if (avatarLink?.url && avatarLink.id && profilePicture?.file) {
          await sendFilesToS3Bucket([{ file: profilePicture.file, url: avatarLink.url, id: avatarLink.id }]);
          avatarId = avatarLink.id;
        }
      }

      if (accountId && avatarId) {
        if (!storeFields.isCompletedProfile) {
          await completeProfileMutate({ input: { verifyAndFinish: true } });
        }

        const avatar = { id: avatarId };

        const individualDraftAccount = await completeIndividualDraftAccountMutate({
          accountId,
          input: { avatar },
        });

        if (individualDraftAccount?.isCompleted) {
          await openAccountMutate({ draftAccountId: accountId });
          await removeDraftAccountMutate({ draftAccountId: accountId });
        }
      }
    };

    const onSkip = async () => {
      if (accountId) {
        if (!storeFields.isCompletedProfile) {
          await completeProfileMutate({ input: { verifyAndFinish: true } });
        }

        const individualDraftAccount = await completeIndividualDraftAccountMutate({
          accountId,
          input: {},
        });

        if (individualDraftAccount?.isCompleted) {
          await openAccountMutate({ draftAccountId: accountId });
          await removeDraftAccountMutate({ draftAccountId: accountId });
        }
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onFileChange = async (oldFile: DocumentFile) => {
      // TO-DO: Check if the old file has been uploaded to S3 and
      //    delete it if it has an `id`.
    };

    useEffect(() => {
      if (isOpenAccountSuccess) {
        router.push('/');
      }
    });

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Upload Profile Picture" />
          {individualDraftAccountError && <ErrorMessagesHandler error={individualDraftAccountError} />}
          {createAvatarLinkError && <ErrorMessagesHandler error={createAvatarLinkError} />}
          {openAccountError && <ErrorMessagesHandler error={openAccountError} />}
          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}
          {removeDraftAccountError && <ErrorMessagesHandler error={removeDraftAccountError} />}
          <div className="flex w-full flex-col items-center gap-12">
            <InputAvatar
              name="profilePicture"
              control={control}
              altText="Profile picture for account"
              sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
              onFileChange={onFileChange}
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
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonBeLoading}
          />

          <Button
            label="Skip"
            variant="outlined"
            onClick={onSkip}
            className="text-green-frost-01"
            disabled={shouldSkipButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
