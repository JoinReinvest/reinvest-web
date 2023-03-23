import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InputEIN } from 'components/FormElements/InputEIN';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { WhatIsEINModal } from 'views/EINModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'ein'>;

const schema = z.object({
  ein: formValidationRules.ein,
});

export const StepEIN: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.EIN,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === AccountType.Corporate || accountType === AccountType.Trust;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = { ein: storeFields.ein || '' };

    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'onBlur',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const [isInformationModalOpen, setIsInformationModalOpen] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="Enter your EIN" />

            <div className="flex w-full flex-col gap-16">
              <InputEIN
                name="ein"
                control={control}
              />

              <div className="flex justify-between">
                <OpenModalLink
                  label="EIN?"
                  green
                  onClick={() => setIsInformationModalOpen(true)}
                />

                <OpenModalLink
                  label="I do not have an EIN."
                  green
                />
              </div>
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
            />
          </ButtonStack>
        </Form>

        <WhatIsEINModal
          isOpen={isInformationModalOpen}
          onOpenChange={setIsInformationModalOpen}
        />
      </>
    );
  },
};
