import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { InputBirthDate } from 'components/FormElements/InputBirthDate';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { dateOlderThanEighteenYearsSchema } from 'formValidationRules';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { WhyRequiredDateBirthModal } from 'views/whyRequiredModals/WhyRequiredDateBirthModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'dateOfBirth'>;

const schema = z.object({
  dateOfBirth: dateOlderThanEighteenYearsSchema,
});

export const StepDateOfBirth: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.DATE_OF_BIRTH,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { formState, control, handleSubmit, getValues } = useForm<Fields>({
      mode: 'onChange',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { data, error, isLoading, updateData, isSuccess } = useUpdateDataIndividualOnboarding({
      dateOfBirth: getDateOfBirth(getValues().dateOfBirth || ''),
      ...storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onOpenInformationModalClick = () => {
      setIsInformationModalOpen(true);
    };

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      updateData();
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title title="Enter your date of birth" />

          <InputBirthDate
            name="dateOfBirth"
            control={control}
          />

          <OpenModalLink
            label="Required. Why?"
            green
            onClick={onOpenInformationModalClick}
          />

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredDateBirthModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};

const getDateOfBirth = (dateOfBirth: string) => {
  const date = dateOfBirth.split('/');

  return `${date[2]}-${date[0]}-${date[1]}`;
};
