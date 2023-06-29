import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateAvatarFileLink } from 'reinvest-app-common/src/services/queries/createAvatarFileLink';
import { useUpdateIndividualAccount } from 'reinvest-app-common/src/services/queries/updateIndividualAccount';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { InputAvatar } from '../../../../../components/FormElements/InputAvatar';
import { useActiveAccount } from '../../../../../providers/ActiveAccountProvider';
import { getApiClient } from '../../../../../services/getApiClient';
import { sendFilesToS3Bucket } from '../../../../../services/sendFilesToS3Bucket';
import { ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../../../../onboarding/form-flow/schemas';
import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Continue';
// const TITLE = 'Type your current password';

const schema = z.object({
  profilePicture: generateFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, true),
});

export const StepCurrentAvatar: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_PASSWORD,

  Component: ({ updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { control, handleSubmit, formState, clearErrors } = useForm<FlowFields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      shouldFocusError: true,
    });
    const { setCurrentFlowIdentifier } = useFlowsManager();
    const { mutateAsync: updateIndividualAccount } = useUpdateIndividualAccount(getApiClient);
    const { mutateAsync: createAvatarLink } = useCreateAvatarFileLink(getApiClient);

    const shouldBackButtonBeDisabled = formState.isSubmitting;
    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<FlowFields> = async ({ profilePicture }) => {
      const accountId = activeAccount?.id;

      if (profilePicture?.file && accountId) {
        const avatarLink = await createAvatarLink({ fileName: profilePicture.fileName });
        const avatarId = avatarLink?.id;
        const avatarUrl = avatarLink?.url;

        if (avatarId && avatarUrl) {
          await sendFilesToS3Bucket([{ file: profilePicture.file, url: avatarUrl, id: avatarId, fileName: profilePicture.file.name }]);

          if (activeAccount?.type === AccountType.Individual) {
            await updateIndividualAccount({ accountId, input: { avatar: { id: avatarId } } });
          }
        }
      }

      clearErrors();
      await updateStoreFields({});
      // moveToNextStep();
    };

    const onFileChange = async (file: File) => {
      await updateStoreFields({ profilePicture: { fileName: file.name, file } });
    };

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldBackButtonBeDisabled}
          />

          <div className="flex flex-col gap-16">
            <InputAvatar
              name="profilePicture"
              control={control}
              altText="Profile picture for account"
              sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
              onFileChange={onFileChange}
              accountType={activeAccount?.type ?? AccountType.Individual}
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
