import { zodResolver } from '@hookform/resolvers/zod';
import { IconSpinner } from 'assets/icons/IconSpinner';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { InputSocialSecurityNumber } from 'components/FormElements/InputSocialSecurityNumber';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Typography } from 'components/Typography';
import { formValidationRules } from 'formValidationRules';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { WhyRequiredSocialSecurityNumberModal } from 'views/whyRequiredModals/WhyRequiredSocialSecurityNumber';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'socialSecurityNumber'>;

const schema = z.object({
  socialSecurityNumber: formValidationRules.socialSecurityNumber,
});

export const StepSocialSecurityNumber: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SOCIAL_SECURITY_NUMBER,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit, setValue } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onMoreInformationClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = async ({ socialSecurityNumber }) => {
      try {
        setIsLoading(true);

        //  TO-DO: Verify if the social security number is not banned
        //      or assigned to another account - set `_isSocialSecurityNumberBanned`
        //      and `_isSocialSecurityNumberAlreadyAssigned` accordingly.

        await updateStoreFields({ socialSecurityNumber, _isSocialSecurityNumberAlreadyAssigned: false, _isSocialSecurityNumberBanned: false });
        moveToNextStep();
      } catch (error) {
        setIsLoading(false);
      }
    };

    const setValueOnSocialSecurityNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
      const isValue = !!event.target.value;

      if (isValue) {
        const value = event.target.value;
        const firstPart = value.substring(0, 3);
        const secondPart = value.substring(3, 5);
        const thirdPart = value.substring(5, 9);
        setValue('socialSecurityNumber', `${firstPart}-${secondPart}-${thirdPart}`);
      }
    };

    if (isLoading) {
      return (
        <div className="flex flex-col items-center gap-32">
          <IconSpinner />

          <BlackModalTitle title="Validating yout Social Security Number" />
        </div>
      );
    }

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BlackModalTitle title="What’s your social security number?" />

          <div className="flex w-full flex-col gap-24">
            <div className="flex w-full flex-col gap-16">
              <InputSocialSecurityNumber
                name="socialSecurityNumber"
                control={control}
                rules={{ onChange: setValueOnSocialSecurityNumberChange }}
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
          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
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
