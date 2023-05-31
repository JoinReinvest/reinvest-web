import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { ErrorMessagesHandler } from '../../../../components/FormElements/ErrorMessagesHandler';
import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import {formValidationRules} from "reinvest-app-common/src/form-schemas";

type Fields = Pick<OnboardingFormFields, 'finraInstitutionName'>;

const schema = z.object({
  finraInstitutionName: formValidationRules.finraInstitutionName,
});

export const StepFinraInstitution: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.FINRA_INSTITUTION,

  willBePartOfTheFlow: ({ statementTypes }) => {
    return !!statementTypes?.includes(StatementType.FinraMember);
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !!fields.statementTypes?.includes(StatementType.FinraMember) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

    const onSubmit: SubmitHandler<Fields> = async ({ finraInstitutionName }) => {
      await updateStoreFields({ finraInstitutionName });

      if (finraInstitutionName) {
        await completeProfileMutate({ input: { statements: [{ type: StatementType.FinraMember, forFINRA: { name: finraInstitutionName } }] } });
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
          <ModalTitle title="Please provide name of the FINRA institution below." />
          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}
          <Input
            name="finraInstitutionName"
            control={control}
            placeholder="FINRA Institute Name"
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
