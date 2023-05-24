import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { useUpdateStakeholderForVerification } from 'reinvest-app-common/src/services/queries/updateStakeholderForVerification';
import { AccountType, DraftAccountType, PutFileLink } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';
import { getApiClient } from 'services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from 'services/queries/useSendDocumentsToS3AndGetScanIds';

import { useActiveAccount } from '../../../../providers/ActiveAccountProvider';
import { Applicant } from '../../../onboarding/form-flow/form-fields';
import {
  ACCEPTED_FILES_MIME_TYPES,
  APPLICANT_IDENTIFICATION,
  FILE_SIZE_LIMIT_IN_MEGABYTES,
  MAXIMUM_NUMBER_OF_FILES,
  MINIMUM_NUMBER_OF_FILES,
} from '../../../onboarding/form-flow/schemas';
import { getDefaultIdentificationValueForApplicant } from '../../../onboarding/form-flow/utilities';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<Applicant, 'identificationDocuments'>;

export const StepCorporateApplicantIdentification: StepParams<FlowFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_IDENTIFICATION,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateStakeholderData;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const accountType = activeAccount?.type === AccountType.Corporate ? DraftAccountType.Corporate : DraftAccountType.Trust;
    const defaultValues = getDefaultIdentificationValueForApplicant(storeFields, accountType);
    const { isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { control, formState, handleSubmit } = useForm<Fields>({
      resolver: zodResolver(APPLICANT_IDENTIFICATION),
      defaultValues,
    });
    const { mutateAsync: updateStakeholderMutate, isLoading: isUpdateStakeholderLoading } = useUpdateStakeholderForVerification(getApiClient);

    const shouldButtonLoading = isSendDocumentToS3AndGetScanIdsLoading || isCreateDocumentsFileLinksLoading || isLoading || isUpdateStakeholderLoading;
    const shouldButtonBeDisabled = !formState.isValid || shouldButtonLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocuments }) => {
      const { _isEditingCompanyMajorStakeholderApplicant } = storeFields;

      const currentMajorStakeholderApplicant = { ...storeFields._currentCompanyMajorStakeholder, identificationDocuments };
      const currentMajorStakeholderApplicantIndex = currentMajorStakeholderApplicant._index;
      await updateStoreFields({ _currentCompanyMajorStakeholder: currentMajorStakeholderApplicant });
      const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: 1 })) as PutFileLink[];
      const idScan: { fileName: string; id: string }[] = [];

      if (identificationDocuments) {
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments });
        idScan.push(...scans);

        if (
          !!_isEditingCompanyMajorStakeholderApplicant &&
          typeof currentMajorStakeholderApplicantIndex !== 'undefined' &&
          currentMajorStakeholderApplicantIndex >= 0 &&
          activeAccount?.id &&
          currentMajorStakeholderApplicant.id
        ) {
          const dateOfBirth = formatDate(currentMajorStakeholderApplicant.dateOfBirth || '', 'API', { currentFormat: 'DEFAULT' });
          const { firstName, lastName, middleName, residentialAddress } = currentMajorStakeholderApplicant;
          const updateStakeholderInput = {
            dateOfBirth: { dateOfBirth },
            idScan,
            name: {
              firstName,
              lastName,
              middleName,
            },
            address: {
              addressLine1: residentialAddress?.addressLine1 || '',
              addressLine2: residentialAddress?.addressLine2 || '',
              country: residentialAddress?.country || 'USA',
              city: residentialAddress?.city || '',
              zip: residentialAddress?.zip || '',
              state: residentialAddress?.state || '',
            },
          };

          await updateStakeholderMutate({
            accountId: activeAccount.id,
            stakeholderId: currentMajorStakeholderApplicant.id,
            input: updateStakeholderInput,
          });

          await updateStoreFields({ _shouldUpdateStakeholderData: false });

          const stakolders = storeFields.companyMajorStakeholderApplicants?.filter(stakeholder => stakeholder.id !== currentMajorStakeholderApplicant.id);

          if (storeFields._currentCompanyMajorStakeholder) {
            stakolders?.push(storeFields._currentCompanyMajorStakeholder);
          }

          await updateStoreFields({ companyMajorStakeholderApplicants: stakolders });
        }

        moveToStepByIdentifier(Identifiers.CORPORATE_APPLICANT_LIST);
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Upload the ID of your applicant." />
          {error && <ErrorMessagesHandler error={error} />}

          <InputMultiFile
            name="identificationDocuments"
            minimumNumberOfFiles={MINIMUM_NUMBER_OF_FILES}
            maximumNumberOfFiles={MAXIMUM_NUMBER_OF_FILES}
            sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
            accepts={ACCEPTED_FILES_MIME_TYPES}
            control={control}
            placeholderOnEmpty="Upload Files"
            placeholderOnMeetsMinimum="Add Additional Files"
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
            loading={shouldButtonLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
