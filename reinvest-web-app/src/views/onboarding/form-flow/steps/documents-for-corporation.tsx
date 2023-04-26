import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { Typography } from 'components/Typography';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { generateMultiFileSchema } from 'reinvest-app-common/src/form-schemas/files';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';
import { DraftAccountType, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';

type Fields = Pick<OnboardingFormFields, 'documentsForCorporation'>;

const MINIMUM_NUMBER_OF_FILES = 1;
const MAXIMUM_NUMBER_OF_FILES = 5;

const schema = z.object({
  documentsForCorporation: generateMultiFileSchema(ACCEPTED_FILES_MIME_TYPES, FILE_SIZE_LIMIT_IN_MEGABYTES, MINIMUM_NUMBER_OF_FILES, MAXIMUM_NUMBER_OF_FILES),
});

export const StepDocumentsForCorporation: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DOCUMENTS_FOR_TRUST,

  willBePartOfTheFlow: fields => {
    return fields.accountType === DraftAccountType.Corporate;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isCorporateAccount = fields.accountType === DraftAccountType.Corporate;
    const hasCorporateFields = allRequiredFieldsExists([
      fields.corporationType,
      fields.corporationLegalName,
      fields.businessAddress,
      fields.fiduciaryEntityInformation?.industry,
      fields.fiduciaryEntityInformation?.annualRevenue,
      fields.fiduciaryEntityInformation?.numberOfEmployees,
      fields.ein,
    ]);

    return isCorporateAccount && hasProfileFields && hasCorporateFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<OnboardingFormFields>) => {
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);
    const defaultValues: Fields = { documentsForCorporation: storeFields.documentsForCorporation || [] };
    const { control, formState, handleSubmit } = useForm<Fields>({
      defaultValues: async () => defaultValues,
      resolver: zodResolver(schema),
      mode: 'all',
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ documentsForCorporation }) => {
      const idScan = [];
      const hasDocuments = !!documentsForCorporation?.length;
      const hasDocumentsToUpload = documentsForCorporation?.some(document => !!document.file);
      const documentsWithoutFile = documentsForCorporation?.map(({ id, fileName }) => ({ id, fileName }));

      if (hasDocuments && hasDocumentsToUpload) {
        const documentsToUpload = documentsForCorporation.map(({ file }) => file).filter(Boolean) as DocumentFile[];
        const numberOfDocumentsToUpload = documentsToUpload.length;

        const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: numberOfDocumentsToUpload })) as PutFileLink[];
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments: documentsForCorporation });

        idScan.push(...scans);
      }

      try {
        const hasIdScans = !!idScan?.length;
        await updateStoreFields({ documentsForCorporation: documentsWithoutFile });

        if (storeFields.accountId && hasIdScans) {
          await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { companyDocuments: idScan } });
        } else {
          moveToNextStep();
        }
      } catch (error) {
        await updateStoreFields({ _didDocumentIdentificationValidationSucceed: false });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        if (storeFields.companyMajorStakeholderApplicants?.length) {
          return moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_LIST);
        }

        return moveToNextStep();
      }
    }, [isSuccess, moveToNextStep, moveToStepByIdentifier, storeFields.companyMajorStakeholderApplicants?.length]);

    const subtitle = (
      <Typography variant="paragraph-large">
        <b>Required documents: </b>Articles of Incorporation, Certificate of Formation, By-laws, Shareholders and Authorized Signers List
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
              title="Upload the following documents to verify your organization."
              subtitle={subtitle}
            />
            {error && <ErrorMessagesHandler error={error} />}

            <InputMultiFile
              name="documentsForCorporation"
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
            />
          </ButtonStack>
        </Form>
      );
    }

    return null;
  },
};
