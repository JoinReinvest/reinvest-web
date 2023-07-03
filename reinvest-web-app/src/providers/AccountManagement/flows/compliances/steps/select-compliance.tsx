import { zodResolver } from '@hookform/resolvers/zod';
import { IconCircleError } from 'assets/icons/IconCircleError';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { CheckboxLabeled } from 'components/FormElements/CheckboxLabeled';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { ChangeEvent } from 'react';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { schema } from 'views/onboarding/form-flow/steps/company-ticker-symbols';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const BUTTON_LABEL = 'Confirm';
const TITLE = 'Update your name';
const SUBTITLE = 'Updating your name will prompt you to upload a new ID card';

type Fields = FlowFields['compliances'] & {
  doNoneApply?: boolean;
};

const getDefaultValues = ({ statementTypes, compliances }: FlowFields): Fields => ({
  isAssociatedWithFinra: statementTypes?.includes(StatementType.FinraMember),
  isAssociatedWithPubliclyTradedCompany: statementTypes?.includes(StatementType.TradingCompanyStakeholder),
  isSeniorPoliticalFigure: statementTypes?.includes(StatementType.Politician),
  doNoneApply: !!compliances?.doNoneApply,
});

export const StepSelectCompliance: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.NEW_COMPLIANCE,

  Component: ({ moveToNextStep, updateStoreFields, moveToPreviousStep, storeFields }: StepComponentProps<FlowFields>) => {
    const { setValue, getValues, control, handleSubmit, formState, reset } = useForm<Fields>({
      mode: 'onSubmit',
      resolver: zodResolver(schema),
      defaultValues: async () => getDefaultValues(storeFields),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;
    const onSubmit: SubmitHandler<Fields> = async fields => {
      const statements = [];
      fields.isAssociatedWithFinra && statements.push(StatementType.FinraMember);
      fields.isAssociatedWithPubliclyTradedCompany && statements.push(StatementType.TradingCompanyStakeholder);
      fields.isSeniorPoliticalFigure && statements.push(StatementType.Politician);
      await updateStoreFields({ statementTypes: statements, compliances: fields });
      moveToNextStep();
    };

    const onButtonBackClick = () => {
      reset();
      moveToPreviousStep();
    };

    const onFieldComplianceChange = (key: Exclude<FieldPath<Fields>, 'doNoneApply'>, event: ChangeEvent<HTMLInputElement>) => {
      const value = !!event.target.value;
      const hasFieldDoNoneApplyChecked = !!getValues('doNoneApply');

      if (hasFieldDoNoneApplyChecked) {
        setValue('doNoneApply', false);
      }

      setValue(key, value);
    };

    const onFieldDoNoneApplyChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = !!event.target.value;

      if (value) {
        setValue('isAssociatedWithFinra', false);
        setValue('isAssociatedWithPubliclyTradedCompany', false);
        setValue('isSeniorPoliticalFigure', false);
      }

      setValue('doNoneApply', value);
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <Typography variant="paragraph-small">
              <span className="flex items-center gap-9 text-gray-01">
                <IconCircleError className="inline-block" /> {SUBTITLE}
              </span>
            </Typography>
            <CheckboxLabeled
              name="isAssociatedWithFinra"
              control={control}
              rules={{ onChange: event => onFieldComplianceChange('isAssociatedWithFinra', event) }}
            >
              Are you or anyone in your immediate household, or, for any non-natural person, any officers, directors, or any person that owns or controls 5% (or
              greater) of the equity, associated with a FINRA member, organization, or the SEC.
            </CheckboxLabeled>

            <CheckboxLabeled
              name="isAssociatedWithPubliclyTradedCompany"
              control={control}
              rules={{ onChange: event => onFieldComplianceChange('isAssociatedWithPubliclyTradedCompany', event) }}
            >
              Are you or anyone in your household or immediate family, or, for any non-natural person, any of its directors, trustees, 10% (or more) equity
              holder, an officer, or member of the board of directors of a publicly traded company?
            </CheckboxLabeled>

            <CheckboxLabeled
              name="isSeniorPoliticalFigure"
              control={control}
              rules={{ onChange: event => onFieldComplianceChange('isSeniorPoliticalFigure', event) }}
            >
              Are you or any of your immediate family a senior political figure?
            </CheckboxLabeled>

            <CheckboxLabeled
              name="doNoneApply"
              control={control}
              rules={{ onChange: onFieldDoNoneApplyChange }}
            >
              None of the above apply
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
