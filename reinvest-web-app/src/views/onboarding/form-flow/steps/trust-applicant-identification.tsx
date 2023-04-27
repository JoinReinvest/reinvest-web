import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputMultiFile } from 'components/FormElements/InputMultiFile';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { useCreateDocumentsFileLinks } from 'reinvest-app-common/src/services/queries/createDocumentsFileLinks';
import { AddressInput, DraftAccountType, PutFileLink, SimplifiedDomicileType, Stakeholder } from 'reinvest-app-common/src/types/graphql';
import { formatDateForApi } from 'reinvest-app-common/src/utilities/dates';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { useSendDocumentsToS3AndGetScanIds } from '../../../../services/queries/useSendDocumentsToS3AndGetScanIds';
import { Applicant, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { APPLICANT_IDENTIFICATION, FILE_SIZE_LIMIT_IN_MEGABYTES } from '../schemas';
import { formatStakeholdersForStorage, getDefaultIdentificationValueForApplicant } from '../utilities';

type Fields = Pick<Applicant, 'identificationDocuments'>;

export const StepTrustApplicantIdentification: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_APPLICANT_IDENTIFICATION,

  doesMeetConditionFields: fields => {
    const { _willHaveTrustTrusteesGrantorsOrProtectors, _currentTrustTrusteeGrantorOrProtector } = fields;
    const hasCurrentApplicant = _currentTrustTrusteeGrantorOrProtector !== undefined;

    return !!_willHaveTrustTrusteesGrantorsOrProtectors && hasCurrentApplicant;
  },

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);
    const defaultValues = getDefaultIdentificationValueForApplicant(storeFields, DraftAccountType.Trust);
    const { isLoading: isCreateDocumentsFileLinksLoading, mutateAsync: createDocumentsFileLinksMutate } = useCreateDocumentsFileLinks(getApiClient);

    const { isLoading: isSendDocumentToS3AndGetScanIdsLoading, mutateAsync: sendDocumentsToS3AndGetScanIdsMutate } = useSendDocumentsToS3AndGetScanIds();

    const { control, formState, handleSubmit } = useForm<Fields>({
      resolver: zodResolver(APPLICANT_IDENTIFICATION),
      defaultValues,
    });
    const shouldButtonLoading = isSendDocumentToS3AndGetScanIdsLoading || isCreateDocumentsFileLinksLoading || isLoading;
    const shouldButtonBeDisabled = !formState.isValid || shouldButtonLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ identificationDocuments }) => {
      const { _isEditingTrustTrusteeGrantorOrProtector } = storeFields;
      const currentApplicant = { ...storeFields._currentTrustTrusteeGrantorOrProtector, identificationDocuments };
      const currentApplicantIndex = currentApplicant._index;
      await updateStoreFields({ _currentTrustTrusteeGrantorOrProtector: currentApplicant });
      const documentsFileLinks = (await createDocumentsFileLinksMutate({ numberOfLinks: identificationDocuments?.length || 1 })) as PutFileLink[];
      const idScan: { fileName: string; id: string }[] = [];

      if (identificationDocuments) {
        const scans = await sendDocumentsToS3AndGetScanIdsMutate({ documentsFileLinks, identificationDocuments });
        idScan.push(...scans);

        if (!!_isEditingTrustTrusteeGrantorOrProtector && typeof currentApplicantIndex !== 'undefined' && currentApplicantIndex >= 0 && storeFields.accountId) {
          const editedStakeholder = {
            id: currentApplicant.id,
            name: {
              firstName: currentApplicant.firstName,
              lastName: currentApplicant.lastName,
              middleName: currentApplicant.middleName,
            },
            dateOfBirth: {
              dateOfBirth: formatDateForApi(currentApplicant.dateOfBirth || ''),
            },
            address: { ...currentApplicant.residentialAddress, country: 'USA' } as AddressInput,
            domicile: {
              type: currentApplicant.domicile || SimplifiedDomicileType.Citizen,
            },
            idScan,
          };

          const data = await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { stakeholders: [editedStakeholder] } });
          const stakeholdersToStoreFields = data?.details?.stakeholders ? formatStakeholdersForStorage(data?.details?.stakeholders as Stakeholder[]) : [];
          await updateStoreFields({
            trustTrusteesGrantorsOrProtectors: stakeholdersToStoreFields,
            _currentTrustTrusteeGrantorOrProtector: undefined,
            _isEditingTrustTrusteeGrantorOrProtector: false,
            _willHaveTrustTrusteesGrantorsOrProtectors: false,
          });

          moveToNextStep();
        } else {
          const newStakeholder = {
            name: {
              firstName: currentApplicant.firstName,
              lastName: currentApplicant.lastName,
              middleName: currentApplicant.middleName,
            },
            dateOfBirth: {
              dateOfBirth: formatDateForApi(currentApplicant.dateOfBirth || ''),
            },
            address: { ...currentApplicant.residentialAddress, country: 'USA' } as AddressInput,
            ssn: {
              ssn: currentApplicant.socialSecurityNumber || '',
            },
            domicile: {
              type: currentApplicant.domicile || SimplifiedDomicileType.Citizen,
            },
            idScan,
          };

          if (storeFields.accountId) {
            const data = await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { stakeholders: [newStakeholder] } });
            const stakeholdersToStoreFields = data?.details?.stakeholders ? formatStakeholdersForStorage(data?.details?.stakeholders as Stakeholder[]) : [];

            await updateStoreFields({
              trustTrusteesGrantorsOrProtectors: stakeholdersToStoreFields,
              _isEditingTrustTrusteeGrantorOrProtector: false,
              _willHaveTrustTrusteesGrantorsOrProtectors: false,
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
          <BlackModalTitle title="Upload the ID of your applicant." />
          {error && <ErrorMessagesHandler error={error} />}

          <InputMultiFile
            name="identificationDocuments"
            minimumNumberOfFiles={1}
            maximumNumberOfFiles={5}
            sizeLimitInMegaBytes={FILE_SIZE_LIMIT_IN_MEGABYTES}
            accepts={['jpeg', 'jpg', 'pdf', 'png']}
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
