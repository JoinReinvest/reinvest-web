import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { TextArea } from 'components/FormElements/TextArea';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'seniorPoliticalFigure'>;

const schema = z.object({
  seniorPoliticalFigure: formValidationRules.seniorPoliticalFigure,
});

export const StepSeniorPoliticalFigure: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.SENIOR_POLITICAL_FIGURE,

  willBePartOfTheFlow: ({ statementTypes, isCompletedProfile }) => {
    return !!statementTypes?.includes(StatementType.Politician) && !isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !!fields.statementTypes?.includes(StatementType.Politician) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ seniorPoliticalFigure }) => {
      await updateStoreFields({ seniorPoliticalFigure });

      if (seniorPoliticalFigure) {
        await completeProfileMutate({ input: { statements: [{ type: StatementType.Politician, forPolitician: { description: seniorPoliticalFigure } }] } });
      }
    };

    useEffect(() => {
      if (isSuccess) {
        moveToNextStep();
      }
    }, [isSuccess, moveToNextStep]);

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Please provide the name and position of this senior political figure." />

          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}

          <TextArea
            name="seniorPoliticalFigure"
            control={control}
            maxCharacters={220}
          />
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
