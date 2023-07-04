import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { CheckboxLabeled } from 'components/FormElements/CheckboxLabeled';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { COMPANY_STATEMENT, FINRA_STATEMENT, NONE_STATEMENT, POLITICAL_STATEMENT } from 'constants/compliances';
import { ChangeEvent } from 'react';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { schema } from 'views/onboarding/form-flow/steps/compliance';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const BUTTON_LABEL = 'Continue';
const TITLE = 'Do any of the following apply to you?';

type Fields = FlowFields['compliances'] & {
  doNoneApply?: boolean;
};

export const StepSelectCompliance: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_COMPLIANCE,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep, storeFields }: StepComponentProps<FlowFields>) => {
    const form = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: async () => storeFields.compliances ?? {},
    });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      await updateStoreFields({ compliances: fields });
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      form.reset();
      moveToPreviousStep();
    };

    const onFieldComplianceChange = (key: Exclude<FieldPath<Fields>, 'doNoneApply'>, event: ChangeEvent<HTMLInputElement>) => {
      const value = !!event.target.value;
      const hasFieldDoNoneApplyChecked = !!form.getValues('doNoneApply');

      if (hasFieldDoNoneApplyChecked) {
        form.setValue('doNoneApply', false);
      }

      form.setValue(key, value);
    };

    const onFieldDoNoneApplyChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = !!event.target.value;

      if (value) {
        form.setValue('isAssociatedWithFinra', false);
        form.setValue('isAssociatedWithPubliclyTradedCompany', false);
        form.setValue('isSeniorPoliticalFigure', false);
      }

      form.setValue('doNoneApply', value);
    };

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>

            <CheckboxLabeled
              name="isAssociatedWithFinra"
              control={form.control}
              rules={{ onChange: event => onFieldComplianceChange('isAssociatedWithFinra', event) }}
            >
              {FINRA_STATEMENT}
            </CheckboxLabeled>

            <CheckboxLabeled
              name="isAssociatedWithPubliclyTradedCompany"
              control={form.control}
              rules={{ onChange: event => onFieldComplianceChange('isAssociatedWithPubliclyTradedCompany', event) }}
            >
              {COMPANY_STATEMENT}
            </CheckboxLabeled>

            <CheckboxLabeled
              name="isSeniorPoliticalFigure"
              control={form.control}
              rules={{ onChange: event => onFieldComplianceChange('isSeniorPoliticalFigure', event) }}
            >
              {POLITICAL_STATEMENT}
            </CheckboxLabeled>

            <CheckboxLabeled
              name="doNoneApply"
              control={form.control}
              rules={{ onChange: onFieldDoNoneApplyChange }}
            >
              {NONE_STATEMENT}
            </CheckboxLabeled>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
