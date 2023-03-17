import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { TRUST_TYPES_AS_OPTIONS, TRUST_TYPES_VALUES } from 'constants/account-types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { WhyRequiredTrustTypeModal } from 'views/whyRequiredModals/WhyRequiredTrustTypeModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'trustType'>;

const schema = z.object({
  trustType: z.enum(TRUST_TYPES_VALUES),
});

export const StepTrustType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.TRUST_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { trustType: storeFields?.trustType };
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title title="Which type of account would you like to open?" />

          <SelectionCards
            name="trustType"
            control={control}
            options={TRUST_TYPES_AS_OPTIONS}
            className="mb-30 flex flex-col items-stretch justify-center gap-16"
            orientation="vertical"
          />

          <div className="flex w-full justify-center">
            <OpenModalLink
              label="Not sure which is best for you?"
              onClick={onLinkClick}
            />
          </div>

          <ButtonStack>
            <Button
              type="submit"
              disabled={shouldButtonBeDisabled}
              label="Continue"
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
