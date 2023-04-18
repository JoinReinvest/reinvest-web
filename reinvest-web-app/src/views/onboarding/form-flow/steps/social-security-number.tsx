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
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { getApiClient } from 'services/getApiClient';
import { WhyRequiredSocialSecurityNumberModal } from 'views/whyRequiredModals/WhyRequiredSocialSecurityNumber';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'ssn'>;

const schema = z.object({
  ssn: formValidationRules.socialSecurityNumber,
});

const getDefaultValue = (value: string | undefined) => {
  if (!value) {
    return '';
  }

  const separator = '***-**-';

  if (value.includes(separator)) {
    const last4Digits = value.split(separator).pop();
    const digits = last4Digits?.split('');

    if (!digits) {
      return '';
    }

    return `${separator}**${digits[2]}${digits[3]}`;
  }

  return value;
};

export const StepSocialSecurityNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SOCIAL_SECURITY_NUMBER,

  willBePartOfTheFlow(fields) {
    return !!fields.accountType;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency, fields.accountType];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { ssn: getDefaultValue(storeFields.ssn) };
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || isLoading;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async ({ ssn }) => {
      await updateStoreFields({ ssn, _isSocialSecurityNumberAlreadyAssigned: false, _isSocialSecurityNumberBanned: false });
      await completeProfileMutate({ input: { ssn: { ssn } } });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    if (isLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <BlackModalTitle title="Validating your Social Security Number" />
        </div>
      );
    }

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
                  defaultValue={storeFields.ssn}
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
