import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { RadioGroupOptionItem, RadioGroupOptions } from 'components/FormElements/RadioGroupOptions';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
import { WhyRequiredAccountTypeModal } from 'views/whyRequiredModals/WhyRequiredAccountTypeModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

interface Fields {
  isAccreditedInvestor: 'yes' | 'no';
}

const schema = z.object({
  isAccreditedInvestor: z.enum(['yes', 'no']),
});

const OPTIONS: RadioGroupOptionItem[] = [
  {
    title: 'Yes',
    value: 'yes',
  },
  {
    title: 'No',
    value: 'no',
  },
];

export const StepAccreditedInvestor: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCREDITED_INVESTOR,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === 'INDIVIDUAL';
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const hasStoredValue = storeFields.isAccreditedInvestor !== undefined;
    const storedValue = storeFields.isAccreditedInvestor ? 'yes' : 'no';
    const defaultValues: Fields = { isAccreditedInvestor: hasStoredValue ? storedValue : 'no' };
    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const {
      isLoading,
      updateData,
      isSuccess,
      error: { profileDetailsError },
    } = useUpdateDataIndividualOnboarding();

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const isAccreditedInvestor = fields?.isAccreditedInvestor === 'yes' ? true : false;

      await updateStoreFields({ isAccreditedInvestor });
      updateData(Identifiers.ACCREDITED_INVESTOR, { ...storeFields, isAccreditedInvestor });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title title="Are you an accredited investor?" />

          {profileDetailsError && <FormMessage message={profileDetailsError.message} />}

          <OpenModalLink
            label="What is an accredited investor?"
            onClick={onLinkClick}
          />

          <RadioGroupOptions
            name="isAccreditedInvestor"
            control={control}
            options={OPTIONS}
          />

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label="Continue"
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
