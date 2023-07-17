import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputSocialSecurityNumber } from 'components/FormElements/InputSocialSecurityNumber';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { Typography } from 'components/Typography';
import { useToggler } from 'hooks/toggler';
import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { getApiClient } from 'services/getApiClient';
import { doesSocialSecurityNumberComesFromApi, maskSocialSecurityNumber } from 'utils/social-security-number';
import { generateSchema } from 'utils/social-security-number';
import { WhyRequiredSocialSecurityNumberModal } from 'views/whyRequiredModals/WhyRequiredSocialSecurityNumber';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'ssn'>;

const TITLE = "What's your social security number?";
const INFORMATION_TITLE = '*REINVEST is required by law to collect your social security number.';
const INFORMATION_DESCRIPTION =
  'We take the security of your data very seriously, vestibulum non lacus et eros elementum pellentesque. Duis urna et nunc porta facilisis.';
const TITLE_LOADING = 'Validating your Social Security Number';

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
    const defaultValues = useMemo<Fields>(() => ({ ssn: maskSocialSecurityNumber(storeFields.ssn) }), [storeFields.ssn]);
    const resolver = useMemo(() => zodResolver(generateSchema(defaultValues)), [defaultValues]);
    const form = useForm<Fields>({ mode: 'onSubmit', resolver, defaultValues: async () => defaultValues });

    const { mutateAsync, ...completeProfileMeta } = useCompleteProfileDetails(getApiClient);

    const [isInformationModalOpen, toggleIsInformationModalOpen] = useToggler(false);
    const [hasFieldBeenClearedOnce, toggleHasFieldBeenClearedOnce] = useToggler(false);

    useEffect(() => {
      if (completeProfileMeta.isSuccess) {
        moveToNextStep();
      }
    }, [completeProfileMeta.isSuccess, moveToNextStep]);

    useEffect(() => {
      const subscription = form.watch((value, { name, type }) => {
        if (name === 'ssn' && type === 'change' && value?.ssn === '') {
          toggleHasFieldBeenClearedOnce(true);
        }
      });

      return () => subscription.unsubscribe();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.watch]);

    const willUseSecureMask = useMemo(() => {
      const hasStoredValue = !!defaultValues.ssn;
      const hasStoredValueAndClearedTheField = hasStoredValue && hasFieldBeenClearedOnce;
      const willUseSecureMask = hasStoredValueAndClearedTheField ? false : hasStoredValue ? true : !hasStoredValue ? false : true;

      return willUseSecureMask;
    }, [defaultValues.ssn, hasFieldBeenClearedOnce]);

    if (completeProfileMeta.isLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />

          <ModalTitle title={TITLE_LOADING} />
        </div>
      );
    }

    const shouldButtonBeDisabled = !form.formState.isValid || completeProfileMeta.isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ ssn }) => {
      const maskedSsn = maskSocialSecurityNumber(ssn);
      const isFromApi = doesSocialSecurityNumberComesFromApi(ssn);

      if (!isFromApi) {
        const input = { ssn: { ssn } };
        await mutateAsync({ input }, {});
      }

      await updateStoreFields({ ssn: maskedSsn, _isSocialSecurityNumberAlreadyAssigned: false, _isSocialSecurityNumberBanned: false });

      if (isFromApi) {
        moveToNextStep();
      }
    };

    return (
      <>
        <Form onSubmit={form.handleSubmit(onSubmit)}>
          <FormContent>
            <ModalTitle title={TITLE} />

            <div className="flex w-full flex-col gap-24">
              <div className="flex w-full flex-col gap-16">
                {completeProfileMeta.error && <ErrorMessagesHandler error={completeProfileMeta.error} />}

                <InputSocialSecurityNumber
                  name="ssn"
                  control={form.control}
                  willUseSecureMask={willUseSecureMask}
                />

                <OpenModalLink
                  label="Required. Why?"
                  onClick={toggleIsInformationModalOpen}
                  green
                />
              </div>

              <div className="flex w-full flex-col gap-4">
                <Typography variant="paragraph-large">{INFORMATION_TITLE}</Typography>

                <Typography
                  variant="paragraph"
                  className="text-gray-02"
                >
                  {INFORMATION_DESCRIPTION}
                </Typography>
              </div>
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
              loading={completeProfileMeta.isLoading}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredSocialSecurityNumberModal
          isOpen={isInformationModalOpen}
          onOpenChange={toggleIsInformationModalOpen}
        />
      </>
    );
  },
};
