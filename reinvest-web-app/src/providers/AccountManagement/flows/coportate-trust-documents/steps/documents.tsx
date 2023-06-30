import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { Typography } from 'components/Typography';
import {
  ACCEPTED_FILES_MIME_TYPES,
  CORPORATE_MAXIMUM_NUMBER_OF_DOCUMENTS,
  CORPORATE_MINIMUM_NUMBER_OF_DOCUMENTS,
  CORPORATE_TRUST_DOCUMENTS_SCHEMA_RESOLVER,
} from 'constants/documents';
import { useToggler } from 'hooks/toggler';
import { useAccountManagement } from 'providers/AccountManagement';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DocumentFile } from 'reinvest-app-common/src/types/document-file';

import { DocumentsConfirmationDialog } from '../components/DocumentsConfirmationDialog';
import { useHandleDocuments } from '../hooks/handle-documents';
import { FlowFields, FlowStepIdentifiers, FormFields } from '../interfaces';

const TITLE = 'Documents';
const BUTTON_LABEL = 'Confirm';

export const StepDocuments: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.DOCUMENTS,

  doesMeetConditionFields: fields => {
    return !!fields?.documents?.length && fields?._isCorporateAccount !== undefined;
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const documents = storeFields?.documents ?? [];
    const isCorporateAccount = !!storeFields?._isCorporateAccount;
    const accountId = storeFields?._accountId ?? '';

    const [hasChangedDocuments, setHasChangedDocuments] = useState(false);
    const { uploadDocuments, uploadDocumentsMeta, addDocumentToRemove } = useHandleDocuments({ accountId, isCorporateAccount });
    const form = useForm<FormFields>({
      mode: 'onChange',
      defaultValues: async () => ({ documents }),
      resolver: CORPORATE_TRUST_DOCUMENTS_SCHEMA_RESOLVER,
    });

    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();
    const [isConfirmationModalOpen, toggleIsConfirmationModalOpen] = useToggler(false);

    useEffect(() => {
      if (uploadDocumentsMeta.isSuccess) {
        setCurrentFlowIdentifier(null);
        onModalOpenChange(false);
      }
    }, [uploadDocumentsMeta.isSuccess, setCurrentFlowIdentifier, onModalOpenChange]);

    const shouldButtonBeLoading = uploadDocumentsMeta.isLoading || form.formState.isSubmitting;
    const shouldButtonBeDisabled = !hasChangedDocuments || shouldButtonBeLoading || !form.formState.isValid;

    async function onDocumentsUpdateConfirm() {
      const documents = form.getValues('documents');
      await uploadDocuments({ documents });
    }

    const onSubmit: SubmitHandler<FormFields> = () => {
      toggleIsConfirmationModalOpen();
    };

    function onButtonBackClick() {
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    }

    function onClearFileFromApi(document: DocumentFile) {
      addDocumentToRemove(document);
      setHasChangedDocuments(true);
    }

    return (
      <>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <FormContent willLeaveContentOnTop>
            <ButtonBack
              onClick={onButtonBackClick}
              disabled={shouldButtonBeLoading}
            />

            <Typography variant="h5">{TITLE}</Typography>

            <InputMultiFile
              name="documents"
              control={form.control}
              variant="contained"
              accepts={ACCEPTED_FILES_MIME_TYPES}
              minimumNumberOfFiles={CORPORATE_MINIMUM_NUMBER_OF_DOCUMENTS}
              maximumNumberOfFiles={CORPORATE_MAXIMUM_NUMBER_OF_DOCUMENTS}
              onClearFileFromApi={onClearFileFromApi}
              onFilesChange={() => setHasChangedDocuments(true)}
              disabled={shouldButtonBeLoading}
            />
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label={BUTTON_LABEL}
              loading={shouldButtonBeLoading}
            />
          </ButtonStack>
        </Form>

        <DocumentsConfirmationDialog
          isModalOpen={isConfirmationModalOpen}
          onModalOpenChange={toggleIsConfirmationModalOpen}
          onConfirm={onDocumentsUpdateConfirm}
        />
      </>
    );
  },
};
