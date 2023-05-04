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
import { AddressInput, DraftAccountType, PutFileLink, SimplifiedDomicileType, Stakeholder } from 'reinvest-app-common/src/types/graphql';
import { formatDateForApi } from 'reinvest-app-common/src/utilities/dates';
import { getApiClient } from 'services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from 'services/queries/useSendDocumentsToS3AndGetScanIds';

import { Applicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import {
  ACCEPTED_FILES_MIME_TYPES,
  APPLICANT_IDENTIFICATION,
  FILE_SIZE_LIMIT_IN_MEGABYTES,
  MAXIMUM_NUMBER_OF_FILES,
  MINIMUM_NUMBER_OF_FILES,
} from '../schemas';
import { formatStakeholdersForStorage, getDefaultIdentificationValueForApplicant } from '../utilities';

type Fields = Pick<Applicant, 'identificationDocuments'>;

export const StepCorporateApplicantIdentification: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATE_APPLICANT_IDENTIFICATION,

  doesMeetConditionFields: fields => {
    const { _willHaveMajorStakeholderApplicants, _currentCompanyMajorStakeholder, _isEditingCompanyMajorStakeholderApplicant } = fields;
    const hasCurrentCompanyMajorStakeholder = _currentCompanyMajorStakeholder !== undefined;

    return (!!_willHaveMajorStakeholderApplicants && hasCurrentCompanyMajorStakeholder) || !!_isEditingCompanyMajorStakeholderApplicant;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues = getDefaultIdentificationValueForApplicant(storeFields, DraftAccountType.Corporate);
    const { mutateAsync: completeCorporateDraftAccount, isSuccess, error, isLoading } = useCompleteCorporateDraftAccount(getApiClient);
    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);
    const { control, formState, handleSubmit } = useForm<Fields>({
      resolver: zodResolver(APPLICANT_IDENTIFICATION),
      defaultValues,
    });

    const shouldButtonLoading = isSendDocumentToS3AndGetScanIdsLoading || isCreateDocumentsFileLinksLoading || isLoading;
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
          storeFields.accountId
        ) {
          const editedStakeholder = {
            id: currentMajorStakeholderApplicant.id,
            name: {
              firstName: currentMajorStakeholderApplicant.firstName,
              lastName: currentMajorStakeholderApplicant.lastName,
              middleName: currentMajorStakeholderApplicant.middleName,
            },
            dateOfBirth: {
              dateOfBirth: formatDateForApi(currentMajorStakeholderApplicant.dateOfBirth || ''),
            },
            address: { ...currentMajorStakeholderApplicant.residentialAddress, country: 'USA' } as AddressInput,
            domicile: {
              type: currentMajorStakeholderApplicant.domicile || SimplifiedDomicileType.Citizen,
            },
            idScan,
          };

          const data = await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { stakeholders: [editedStakeholder] } });
          const stakeholdersToStoreFields = data?.details?.stakeholders ? formatStakeholdersForStorage(data?.details?.stakeholders as Stakeholder[]) : [];

          await updateStoreFields({
            companyMajorStakeholderApplicants: stakeholdersToStoreFields,
            _currentCompanyMajorStakeholder: undefined,
            _isEditingCompanyMajorStakeholderApplicant: false,
            _willHaveMajorStakeholderApplicants: false,
          });
        } else {
          const newStakeholder = {
            name: {
              firstName: currentMajorStakeholderApplicant.firstName,
              lastName: currentMajorStakeholderApplicant.lastName,
              middleName: currentMajorStakeholderApplicant.middleName,
            },
            dateOfBirth: {
              dateOfBirth: formatDateForApi(currentMajorStakeholderApplicant.dateOfBirth || ''),
            },
            address: { ...currentMajorStakeholderApplicant.residentialAddress, country: 'USA' } as AddressInput,
            ssn: {
              ssn: currentMajorStakeholderApplicant.socialSecurityNumber || '',
            },
            domicile: {
              type: currentMajorStakeholderApplicant.domicile || SimplifiedDomicileType.Citizen,
            },
            idScan,
          };

          if (storeFields.accountId) {
            const data = await completeCorporateDraftAccount({ accountId: storeFields.accountId, input: { stakeholders: [newStakeholder] } });
            const stakeholdersToStoreFields = data?.details?.stakeholders ? formatStakeholdersForStorage(data?.details?.stakeholders as Stakeholder[]) : [];

            await updateStoreFields({
              companyMajorStakeholderApplicants: stakeholdersToStoreFields,
              _isEditingCompanyMajorStakeholderApplicant: false,
              _willHaveMajorStakeholderApplicants: false,
            });
          }
        }
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
