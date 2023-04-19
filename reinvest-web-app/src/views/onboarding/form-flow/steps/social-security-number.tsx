import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputSocialSecurityNumber } from 'components/FormElements/InputSocialSecurityNumber';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Typography } from 'components/Typography';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { doesSocialSecurityNumberComesFromApi, maskSocialSecurityNumber } from 'utils/social-security-number';
import { WhyRequiredSocialSecurityNumberModal } from 'views/whyRequiredModals/WhyRequiredSocialSecurityNumber';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'ssn'>;

const generateSchema = (defaultValues: Fields) => {
  return z
    .object({
      ssn: z.string(),
    })
    .superRefine((fields, context) => {
      const values = [fields.ssn, defaultValues.ssn];
      const isMaskedFromApi = values.every(doesSocialSecurityNumberComesFromApi);
      const hasEnteredStoredValue = fields.ssn === defaultValues.ssn;
      const matchesSecurePattern = !!fields.ssn.match(/^(\*{3}-\*{2}-\*{2}(?!0{2})\d{2})$/);
      const matchesRegularPattern = !!fields.ssn.match(/^((?!666|000|9\d{2})\d{3}-(?!00)\d{2}-(?!0{4})\d{4})|(\*{3}-\*{2}-\*{2}(?!0{2})\d{2})$/);

      const doesNotMatchApiField = isMaskedFromApi && !matchesSecurePattern && !hasEnteredStoredValue;
      const doesNotMatchInitializedField = !defaultValues.ssn && !matchesRegularPattern;
      const doesNotMatchFieldOnReturn = !isMaskedFromApi && !matchesRegularPattern;

      if (doesNotMatchApiField || doesNotMatchInitializedField || doesNotMatchFieldOnReturn) {
        context.addIssue({
          code: 'invalid_string',
          message: 'Invalid Social Security Number',
          path: ['ssn'],
          validation: 'regex',
        });
      }
    });
};

export const StepSocialSecurityNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SOCIAL_SECURITY_NUMBER,

  willBePartOfTheFlow(fields) {
    return fields.accountType === DraftAccountType.Individual;
  },

  doesMeetConditionFields(fields) {
    const isCreatingIndividualAccount = fields.accountType === DraftAccountType.Individual;

    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return isCreatingIndividualAccount && allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { ssn: maskSocialSecurityNumber(storeFields.ssn) };
    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(generateSchema(defaultValues)),
      defaultValues: async () => defaultValues,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const fieldValue = watch('ssn');

    useEffect(() => {
      const hasFieldBeenCleared = fieldValue === '';

      if (hasFieldBeenCleared) {
        setHasFieldBeenClearedOnce(true);
      }
    }, [fieldValue]);

    const [hasFieldBeenClearedOnce, setHasFieldBeenClearedOnce] = useState(false);

    if (isLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <BlackModalTitle title="Validating your Social Security Number" />
        </div>
      );
    }

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const hasStoredValue = !!defaultValues.ssn;
    const hasStoredValueAndClearedTheField = hasStoredValue && hasFieldBeenClearedOnce;
    const willUseSecureMask = hasStoredValueAndClearedTheField ? false : hasStoredValue ? true : !hasStoredValue ? false : true;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async ({ ssn }) => {
      const maskedSsn = maskSocialSecurityNumber(ssn);
      const isFromApi = doesSocialSecurityNumberComesFromApi(ssn);

      if (!isFromApi) {
        await completeProfileMutate({ input: { ssn: { ssn } } });
      }

      await updateStoreFields({ ssn: maskedSsn, _isSocialSecurityNumberAlreadyAssigned: false, _isSocialSecurityNumberBanned: false });

      if (isFromApi) {
        moveToNextStep();
      }
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="What’s your social security number?" />

            {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}

            <div className="flex w-full flex-col gap-24">
              <div className="flex w-full flex-col gap-16">
                <InputSocialSecurityNumber
                  name="ssn"
                  control={control}
                  willUseSecureMask={willUseSecureMask}
                />

                <OpenModalLink
                  label="Required. Why?"
                  onClick={onMoreInformationClick}
                  green
                />
              </div>

              <div className="flex w-full flex-col gap-4">
                <Typography variant="paragraph-large">*REINVEST is required by law to collect your social security number.</Typography>

                <Typography
                  variant="paragraph"
                  className="text-gray-02"
                >
                  We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.
                </Typography>
              </div>
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
              loading={isLoading}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredSocialSecurityNumberModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
