import { zodResolver } from '@hookform/resolvers/zod';
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
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { sendFilesToS3Bucket } from 'services/sendFilesToS3Bucket';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'profilePicture'>;

const schema = z.object({
  profilePicture: z.custom<File>().nullable(),
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
      mode: 'all',
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
      mutate: openAccountMutate,
      isSuccess: isOpenAccountSuccess,
    } = useOpenAccount(getApiClient);

    const shouldButtonBeDisabled =
      !formState.isValid || formState.isSubmitting || isCreateAvatarLinkLoading || isIndividualDraftAccountLoading || isOpenAccountLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      const avatarLink = await createAvatarLinkMutate({});
      let avatarId = '';

      if (fields.profilePicture) {
        if (avatarLink?.url && avatarLink.id) {
          await sendFilesToS3Bucket([{ file: fields.profilePicture, url: avatarLink.url, id: avatarLink.id }]);
          avatarId = avatarLink.id;
        }
      }

      if (accountId && avatarId) {
        await completeProfileMutate({ input: { verifyAndFinish: true } });

        const avatar = { id: avatarId };
        const individualDraftAccount = await completeIndividualDraftAccountMutate({
          accountId,
          input: { avatar, verifyAndFinish: true },
        });

        if (individualDraftAccount?.isCompleted) {
          openAccountMutate({ draftAccountId: accountId });
        }
      }
    };

    const onSkip = async () => {
      if (accountId) {
        const individualDraftAccount = await completeIndividualDraftAccountMutate({
          accountId,
          input: { verifyAndFinish: true },
        });

        if (individualDraftAccount?.isCompleted) {
          openAccountMutate({ draftAccountId: accountId });
        }
      }
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
          <div className="flex w-full flex-col items-center gap-12">
            <InputAvatar
              name="profilePicture"
              control={control}
              altText="Profile picture for account"
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
            loading={isCreateAvatarLinkLoading || isIndividualDraftAccountLoading || isOpenAccountLoading || isCompleteProfileDetailsLoading}
          />

          <Button
            label="Skip"
            variant="outlined"
            onClick={onSkip}
            className="text-green-frost-01"
          />
        </ButtonStack>
      </Form>
    );
  },
};
