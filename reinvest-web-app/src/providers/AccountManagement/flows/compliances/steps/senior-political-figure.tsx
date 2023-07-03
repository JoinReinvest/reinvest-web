import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { TextArea } from 'components/FormElements/TextArea';
import { Typography } from 'components/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';
const TITLE = 'Please provide the name and position of this senior political figure.';
type Fields = Pick<FlowFields, 'seniorPoliticalFigure'>;

const schema = z.object({
  seniorPoliticalFigure: formValidationRules.seniorPoliticalFigure,
});

export const StepSeniorPoliticalFigure: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.SENIOR_POLITICAL_FIGURES,

  willBePartOfTheFlow: ({ statementTypes }) => {
    return !!statementTypes?.includes(StatementType.Politician);
  },

  doesMeetConditionFields(fields) {
    return !!fields.statementTypes?.includes(StatementType.Politician);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { control, reset, formState, handleSubmit } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: storeFields,
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async ({ seniorPoliticalFigure }) => {
      await updateStoreFields({ seniorPoliticalFigure });

      if (seniorPoliticalFigure) {
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

            <TextArea.Counter
              name="seniorPoliticalFigure"
              control={control}
              maxCharacters={220}
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
