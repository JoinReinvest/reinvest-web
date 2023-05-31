import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from 'components/FormElements/ErrorMessagesHandler';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { ModalTitle } from 'components/ModalElements/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { CompanyTickerSymbol, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import {formValidationRules} from "reinvest-app-common/src/form-schemas";

type Fields = Pick<OnboardingFormFields, 'companyTickerSymbols'>;

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

export const StepCompanyTickerSymbols: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPANY_TICKER_SYMBOLS,

  willBePartOfTheFlow: ({ statementTypes, isCompletedProfile }) => {
    return !!statementTypes?.includes(StatementType.TradingCompanyStakeholder) && !isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [fields.accountType, fields.name?.firstName, fields.name?.lastName, fields.dateOfBirth, fields.residency];

    return allRequiredFieldsExists(requiredFields) && !!fields.statementTypes?.includes(StatementType.TradingCompanyStakeholder) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const hasStoredTickerSymbols = !!storeFields.companyTickerSymbols?.length;
    const defaultValues: Fields = { companyTickerSymbols: hasStoredTickerSymbols ? storeFields.companyTickerSymbols : INITIAL_VALUES };
    const { error: profileDetailsError, isLoading, mutateAsync: completeProfileMutate, isSuccess } = useCompleteProfileDetails(getApiClient);
    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues,
    });

    const { fields, append } = useFieldArray({ control, name: 'companyTickerSymbols' });

    const [shouldAppendButtonBeDisabled, setShouldAppendButtonBeDisabled] = useState(true);
    const shouldSubmitButtonBeDisabled = !formState.isValid || formState.isSubmitting || isLoading;

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
        await completeProfileMutate({ input: { statements: [{ type: StatementType.TradingCompanyStakeholder, forStakeholder: { tickerSymbols } }] } });
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
          <ModalTitle title="Please list ticker symbols of the publicly traded company(s) below." />

          {profileDetailsError && <ErrorMessagesHandler error={profileDetailsError} />}

          <div className="flex w-full flex-col gap-16">
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
            loading={isLoading}
          />
        </ButtonStack>
      </Form>
    );
  },
};
