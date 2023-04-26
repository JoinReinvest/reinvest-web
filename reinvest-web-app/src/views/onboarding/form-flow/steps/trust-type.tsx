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
import { TRUST_TYPES_AS_OPTIONS, TRUST_TYPES_VALUES } from 'reinvest-app-common/src/constants/account-types';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { WhyRequiredTrustTypeModal } from 'views/whyRequiredModals/WhyRequiredTrustTypeModal';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'trustType'>;

const schema = z.object({
  trustType: z.enum(TRUST_TYPES_VALUES),
});

export const StepTrustType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_TYPE,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields(fields) {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const isTrustAccount = fields.accountType === DraftAccountType.Trust;

    return hasProfileFields && isTrustAccount;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { trustType: storeFields?.trustType };
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
    const { mutateAsync: completeTrustDraftAccount, isSuccess, error, isLoading } = useCompleteTrustDraftAccount(getApiClient);

    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      if (storeFields.accountId && fields.trustType) {
        await completeTrustDraftAccount({ accountId: storeFields.accountId, input: { companyType: { type: fields.trustType } } });
      }
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="What type of Trust do you have?" />
            {error && <ErrorMessagesHandler error={error} />}

            <div className="flex w-full flex-col gap-24">
              <SelectionCards
                name="trustType"
                control={control}
                options={TRUST_TYPES_AS_OPTIONS}
                className="flex flex-col items-stretch justify-center gap-16"
                orientation="vertical"
              />

              <div className="flex w-full justify-center">
                <OpenModalLink
                  label="Not sure which is best for you?"
                  green
                  onClick={onLinkClick}
                />
              </div>
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

        <WhyRequiredTrustTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
