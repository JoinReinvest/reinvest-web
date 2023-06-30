import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { z } from 'zod';

import { ButtonBack } from '../../../../../components/ButtonBack';
import { Typography } from '../../../../../components/Typography';
import { CompanyTickerSymbol } from '../../../../../views/onboarding/form-flow/form-fields';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

type Fields = Pick<FlowFields, 'companyTickerSymbols'>;
const TITLE = 'Please list ticker symbols of the publicly traded company(s) below.';

const STARTING_NUMBER_OF_TICKER_SYMBOLS = 3;
const MINUMUM_COMPANY_TICKER_SYMBOLS = 1;
const MAXIMUM_COMPANY_TICKER_SYMBOLS = 5;
const EMPTY_COMPANY_TICKER_SYMBOL: CompanyTickerSymbol = { symbol: '' };
const INITIAL_VALUES = new Array(STARTING_NUMBER_OF_TICKER_SYMBOLS).fill(undefined).map(() => EMPTY_COMPANY_TICKER_SYMBOL);

const schema = z
  .object({
    companyTickerSymbols: z
      .object({
        symbol: formValidationRules.symbolTicker,
      })
      .array()
      .min(MINUMUM_COMPANY_TICKER_SYMBOLS),
  })
  .superRefine((fields, context) => {
    const countOfFilledFields = fields.companyTickerSymbols.filter(({ symbol }) => symbol !== '').length;
    const hasMinimumFilled = countOfFilledFields >= MINUMUM_COMPANY_TICKER_SYMBOLS;
    const hasExceededMaximum = countOfFilledFields > MAXIMUM_COMPANY_TICKER_SYMBOLS;

    if (!hasMinimumFilled) {
      context.addIssue({
        code: 'custom',
        path: ['companyTickerSymbols'],
        message: `Must have at least ${MINUMUM_COMPANY_TICKER_SYMBOLS} ticker symbols.`,
      });
    }

    if (hasExceededMaximum) {
      context.addIssue({
        code: 'custom',
        path: ['companyTickerSymbols'],
        message: `Must have no more than ${MAXIMUM_COMPANY_TICKER_SYMBOLS} ticker symbols.`,
      });
    }
  });

export const StepCompanyTickerSymbols: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.COMPANY_TICKER_SYMBOLS,

  willBePartOfTheFlow: ({ statementTypes }) => {
    return !!statementTypes?.includes(StatementType.TradingCompanyStakeholder);
  },

  doesMeetConditionFields(fields) {
    return !!fields.statementTypes?.includes(StatementType.TradingCompanyStakeholder);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const hasStoredTickerSymbols = !!storeFields.companyTickerSymbols?.length;
    const defaultValues: Fields = { companyTickerSymbols: hasStoredTickerSymbols ? storeFields.companyTickerSymbols : INITIAL_VALUES };
    const { control, reset, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { fields, append } = useFieldArray({ control, name: 'companyTickerSymbols' });

    const [shouldAppendButtonBeDisabled, setShouldAppendButtonBeDisabled] = useState(true);
    const shouldSubmitButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    useEffect(() => {
      const { unsubscribe } = watch(({ companyTickerSymbols }) => {
        const hasFilledAllFields = !!companyTickerSymbols?.every(ticker => !!ticker?.symbol && ticker?.symbol !== '');
        const hasAtLeastAnElement = !!companyTickerSymbols?.length;
        const hasMoreThanMaximum = (companyTickerSymbols?.length || 0) >= MAXIMUM_COMPANY_TICKER_SYMBOLS;

        setShouldAppendButtonBeDisabled((hasAtLeastAnElement && !hasFilledAllFields) || hasMoreThanMaximum);
      });

      return () => {
        unsubscribe();
      };
    }, [watch]);

    const onAdditionalCompanyClick = () => {
      append(EMPTY_COMPANY_TICKER_SYMBOL);
    };

    const onSubmit: SubmitHandler<Fields> = async ({ companyTickerSymbols }) => {
      await updateStoreFields({ companyTickerSymbols });
      const tickerSymbols = companyTickerSymbols?.map(ticker => ticker.symbol);

      if (tickerSymbols) {
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

            {fields.map((field, index) => (
              <Input
                key={field.id}
                name={`companyTickerSymbols.${index}.symbol`}
                control={control}
                placeholder="Ticker Symbol"
              />
            ))}
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="button"
            label="Additional Company"
            icon="add"
            showIcon="left"
            onClick={onAdditionalCompanyClick}
            disabled={shouldAppendButtonBeDisabled}
          />

          <Button
            type="submit"
            label="Continue"
            disabled={shouldSubmitButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
