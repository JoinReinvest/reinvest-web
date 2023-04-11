import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModalTitle } from 'components/BlackModal/BlackModalTitle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormMessage } from 'components/FormElements/FormMessage';
import { InputReferralCode } from 'components/FormElements/InputReferralCode';
import { env } from 'env';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { makeRequest } from 'services/api-request';
import zod, { Schema } from 'zod';

import { RegisterFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<RegisterFormFields, 'referralCode'>;

const schema: Schema<Fields> = zod.object({
  referralCode: formValidationRules.referralCode,
});

export const StepReferralCode: StepParams<RegisterFormFields> = {
  identifier: Identifiers.REFERRAL_CODE,
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const [isValidatingReferralCode, setIsValidatingReferralCode] = useState(false);
    const [error, setError] = useState<string | undefined>('');

    const { handleSubmit, control, formState } = useForm<Fields>({ mode: 'onBlur', defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setError(undefined);
      try {
        setIsValidatingReferralCode(true);
        updateStoreFields(fields);
        setIsValidatingReferralCode(false);

        if (fields.referralCode) {
          const url = `${env.apiUrl}/incentive-token`;
          const body = new URLSearchParams({ token: fields.referralCode });

          const response = await makeRequest({
            url,
            method: 'POST',
            data: body,
          });

          if (!response.status) {
            throw new Error('Invalid referral code');
          }

          moveToNextStep();
        }
      } catch (error) {
        setError((error as Error).message);
        setIsValidatingReferralCode(false);
      }
    };

    const onSkip = () => {
      updateStoreFields({ referralCode: undefined });
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormContent>
          <BlackModalTitle
            title="Do you have a referral code? (optional)"
            subtitle="You and your referrer will receive $20 in dividends following your first investment!"
          />

          {error && <FormMessage message={error} />}

          <InputReferralCode
            name="referralCode"
            control={control}
            defaultValue={storeFields.referralCode}
          />
        </FormContent>

        <ButtonStack>
          <Button
            type="button"
            variant="outlined"
            label="Skip"
            onClick={onSkip}
            className="text-white"
            disabled={isValidatingReferralCode}
          />

          <Button
            type="submit"
            label="Enter Code"
            disabled={shouldButtonBeDisabled}
            loading={isValidatingReferralCode}
          />
        </ButtonStack>
      </Form>
    );
  },
};
