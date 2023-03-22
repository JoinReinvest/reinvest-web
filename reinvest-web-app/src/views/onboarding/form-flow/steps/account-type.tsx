import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ACCOUNT_TYPES_AS_OPTIONS, ACCOUNT_TYPES_VALUES } from 'constants/account-types';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { WhyRequiredAccountTypeModal } from 'views/whyRequiredModals/WhyRequiredAccountTypeModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'accountType'>;

const schema = z.object({
  accountType: z.enum(ACCOUNT_TYPES_VALUES),
});

export const StepAccountType: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.ACCOUNT_TYPE,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const { handleSubmit, formState, control } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ accountType }) => {
      await updateStoreFields({ accountType });
      moveToNextStep();
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <BlackModalTitle title="Which type of account would you like to open?" />

          <div className="flex w-full flex-col gap-24">
            <SelectionCards
              name="accountType"
              control={control}
              options={ACCOUNT_TYPES_AS_OPTIONS}
              className="flex flex-col items-stretch justify-center gap-24"
              orientation="vertical"
            />

            <OpenModalLink
              label="Not sure which is best for you?"
              green
              center
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

        <WhyRequiredAccountTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
