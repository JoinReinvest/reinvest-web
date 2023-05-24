import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { OpenModalLink } from 'components/Links/OpenModalLink';
import { ModalTitle } from 'components/ModalElements/Title';
import { Select } from 'components/Select';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { NET_WORTHS_AS_OPTIONS } from 'reinvest-app-common/src/constants/net-worths';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteIndividualDraftAccount } from 'reinvest-app-common/src/services/queries/completeIndividualDraftAccount';
import { DraftAccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { WhyRequiredNetWorthModal } from 'views/whyRequiredModals/WhyRequiredNetWorthModal';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'netIncome' | 'netWorth'>;

const schema = z.object({
  netIncome: formValidationRules.netIncome,
  netWorth: formValidationRules.netWorth,
});

export const StepNetWorthAndIncome: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.NET_WORTH_AND_INCOME,

  doesMeetConditionFields(fields) {
    const profileFields = [fields.employmentStatus];

    const isAccountIndividual = fields.accountType === DraftAccountType.Individual;
    const hasProfileFields = allRequiredFieldsExists(profileFields);

    return isAccountIndividual && hasProfileFields;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { error, isLoading, mutateAsync: completeIndividualDraftAccountMutate, isSuccess } = useCompleteIndividualDraftAccount(getApiClient);

    const [isWhyRequiredOpen, setIsWhyRequiredOpen] = useState(false);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);

      const netWorth = fields.netWorth ? { range: fields.netWorth } : undefined;
      const netIncome = fields.netIncome ? { range: fields.netIncome } : undefined;

      await completeIndividualDraftAccountMutate({ accountId: storeFields.accountId || '', input: { netWorth, netIncome } });
    };

    const openWhyRequiredOnClick = () => setIsWhyRequiredOpen(!isWhyRequiredOpen);

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormContent>
            <ModalTitle title="What is approximate net worth and income?" />
            {error && <ErrorMessagesHandler error={error} />}

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
                onClick={openWhyRequiredOnClick}
              />
            </div>
          </FormContent>

          <ButtonStack>
            <Button
              type="submit"
              label="Continue"
              disabled={shouldButtonBeDisabled}
              loading={isLoading}
            />
          </ButtonStack>
        </Form>

        <WhyRequiredNetWorthModal
          isOpen={isWhyRequiredOpen}
          onOpenChange={openWhyRequiredOnClick}
        />
      </>
    );
  },
};
