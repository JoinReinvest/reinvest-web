import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PartialMimeTypeKeys } from 'reinvest-app-common/src/constants/mime-types';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DocumentFileLinkInput, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { IconCircleError } from '../../../../../assets/icons/IconCircleError';
import { ButtonBack } from '../../../../../components/ButtonBack';
import { InputMultiFile } from '../../../../../components/FormElements/InputMultiFile';
import { Typography } from '../../../../../components/Typography';
import { useUserProfile } from '../../../../../providers/UserProfile';
import { getApiClient } from '../../../../../services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { FILE_SIZE_LIMIT_IN_MEGABYTES } from '../../../../onboarding/form-flow/schemas';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Please upload your Driver’s License or Passport for further verification';
const SUBTITLE = 'This will trigger an extra verification process.';

type Fields = FlowFields;

const ACCEPTED_FILE_MIME_TYPES: PartialMimeTypeKeys = ['jpeg', 'jpg', 'pdf', 'png'];
const MINIMUM_NUMBER_OF_FILES = 1;
const MAXIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  identificationDocuments: generateMultiFileSchema(ACCEPTED_FILE_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

export const StepIdentificationDocument: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.IDENTIFICATION_DOCUMENT,

  isAValidationView: true,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep, storeFields }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields = { identificationDocuments: [] };
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    // const { isLoading: isUpdateProfileUpdating, mutateAsync: updateProfile } = useUpdateProfile(getApiClient);
    const { updateUserProfile, updateUserProfileMeta } = useUserProfile();
    const { control, handleSubmit, formState, reset } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled =
      !formState.isValid ||
      formState.isSubmitting ||
      isCreateDocumentsFileLinksLoading ||
      isSendDocumentToS3AndGetScanIdsLoading ||
      updateUserProfileMeta.isLoading;
    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocuments }) => {
      const existedDocuments = identificationDocuments?.filter(document => !!document.id) as DocumentFileLinkInput[];
      const idScan = existedDocuments?.length ? [...existedDocuments] : [];

      const hasDocuments = !!identificationDocuments?.length;
      const hasDocumentsToUpload = identificationDocuments?.some(document => !!document.file);
      const documentsWithoutFile = identificationDocuments?.map(({ id, fileName }) => ({ id, fileName }));

      if (hasDocuments && hasDocumentsToUpload) {
        const documentsToUpload = identificationDocuments.map(({ file }) => file).filter(Boolean) as DocumentFile[];
        const numberOfDocumentsToUpload = documentsToUpload.length;
        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOfDocumentsToUpload })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments: documentsToUpload });
        idScan.push(...scans);
      }

      try {
        const hasIdScans = !!idScan?.length;

        if (hasIdScans) {
          const name = storeFields.name;
          await updateUserProfile({ idScan, name });
          await updateStoreFields({ identificationDocuments: documentsWithoutFile, _hasSucceded: true });
          moveToNextStep();
        }
      } catch (error) {
        await updateStoreFields({ _hasSucceded: false });
      }
    };

    const onButtonBackClick = () => {
      reset();
      moveToPreviousStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <InputMultiFile
              name="identificationDocuments"
              minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
              maximumNumberOfFiles={MAXIMUM_NUMBER_OF_FILES}
              sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
              accepts={ACCEPTED_FILE_MIME_TYPES}
              control={control}
              placeholderOnEmpty="Upload Files"
              placeholderOnMeetsMinimum="Add Additional Files"
            />
            {!shouldButtonBeDisabled && (
              <Typography variant="paragraph-small">
                <span className="flex items-center gap-9 text-gray-01">
                  <IconCircleError className="inline-block" /> {SUBTITLE}
                </span>
              </Typography>
            )}
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
