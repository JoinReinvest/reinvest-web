import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { Typography } from '../../../../../components/Typography';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

type Fields = Pick<FlowFields, 'finraInstitutionName'>;

const TITLE = 'Please provide name of the FINRA institution below.';

const schema = z.object({
  finraInstitutionName: formValidationRules.finraInstitutionName,
});

export const StepFinraInstitution: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.FINRA_INSTITUTION,

  willBePartOfTheFlow: ({ statementTypes }) => {
    return !!statementTypes?.includes(StatementType.FinraMember);
  },

  doesMeetConditionFields(fields) {
    return !!fields.statementTypes?.includes(StatementType.FinraMember);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { control, reset, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ finraInstitutionName }) => {
      await updateStoreFields({ finraInstitutionName });

      if (finraInstitutionName) {
        moveToNextStep();
      }
    };

    const onButtonBackClick = () => {
      reset();
      moveToPreviousStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <Input
              name="finraInstitutionName"
              control={control}
              placeholder="FINRA Institute Name"
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
    );
  },
};
