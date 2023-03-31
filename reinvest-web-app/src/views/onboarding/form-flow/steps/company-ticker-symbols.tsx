import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { Input } from 'components/FormElements/Input';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useCompleteProfileDetails } from 'reinvest-app-common/src/services/queries/completeProfileDetails';
import { StatementType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { z } from 'zod';

import { CompanyTickerSymbol, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'companyTickerSymbols'>;

const MINUMUM_COMPANY_TICKER_SYMBOLS = 3;
const EMPTY_COMPANY_TICKER_SYMBOL: CompanyTickerSymbol = { symbol: '' };
const initialValues = new Array(MINUMUM_COMPANY_TICKER_SYMBOLS).fill(undefined).map(() => EMPTY_COMPANY_TICKER_SYMBOL);

const schema = z
  .object({
    companyTickerSymbols: z
      .object({
        symbol: z.string(),
      })
      .array()
      .min(MINUMUM_COMPANY_TICKER_SYMBOLS),
  })
  .superRefine((fields, context) => {
    const countOfFilledFields = fields.companyTickerSymbols.filter(({ symbol }) => symbol !== '').length;
    const hasAtLeastThreeFilled = countOfFilledFields >= MINUMUM_COMPANY_TICKER_SYMBOLS;

    if (!hasAtLeastThreeFilled) {
      return context.addIssue({
        code: 'custom',
        path: ['companyTickerSymbols'],
        message: `Must have at least ${MINUMUM_COMPANY_TICKER_SYMBOLS} ticker symbols.`,
      });
    }
  });

export const StepCompanyTickerSymbols: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPANY_TICKER_SYMBOLS,

  willBePartOfTheFlow: ({ statementTypes, isCompletedProfile }) => {
    return !!statementTypes?.includes(StatementType.TradingCompanyStakeholder) && !isCompletedProfile;
  },

  doesMeetConditionFields(fields) {
    const requiredFields = [
      fields.accountType,
      fields.name?.firstName,
      fields.name?.lastName,
      fields.phone?.number,
      fields.phone?.countryCode,
      fields.authCode,
      fields.dateOfBirth,
      fields.residency,
    ];

    return allRequiredFieldsExists(requiredFields) && !!fields.statementTypes?.includes(StatementType.TradingCompanyStakeholder) && !fields.isCompletedProfile;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const hasStoredTickerSymbols = !!storeFields.companyTickerSymbols?.length;
    const defaultValues: Fields = { companyTickerSymbols: hasStoredTickerSymbols ? storeFields.companyTickerSymbols : initialValues };
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

        setShouldAppendButtonBeDisabled(hasAtLeastAnElement && !hasFilledAllFields);
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
          <BlackModalTitle title="Please list ticker symbols of the publicly traded company(s) below." />

          {profileDetailsError && <FormMessage message={profileDetailsError.message} />}

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
