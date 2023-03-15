import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { CORPORATION_TYPES_VALUES, CORPORATION_TYPES_AS_OPTIONS } from 'constants/account-types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { WhyRequiredCorporationTypeModal } from 'views/whyRequiredModals/WhyRequiredCorporationTypeModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { ButtonStack } from 'components/FormElements/ButtonStack';

type Fields = Pick<OnboardingFormFields, 'corporationType'>;

const schema = z.object({
  corporationType: z.enum(CORPORATION_TYPES_VALUES),
});

export const StepCorporationType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.CORPORATION_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const defaultValues: Fields = { corporationType: storeFields?.corporationType };
    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Title title="What type of Corporation do you have?" />

          <SelectionCards
            name="corporationType"
            control={control}
            options={CORPORATION_TYPES_AS_OPTIONS}
            className="flex flex-col items-stretch justify-center gap-16"
            orientation="vertical"
          />

          <div className="w-full flex justify-center">
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

        <WhyRequiredCorporationTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
