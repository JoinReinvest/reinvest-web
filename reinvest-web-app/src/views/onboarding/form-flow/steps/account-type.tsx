import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { FormMessage } from 'components/FormElements/FormMessage';
import { SelectionCards } from 'components/FormElements/SelectionCards';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Title } from 'components/Title';
import { ACCOUNT_TYPES_AS_OPTIONS, ACCOUNT_TYPES_VALUES } from 'constants/account-types';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { useUpdateDataIndividualOnboarding } from 'services/useUpdateDataIndividualOnboarding';
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

    const { handleSubmit, formState, control, getValues } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const {
      isLoading,
      updateData,
      error: { createDraftAccountError },
      isSuccess,
    } = useUpdateDataIndividualOnboarding({ ...storeFields, ...getValues() });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      updateData(Identifiers.ACCOUNT_TYPE);
      moveToNextStep();
    };

    const onLinkClick = () => {
      setIsInformationModalOpen(true);
    };

    useEffect(() => {
      if (isSuccess) {
        // moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className="gap-0"
        >
          <Title title="Which type of account would you like to open?" />

          {createDraftAccountError && <FormMessage message={createDraftAccountError.message} />}

          <SelectionCards
            name="accountType"
            control={control}
            options={ACCOUNT_TYPES_AS_OPTIONS}
            className="mb-30 flex flex-col items-stretch justify-center gap-24"
            orientation="vertical"
          />

          <OpenModalLink
            label="Not sure which is best for you?"
            onClick={onLinkClick}
          />

          <Button
            type="submit"
            disabled={shouldButtonBeDisabled}
            label="Continue"
            loading={isLoading}
          />
        </Form>

        <WhyRequiredAccountTypeModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
