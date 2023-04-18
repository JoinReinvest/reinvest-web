import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ACCOUNT_TYPES_AS_OPTIONS, ACCOUNT_TYPES_VALUES } from 'reinvest-app-common/src/constants/account-types';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCreateDraftAccount } from 'reinvest-app-common/src/services/queries/createDraftAccount';
import { useGetListAccount } from 'reinvest-app-common/src/services/queries/getListAccount';
import { useGetListAccountTypesUserCanOpen } from 'reinvest-app-common/src/services/queries/getListAccountTypesUserCanOpen';
import { useGetPhoneCompleted } from 'reinvest-app-common/src/services/queries/getPhoneCompleted';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { useGetTrustDraftAccount } from 'reinvest-app-common/src/services/queries/getTrustDraftAccount';
import { AccountType, StatementType } from 'reinvest-app-common/src/types/graphql';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { SelectCardOption } from 'reinvest-app-common/src/types/select-card-option';
import { getApiClient } from 'services/getApiClient';
import { WhyRequiredAccountTypeModal } from 'views/whyRequiredModals/WhyRequiredAccountTypeModal';
import { z } from 'zod';

import { IconSpinner } from '../../../../assets/icons/IconSpinner';
import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'accountType'>;

const schema = z.object({
  accountType: z.enum(ACCOUNT_TYPES_VALUES),
});

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [accountId, setAccountId] = useState(storeFields.accountId || '');
    const [accountType, setAccountType] = useState('');
    const [accountTypesAvailableToOpen, setAccountTypesAvailableToOpen] = useState<SelectCardOption[]>([]);
    const { data: profileData } = useGetUserProfile(getApiClient);
    const { data: listAccounts } = useGetListAccount(getApiClient);
    const { data: phoneCompleted } = useGetPhoneCompleted(getApiClient);
    const {
      data: listAccountTypesUserCanOpen,
      isLoading: isListAccountTypesUserCanOpenLoading,
      isSuccess: isListAccountTypesUserCanOpenSuccess,
    } = useGetListAccountTypesUserCanOpen(getApiClient);

    const { isSuccess: isTrustDraftAccountSuccess, data: trustDraftAccountData } = useGetTrustDraftAccount(getApiClient, {
      accountId: accountId,
      config: { enabled: !!accountId && accountType === DraftAccountType.Trust },
    });

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      data: individualAccountData,
      error: createDraftAccountError,
      isLoading,
      mutateAsync: createDraftAccountMutate,
      isSuccess,
    } = useCreateDraftAccount(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      const account = listAccounts?.find(account => account?.type === fields.accountType);

      if (account && fields.accountType) {
        setAccountId(account?.id || '');
        setAccountType(fields.accountType);
      }

      if (fields.accountType && !account) {
        await createDraftAccountMutate({ type: fields.accountType });
      }
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    useEffect(() => {
      if (isTrustDraftAccountSuccess && trustDraftAccountData) {
        //UPDATE ALL FIELDS FOR TRUST ACCOUNT
        updateStoreFields({ ...storeFields, accountId: trustDraftAccountData?.id || '', isCompletedProfile: !!profileData?.isCompleted });
        moveToNextStep();
      }
    }, [isTrustDraftAccountSuccess, moveToNextStep, storeFields, trustDraftAccountData, updateStoreFields, profileData]);

    useEffect(() => {
      if (isSuccess && profileData) {
        updateStoreFields({ ...storeFields, accountId: individualAccountData?.id || '', isCompletedProfile: !!profileData.isCompleted });
        moveToNextStep();
      }
    }, [individualAccountData, isSuccess, moveToNextStep, storeFields, updateStoreFields, profileData]);

    useEffect(() => {
      if (profileData) {
        const statementTypes = profileData?.details?.statements?.map(statement => statement?.type).filter(statementType => statementType) as
          | StatementType[]
          | undefined;
        const finraInstitutionName = profileData?.details?.statements?.find(statement => statement?.type === StatementType.FinraMember)?.details;

        updateStoreFields({
          ...storeFields,
          address: profileData?.details?.address,
          name: {
            firstName: profileData?.details?.firstName || '',
            lastName: profileData?.details?.lastName || '',
            middleName: profileData?.details?.middleName || '',
          },
          dateOfBirth: profileData?.details?.dateOfBirth,
          residency: profileData?.details?.domicile?.type,
          experience: profileData?.details?.experience,
          isCompletedProfile: !!profileData?.isCompleted,
          isAccreditedInvestor: statementTypes?.includes(StatementType.AccreditedInvestor),
          statementTypes: statementTypes || [],
          finraInstitutionName: finraInstitutionName ? (finraInstitutionName[0] as string) : '',
          ssn: profileData?.details?.ssn || '',
        });
      }
    }, [profileData, storeFields, updateStoreFields]);

    useEffect(() => {
      if (phoneCompleted) {
        updateStoreFields({
          ...storeFields,
          _isPhoneCompleted: phoneCompleted,
        });
      }
    }, [phoneCompleted, storeFields, updateStoreFields]);

    useEffect(() => {
      if (listAccountTypesUserCanOpen) {
        setAccountTypesAvailableToOpen(
          ACCOUNT_TYPES_AS_OPTIONS.filter(accountType => (listAccountTypesUserCanOpen as AccountType[]).includes(accountType.value as AccountType)),
        );
      }
    }, [isListAccountTypesUserCanOpenSuccess, listAccountTypesUserCanOpen]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title={accountTypesAvailableToOpen.length ? 'Which type of account would you like to open?' : 'You cannot open any account'} />

            {createDraftAccountError && <ErrorMessagesHandler error={createDraftAccountError} />}

            {isListAccountTypesUserCanOpenLoading && (
              <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
                {' '}
                <IconSpinner />
              </div>
            )}
            {!isListAccountTypesUserCanOpenLoading && !!accountTypesAvailableToOpen.length && (
              <div className="flex w-full flex-col gap-24">
                <SelectionCards
                  name="accountType"
                  control={control}
                  options={accountTypesAvailableToOpen}
                  className="flex flex-col items-stretch justify-center gap-24"
                  orientation="vertical"
                />

                <OpenModalLink
                  label="Not sure which is best for you?"
                  green
                  center
                  onClick={onLinkClick}
                />
              </div>
            )}
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label="Continue"
              loading={isLoading}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredAccountTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
