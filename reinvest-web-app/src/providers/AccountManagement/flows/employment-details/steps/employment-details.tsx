import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { Select } from 'components/Select';
import { Typography } from 'components/Typography';
import { useIndividualAccount } from 'hooks/individual-account';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { INDUESTRIES_AS_OPTIONS, INDUSTRIES_VALUES } from 'reinvest-app-common/src/constants/industries';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { EmploymentStatus } from 'reinvest-app-common/src/types/graphql';
import { Schema, z } from 'zod';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

type Fields = Pick<FlowFields, 'employmentDetails'>;

const schema: Schema<Fields> = z.object({
  employmentDetails: z.object({
    employerName: formValidationRules.employerName,
    occupation: formValidationRules.occupation,
    industry: z.enum(INDUSTRIES_VALUES),
  }),
});

const TITLE = 'Employment Details';
const BUTTON_LABEL = 'Update';

export const StepEmploymentDetails: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.EMPLOYMENT_STATUS,

  doesMeetConditionFields: fields => {
    return fields.employmentStatus === EmploymentStatus.Employed;
  },

  Component: ({ storeFields, moveToNextStep, updateStoreFields, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { updateIndividualAccount, updateIndividualAccountMeta } = useIndividualAccount();
    const form = useForm<Fields>({
      resolver: zodResolver(schema),
      defaultValues: async () => ({ employmentDetails: storeFields.employmentDetails }),
    });

    useEffect(() => {
      if (updateIndividualAccountMeta.isSuccess) {
        moveToNextStep();
      }
    }, [updateIndividualAccountMeta.isSuccess, moveToNextStep]);

    const shouldButtonBeLoading = updateIndividualAccountMeta.isLoading || form.formState.isSubmitting;
    const shouldButtonBeDisabled = shouldButtonBeLoading || !form.formState.isValid;

    const onSubmit: SubmitHandler<Fields> = async ({ employmentDetails }) => {
      if (employmentDetails) {
        await updateStoreFields({ employmentDetails });

        if (employmentDetails?.employerName && employmentDetails?.occupation && employmentDetails?.industry) {
          await updateIndividualAccount({
            employer: {
              nameOfEmployer: employmentDetails?.employerName,
              title: employmentDetails?.occupation,
              industry: employmentDetails?.industry,
            },
          });
        }
      }
    };

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack
            onClick={onButtonBackClick}
            disabled={shouldButtonBeLoading}
          />

          <Typography variant="h5">{TITLE}</Typography>

          <div className="flex w-full flex-col gap-16">
            <Input
              name="employmentDetails.employerName"
              control={form.control}
              placeholder="Name of Employer"
              required
            />

            <Input
              name="employmentDetails.occupation"
              control={form.control}
              placeholder="Title"
              required
            />

            <Select
              name="employmentDetails.industry"
              control={form.control}
              options={INDUESTRIES_AS_OPTIONS}
              placeholder="Industry"
              forWhiteBackground
              required
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            loading={shouldButtonBeLoading}
            disabled={shouldButtonBeDisabled}
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
