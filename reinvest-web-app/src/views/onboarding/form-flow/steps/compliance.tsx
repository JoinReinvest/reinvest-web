import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { CheckboxLabeled } from 'components/FormElements/CheckboxLabeled';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { ChangeEvent } from 'react';
import { FieldPath, SubmitHandler, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = OnboardingFormFields['compliances'] & {
  doNoneApply: boolean;
};

const getDefaultValues = ({ compliances }: OnboardingFormFields): Fields => {
  const hasCompliances = compliances && Object.values(compliances).some(Boolean);

  if (hasCompliances) {
    return { ...compliances, doNoneApply: false };
  }

  return {
    isAssociatedWithFinra: false,
    isAssociatedWithPubliclyTradedCompany: false,
    isSeniorPoliticalFigure: false,
    doNoneApply: false,
  };
};

const schema = z
  .object({
    isAssociatedWithFinra: z.boolean().optional(),
    isAssociatedWithPubliclyTradedCompany: z.boolean().optional(),
    isSeniorPoliticalFigure: z.boolean().optional(),
    doNoneApply: z.boolean().optional(),
  })
  .superRefine(({ isAssociatedWithFinra, isAssociatedWithPubliclyTradedCompany, isSeniorPoliticalFigure, doNoneApply }, context) => {
    const compliances = {
      isAssociatedWithFinra,
      isAssociatedWithPubliclyTradedCompany,
      isSeniorPoliticalFigure,
    };

    const areSomeCompliancesTrue = Object.values(compliances).some(Boolean);
    const areAllCompliancesFalse = Object.values(compliances).every(value => !value);
    const isDoNoneApplyChecked = !!doNoneApply;
    const hasSomeCompliancesAndDoNoneApply = areSomeCompliancesTrue && isDoNoneApplyChecked;
    const hasAllCompliancesAndDoNoneApply = areAllCompliancesFalse && !isDoNoneApplyChecked;

    if (hasSomeCompliancesAndDoNoneApply || hasAllCompliancesAndDoNoneApply) {
      context.addIssue({
        code: 'custom',
        message: 'Please select only one option',
      });
    }
  });

export const StepCompliances: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPLIANCES,

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const { control, formState, handleSubmit, setValue, getValues } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: async () => getDefaultValues(storeFields),
    });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

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

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const statements = [];
      fields.isAssociatedWithFinra && statements.push(StatementType.FinraMember);
      fields.isAssociatedWithPubliclyTradedCompany && statements.push(StatementType.TradingCompanyStakeholder);
      fields.isSeniorPoliticalFigure && statements.push(StatementType.Politician);
      await updateStoreFields({ statementTypes: statements, compliances: fields });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle title="Do any of the following apply to you?" />

          <div className="flex w-full flex-col gap-16">
            {formState.errors.root?.message && (
              <FormMessage
                message={formState.errors.root?.message}
                variant="error"
              />
            )}

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
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
