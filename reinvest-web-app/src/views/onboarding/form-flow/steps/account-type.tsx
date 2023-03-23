import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ACCOUNT_TYPES_AS_OPTIONS, ACCOUNT_TYPES_VALUES } from 'constants/account-types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useGetListAccount } from 'services/queries/getListAccount';
import { useGetUserProfile } from 'services/queries/getProfile';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { WhyRequiredAccountTypeModal } from 'views/whyRequiredModals/WhyRequiredAccountTypeModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'accountType'>;

const schema = z.object({
  accountType: z.enum(ACCOUNT_TYPES_VALUES),
});

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { data: profileData } = useGetUserProfile();
    const { data: listAccounts } = useGetListAccount();

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { handleSubmit, formState, control, getValues } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      isLoading,
      updateData,
      error: { createDraftAccountError },
      isSuccess,
      data: individualAccountData,
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      await updateData(Identifiers.ACCOUNT_TYPE, { ...storeFields, ...getValues() });
      moveToNextStep();
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    useEffect(() => {
      if (isSuccess) {
        updateStoreFields({ ...storeFields, accountId: individualAccountData?.id || '' });
        moveToNextStep();
      }
    }, [individualAccountData, isSuccess, moveToNextStep, storeFields, updateStoreFields]);

    useEffect(() => {
      const updateStore = async (accountId: string) => {
        return updateStoreFields({ ...storeFields, accountId });
      };

      if (createDraftAccountError && listAccounts) {
        if (createDraftAccountError.message.includes('already exists')) {
          const account = listAccounts.find(account => account?.type === getValues().accountType);
          updateStore(account?.id || '');
          moveToNextStep();
        }
      }
    }, [createDraftAccountError, getValues, listAccounts, moveToNextStep, storeFields, updateStoreFields]);

    useEffect(() => {
      if (profileData) {
        updateStoreFields({
          ...storeFields,
          address: profileData?.details?.address || undefined,
          name: {
            firstName: profileData?.details?.firstName || '',
            lastName: profileData?.details?.lastName || '',
            middleName: profileData?.details?.middleName || '',
          },
          dateOfBirth: profileData?.details?.dateOfBirth || undefined,
          residency: profileData?.details?.domicile?.type || undefined,
          experience: profileData?.details?.experience || undefined,
          isCompletedProfile: profileData?.isCompleted || false,
        });
      }
    }, [profileData, storeFields, updateStoreFields]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="Which type of account would you like to open?" />

            {createDraftAccountError && <FormMessage message={createDraftAccountError.message} />}
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
