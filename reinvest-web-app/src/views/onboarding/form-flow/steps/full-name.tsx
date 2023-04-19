import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { PrivacyPolicyStatement, StatementType, TermsAndConditionsStatement } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<OnboardingFormFields, 'name'>>;

const schema = z.object({
  name: z.object({
    firstName: formValidationRules.firstName,
    middleName: formValidationRules.middleName,
    lastName: formValidationRules.lastName,
  }),
});

export const StepFullName: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FULL_NAME,

  willBePartOfTheFlow(fields) {
    return !fields.accountType && !fields.isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType];

    return allRequiredFieldsExists(requiredFields) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const defaultValues: Fields = storeFields.name ? { name: storeFields.name } : { name: { firstName: '', middleName: '', lastName: '' } };
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: defaultValues,
    });

    const { error, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields(fields);
      await completeProfileMutate({
        input: {
          name: fields?.name,
          statements: [
            { type: StatementType.PrivacyPolicy, forPrivacyPolicy: { statement: PrivacyPolicyStatement.IHaveReadAndAgreeToTheReinvestPrivacyPolicy } },
            {
              type: StatementType.TermsAndConditions,
              forTermsAndConditions: { statement: TermsAndConditionsStatement.IHaveReadAndAgreeToTheReinvestTermsAndConditions },
            },
          ],
        },
      });
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Enter your first and last name as it appears on your ID" />

          {error && <ErrorMessagesHandler error={error} />}
          <div className="flex w-full flex-col gap-16">
            <Input
              name="name.firstName"
              control={form.control}
              placeholder="First Name"
              required
            />

            <Input
              name="name.middleName"
              control={form.control}
              placeholder="Middle Name (Optional)"
            />

            <Input
              name="name.lastName"
              control={form.control}
              placeholder="Last Name"
              required
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
    );
  },
};
