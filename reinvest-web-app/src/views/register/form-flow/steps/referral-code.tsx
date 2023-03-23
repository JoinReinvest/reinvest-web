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
import { fetcher } from 'services/fetcher';
import zod, { Schema } from 'zod';

import { RegisterFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';

type Fields = Pick<RegisterFormFields, 'referralCode'>;

export const StepReferralCode: StepParams<RegisterFormFields> = {
  identifier: Identifiers.REFERRAL_CODE,
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const [isValidatingReferralCode, setIsValidatingReferralCode] = useState(false);
    const [error, setError] = useState<string | undefined>('');

    const schema: Schema<Fields> = zod.object({
      referralCode: formValidationRules.referralCode,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      setError(undefined);
      try {
        setIsValidatingReferralCode(true);
        updateStoreFields(fields);
        setIsValidatingReferralCode(false);

        if (fields.referralCode) {
          const response = await fetcher(
            `${env.apiUrl}/incentive-token`,
            'POST',
            new URLSearchParams({
              token: fields.referralCode,
            }),
          );

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
