import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputAvatar } from 'components/FormElements/InputAvatar';
import { Typography } from 'components/Typography';
import { useCorporateAccount } from 'hooks/corporate-account';
import { useIndividualAccount } from 'hooks/individual-account';
import { useTrustAccount } from 'hooks/trust-account';
import { useAccountManagement } from 'providers/AccountManagement';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useUpdateBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/updateBeneficiaryAccount';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { sendFilesToS3Bucket } from 'services/sendFilesToS3Bucket';
import { ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES } from 'views/onboarding/form-flow/schemas';
import { z } from 'zod';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Update Profile Picture';
const TITLE = 'Edit your current profile picture';

const schema = z.object({
  profilePicture: generateFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, true),
});

export const StepCurrentAvatar: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_PASSWORD,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { control, handleSubmit, formState, clearErrors } = useForm<FlowFields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      shouldFocusError: true,
    });
    const { setCurrentFlowIdentifier, toggleShouldRefetchAccounts, onModalOpenChange } = useAccountManagement();
    const { mutateAsync: updateBeneficiaryAccount, ...updateBeneficiaryAccountMeta } = useUpdateBeneficiaryAccount(getApiClient);
    const { updateCorporateAccount, updateCorporateAccountMeta } = useCorporateAccount({
      accountId: activeAccount?.id ?? '',
      enabled: activeAccount?.type === AccountType.Corporate,
    });
    const { updateTrustAccount, updateTrustAccountMeta } = useTrustAccount({
      accountId: activeAccount?.id ?? '',
      enabled: activeAccount?.type === AccountType.Trust,
    });
    const { updateIndividualAccount, updateIndividualAccountMeta } = useIndividualAccount();
    const { mutateAsync: createAvatarLink } = useCreateAvatarFileLink(getApiClient);

    const shouldBackButtonBeDisabled = formState.isSubmitting;
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || !formState.isDirty;

    const onSubmit: SubmitHandler<FlowFields> = async ({ profilePicture }) => {
      const accountId = activeAccount?.id;
      clearErrors();

      if (!profilePicture) {
        setCurrentFlowIdentifier(null);
        onModalOpenChange(false);
      }

      if (profilePicture?.file && accountId) {
        const avatarLink = await createAvatarLink({ fileName: profilePicture.fileName });
        const avatarId = avatarLink?.id;
        const avatarUrl = avatarLink?.url;

        if (avatarId && avatarUrl) {
          await sendFilesToS3Bucket([{ file: profilePicture.file, url: avatarUrl, id: avatarId, fileName: profilePicture.file.name }]);

          if (activeAccount?.type === AccountType.Individual) {
            await updateIndividualAccount({ avatar: { id: avatarId } });
          }

          if (activeAccount?.type === AccountType.Trust) {
            await updateTrustAccount({ avatar: { id: avatarId } });
          }

          if (activeAccount?.type === AccountType.Corporate) {
            await updateCorporateAccount({ avatar: { id: avatarId } });
          }

          if (activeAccount?.type === AccountType.Beneficiary) {
            await updateBeneficiaryAccount({ accountId, input: { avatar: { id: avatarId } } });
          }
        }
      }
    };

    const onFileChange = async (file: File) => {
      await updateStoreFields({ profilePicture: { fileName: file.name, file } });
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    useEffect(() => {
      const isSuccess =
        updateIndividualAccountMeta.isSuccess ||
        updateCorporateAccountMeta.isSuccess ||
        updateTrustAccountMeta.isSuccess ||
        updateBeneficiaryAccountMeta.isSuccess;

      if (isSuccess) {
        updateStoreFields({ _hasSucceded: true });
        toggleShouldRefetchAccounts(true);
        moveToNextStep();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updateIndividualAccountMeta.isSuccess, updateCorporateAccountMeta.isSuccess, updateTrustAccountMeta.isSuccess, updateBeneficiaryAccountMeta.isSuccess]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldBackButtonBeDisabled}
          />

          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <InputAvatar
              name="profilePicture"
              control={control}
              fallbackLabel={activeAccount?.avatar?.initials ?? undefined}
              altText="Profile picture for account"
              sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
              onFileChange={onFileChange}
              accountType={activeAccount?.type ?? AccountType.Individual}
              src={activeAccount?.avatar?.url ?? undefined}
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
