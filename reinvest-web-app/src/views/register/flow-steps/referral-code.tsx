import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputReferralCode } from 'components/FormElements/InputReferralCode';
import { Title } from 'components/Title';
import { formValidationRules } from 'formValidationRules';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { RegisterFormFields } from '../form-fields';

type Fields = Pick<RegisterFormFields, 'referralCode'>;

export const StepReferralCode: StepParams<RegisterFormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const [isValidatingReferralCode, setIsValidatingReferralCode] = useState(false);

    const schema: Schema<Fields> = zod.object({
      referralCode: formValidationRules.referralCode,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      try {
        setIsValidatingReferralCode(true);
        updateStoreFields(fields);
        setIsValidatingReferralCode(false);

        moveToNextStep();
      } catch (error) {
        setIsValidatingReferralCode(false);
      }
    };

    const onSkip = () => {
      moveToNextStep();
    };

    return (
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Do you have a referral code? (optional)"
          subtitle="You and your referrer will receive $20 in dividends following your first investment!"
        />

        <InputReferralCode
          name="referralCode"
          control={control}
        />

        <div className="absolute bottom-0 w-full md:relative md:bottom-auto">
          <Button
            type="button"
            variant="outlined"
            label="Skip"
            onClick={onSkip}
            className="mb-16 text-white"
          />

          <Button
            type="submit"
            label="Enter Code"
            disabled={shouldButtonBeDisabled}
            loading={isValidatingReferralCode}
          />
        </div>
      </Form>
    );
  },
};
