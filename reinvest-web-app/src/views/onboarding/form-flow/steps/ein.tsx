import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputEIN } from 'components/FormElements/InputEIN';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType, TrustCompanyTypeEnum } from 'reinvest-app-common/src/types/graphql';
import { WhatIsEINModal } from 'views/EINModal';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'ein'>;

const schema = z.object({
  ein: formValidationRules.ein,
});

export const StepEIN: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EIN,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === DraftAccountType.Corporate || accountType === DraftAccountType.Trust;
  },

  doesMeetConditionFields: fields => {
    const profileFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.ssn, fields.address, fields.experience];

    const hasProfileFields = allRequiredFieldsExists(profileFields);
    const hasTrustFields = allRequiredFieldsExists([fields.trustType, fields.trustLegalName]) && fields.accountType === DraftAccountType.Trust;
    const hasCorporateFields =
      allRequiredFieldsExists([fields.corporationType, fields.corporationLegalName]) && fields.accountType === DraftAccountType.Corporate;
    const isRevocableTrust = fields.trustType !== TrustCompanyTypeEnum.Irrevocable;

    return hasProfileFields && ((hasTrustFields && isRevocableTrust) || hasCorporateFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { ein: storeFields.ein || '' };

    const {
      mutateAsync: completeTrustDraftAccount,
      isSuccess: isTrustDraftAccountSuccess,
      error: trustDraftAccountError,
      isLoading: isTrustDraftAccountLoading,
    } = useCompleteTrustDraftAccount(getApiClient);

    const {
      mutateAsync: completeCorporateDraftAccount,
      isSuccess: isCorporateDraftAccountSuccess,
      error: corporateDraftAccountError,
      isLoading: isCorporateDraftAccountLoading,
    } = useCompleteCorporateDraftAccount(getApiClient);

    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const shouldButtonBeLoading = isTrustDraftAccountLoading || isCorporateDraftAccountLoading;
    const shouldButtonBeDisabled = !formState.isValid || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ ein }) => {
      const { accountType, accountId } = storeFields;
      const hasAccountIdAndEin = accountId && ein;
      await updateStoreFields({ ein });

      if (hasAccountIdAndEin) {
        const variables = { accountId, input: { ein: { ein } } };

        if (accountType === DraftAccountType.Trust) {
          await completeTrustDraftAccount(variables);
        }

        if (accountType === DraftAccountType.Corporate) {
          await completeCorporateDraftAccount(variables);
        }
      }
    };

    useEffect(() => {
      if (isTrustDraftAccountSuccess || isCorporateDraftAccountSuccess) {
        moveToNextStep();
      }
    }, [isTrustDraftAccountSuccess, isCorporateDraftAccountSuccess, moveToNextStep]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="Enter your EIN" />
            {trustDraftAccountError && <ErrorMessagesHandler error={trustDraftAccountError} />}
            {corporateDraftAccountError && <ErrorMessagesHandler error={corporateDraftAccountError} />}
            <div className="flex w-full flex-col gap-16">
              <InputEIN
                name="ein"
                control={control}
                shouldUnregister
              />

              <div className="flex justify-between">
                <OpenModalLink
                  label="EIN?"
                  green
                  onClick={() => setIsInformationModalOpen(true)}
                />

                <OpenModalLink
                  label="I do not have an EIN."
                  green
                />
              </div>
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
              loading={shouldButtonBeLoading}
            />
          </ButtonStack>
        </Form>

        <WhatIsEINModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
