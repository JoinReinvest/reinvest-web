import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { Typography } from 'components/Typography';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DraftAccountType, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from 'services/queries/useSendDocumentsToS3AndGetScanIds';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';

type Fields = Pick<OnboardingFormFields, 'documentsForTrust'>;

const MINIMUM_NUMBER_OF_FILES = 1;
const MAXIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  documentsForTrust: generateMultiFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

export const StepDocumentsForTrust: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DOCUMENTS_FOR_TRUST,

  willBePartOfTheFlow: fields => {
    return fields.accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;
    const hasTrustFields = allRequiredFieldsExists([
      fields.trustType,
      fields.trustLegalName,
      fields.businessAddress,
      fields.fiduciaryEntityInformation?.industry,
      fields.fiduciaryEntityInformation?.annualRevenue,
      fields.fiduciaryEntityInformation?.numberOfEmployees,
    ]);

    return isTrustAccount && hasProfileFields && hasTrustFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const defaultValues: Fields = { documentsForTrust: storeFields.documentsForTrust || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ documentsForTrust }) => {
      const idScan = [];
      const hasDocuments = !!documentsForTrust?.length;
      const hasDocumentsToUpload = documentsForTrust?.some(document => !!document.file);
      const documentsWithoutFile = documentsForTrust?.map(({ id, fileName }) => ({ id, fileName }));

      if (hasDocuments && hasDocumentsToUpload) {
        const documentsToUpload = documentsForTrust.map(({ file }) => file).filter(Boolean) as DocumentFile[];
        const numberOfDocumentsToUpload = documentsToUpload.length;

        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOfDocumentsToUpload })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments: documentsForTrust });

        idScan.push(...scans);
      }

      try {
        const hasIdScans = !!idScan?.length;
        await updateStoreFields({ documentsForTrust: documentsWithoutFile });

        if (storeFields.accountId && hasIdScans) {
          await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { companyDocuments: idScan } });
        } else {
          moveToNextStep();
        }
      } catch (error) {
        await updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        if (storeFields.trustTrusteesGrantorsOrProtectors?.length) {
          return moveToStepByIdentifier(Identifiers.TRUST_APPLICANT_LIST);
        }

        return moveToNextStep();
      }
    }, [isSuccess, moveToNextStep, storeFields.trustTrusteesGrantorsOrProtectors?.length, moveToStepByIdentifier]);

    const subtitle = (
      <Typography variant="paragraph-large">
        <b>Required documents: </b>The Full Trust Document or Certification of Trust, List of All Trustees, Grantors and Protectors.
      </Typography>
    );

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const onClearFileFromApi = async (document: DocumentFile) => {
      // TO-DO: use mutation to remove the file from the API
    };

    if (isLoading || isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <BlackModalTitle title="Uploading Your Document" />
        </div>
      );
    }

    if (!isLoading) {
      return (
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle
              title="Upload the following documents to verify your trust."
              subtitle={subtitle}
            />
            {error && <ErrorMessagesHandler error={error} />}
            <InputMultiFile
              name="documentsForTrust"
              control={control}
              accepts={['pdf']}
              minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
              maximumNumberOfFiles={MAXIMUM_NUMBER_OF_FILES}
              onClearFileFromApi={onClearFileFromApi}
            />
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
              loading={isCreateDocumentsFileLinksLoading || isSendDocumentToS3AndGetScanIdsLoading}
            />
          </ButtonStack>
        </Form>
      );
    }

    return null;
  },
};
