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
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { getApiClient } from 'services/getApiClient';
import { WhyRequiredAccountTypeModal } from 'views/whyRequiredModals/WhyRequiredAccountTypeModal';
import { z } from 'zod';

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
    const { data: profileData } = useGetUserProfile(getApiClient);
    const { data: listAccounts } = useGetListAccount(getApiClient);

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { handleSubmit, formState, control, getValues } = useForm<Fields>({
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

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      if (fields.accountType) {
        await createDraftAccountMutate({ type: fields.accountType });
      }
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    useEffect(() => {
      if (isSuccess && profileData) {
        updateStoreFields({ ...storeFields, accountId: individualAccountData?.id || '', isCompletedProfile: !!profileData.isCompleted });
        moveToNextStep();
      }
    }, [individualAccountData, isSuccess, moveToNextStep, storeFields, updateStoreFields, profileData]);

    useEffect(() => {
      if (createDraftAccountError && listAccounts && profileData) {
        if (createDraftAccountError.response.errors[0]?.message?.includes('already exists')) {
          const account = listAccounts.find(account => account?.type === getValues().accountType);
          updateStoreFields({ ...storeFields, accountId: account?.id || '', isCompletedProfile: !!profileData?.isCompleted });
          moveToNextStep();
        }
      }
    }, [createDraftAccountError, getValues, listAccounts, moveToNextStep, storeFields, updateStoreFields, profileData]);

    useEffect(() => {
      if (profileData) {
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
        });
      }
    }, [profileData, storeFields, updateStoreFields]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="Which type of account would you like to open?" />

            {createDraftAccountError && <ErrorMessagesHandler error={createDraftAccountError} />}
            <div className="flex w-full flex-col gap-24">
              <SelectionCards
                name="accountType"
                control={control}
                options={ACCOUNT_TYPES_AS_OPTIONS}
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
