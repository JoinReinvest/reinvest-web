import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { Input } from 'components/FormElements/Input';
import { Title } from 'components/Title';
import { useEffect, useState } from 'react';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import { z } from 'zod';

import { CompanyTickerSymbol, OnboardingFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<OnboardingFormFields, 'companyTickerSymbols'>;

const EMPTY_COMPANY_TICKER_SYMBOL: CompanyTickerSymbol = { symbol: '' };

const schema = z
  .object({
    companyTickerSymbols: z
      .object({
        symbol: z.string(),
      })
      .array()
      .min(1),
  })
  .superRefine((fields, context) => {
    const hasAtLeastOneFilled = fields.companyTickerSymbols.some(({ symbol }) => symbol !== '');

    if (!hasAtLeastOneFilled) {
      return context.addIssue({
        code: 'custom',
        path: ['companyTickerSymbols'],
        message: 'At least one company ticker symbol is required.',
      });
    }
  });

export const StepCompanyTickerSymbols: StepParams<OnboardingFormFields> = {
  identifier: Identifiers.COMPANY_TICKER_SYMBOLS,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<OnboardingFormFields>) => {
    const initialValues = storeFields.companyTickerSymbols || [EMPTY_COMPANY_TICKER_SYMBOL];
    const { control, formState, handleSubmit, watch } = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: { companyTickerSymbols: initialValues },
    });

    const { fields, append } = useFieldArray({ control, name: 'companyTickerSymbols' });

    const [shouldAppendButtonBeDisabled, setShouldAppendButtonBeDisabled] = useState(true);
    const shouldSubmitButtonBeDisabled = !formState.isValid || formState.isSubmitting;

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

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title title="Please list ticker symbols of the publicly traded company(s) below." />

        {fields.map((field, index) => (
          <Input
            key={field.id}
            name={`companyTickerSymbols.${index}.symbol`}
            control={control}
            placeholder="Ticker Symbol"
          />
        ))}

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
      </Form>
    );
  },
};
