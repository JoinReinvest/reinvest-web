import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { Select } from 'components/Select';
import { NET_WORTHS_AS_OPTIONS } from 'constants/net-worths';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { WhyRequiredNetWorthModal } from 'views/whyRequiredModals/WhyRequiredNetWorthModal';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'netIncome' | 'netWorth'>;

const schema = z.object({
  netIncome: formValidationRules.netIncome,
  netWorth: formValidationRules.netWorth,
});

export const StepNetWorthAndIncome: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.NET_WORTH_AND_INCOME,

  willBePartOfTheFlow: ({ accountType }) => {
    return accountType === AccountType.Individual;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const [isWhyRequiredOpen, setIsWhyRequiredOpen] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      moveToNextStep();
    };

    const openWhyReqiredOnClick = () => setIsWhyRequiredOpen(!isWhyRequiredOpen);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <BlackModalTitle title="What is approximate net worth and income?" />

            <div className="flex w-full flex-col gap-16">
              <Select
                name="netIncome"
                control={control}
                options={NET_WORTHS_AS_OPTIONS}
                placeholder="Net Income"
                required
              />

              <Select
                name="netWorth"
                control={control}
                options={NET_WORTHS_AS_OPTIONS}
                placeholder="Net Worth"
                required
              />

              <OpenModalLink
                label="Required. Why?"
                green
                onClick={openWhyReqiredOnClick}
              />
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

        <WhyRequiredNetWorthModal
          isOpen={isWhyRequiredOpen}
          onOpenChange={openWhyReqiredOnClick}
        />
      </>
    );
  },
};
