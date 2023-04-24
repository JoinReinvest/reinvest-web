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
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteCorporateDraftAccount } from 'reinvest-app-common/src/services/queries/completeCorporateDraftAccount';
import { useCompleteTrustDraftAccount } from 'reinvest-app-common/src/services/queries/completeTrustDraftAccount';
import { DraftAccountType, TrustCompanyTypeEnum } from 'reinvest-app-common/src/types/graphql';
import { WhatIsEINModal } from 'views/EINModal';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { getApiClient } from '../../../../services/getApiClient';
import { doesEinComesFromApi, maskEin } from '../../../../utils/ein';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'ein'>;

// const schema = z.object({
//   ein: formValidationRules.ein,
// });

const generateSchema = (defaultValues: Fields) => {
  return z
    .object({
      ein: z.string(),
    })
    .superRefine((fields, context) => {
      const values = [fields.ein, defaultValues.ein];
      const isMaskedFromApi = values.every(doesEinComesFromApi);
      const hasEnteredStoredValue = fields.ein === defaultValues.ein;
      const matchesSecurePattern = !!fields.ein.match(/^(\*{2}-\*{3}\d{4})$/);
      const matchesRegularPattern = !!fields.ein.match(/^[0-9]{2}-[0-9]{7}/);

      const doesNotMatchApiField = isMaskedFromApi && !matchesSecurePattern && !hasEnteredStoredValue;
      const doesNotMatchInitializedField = !defaultValues.ein && !matchesRegularPattern;
      const doesNotMatchFieldOnReturn = !isMaskedFromApi && !matchesRegularPattern;

      if (doesNotMatchApiField || doesNotMatchInitializedField || doesNotMatchFieldOnReturn) {
        context.addIssue({
          code: 'invalid_string',
          message: 'Invalid EIN',
          path: ['ein'],
          validation: 'regex',
        });
      }
    });
};

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
    const defaultValues: Fields = { ein: maskEin(storeFields.ein) };

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

    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(generateSchema(defaultValues)),
      defaultValues: async () => defaultValues,
    });

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const shouldButtonBeLoading = isTrustDraftAccountLoading || isCorporateDraftAccountLoading;
    const shouldButtonBeDisabled = !formState.isValid || shouldButtonBeLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ ein }) => {
      const maskedEin = maskEin(ein);
      const isFromApi = doesEinComesFromApi(ein);

      const { accountType, accountId } = storeFields;
      const hasAccountIdAndEin = accountId && ein;
      await updateStoreFields({ ein: maskedEin });

      if (hasAccountIdAndEin && !isFromApi) {
        const variables = { accountId, input: { ein: { ein } } };

        if (accountType === DraftAccountType.Trust) {
          await completeTrustDraftAccount(variables);
        }

        if (accountType === DraftAccountType.Corporate) {
          await completeCorporateDraftAccount(variables);
        }
      }

      if (isFromApi) {
        moveToNextStep();
      }
    };

    const fieldValue = watch('ein');

    useEffect(() => {
      const hasFieldBeenCleared = fieldValue === '';

      if (hasFieldBeenCleared) {
        setHasFieldBeenClearedOnce(true);
      }
    }, [fieldValue]);

    const [hasFieldBeenClearedOnce, setHasFieldBeenClearedOnce] = useState(false);

    const hasStoredValue = !!defaultValues.ein;
    const hasStoredValueAndClearedTheField = hasStoredValue && hasFieldBeenClearedOnce;
    const willUseSecureMask = hasStoredValueAndClearedTheField ? false : hasStoredValue ? true : !hasStoredValue ? false : true;

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
                willUseSecureMask={willUseSecureMask}
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
