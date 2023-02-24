import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { InputReferralCode } from 'components/FormElements/InputReferralCode';
import { Title } from 'components/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepComponentProps, StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { formValidationRules } from '../../../formValidationRules';
import { RegisterFormFields } from '../form-fields';

type Fields = Pick<RegisterFormFields, 'referralCode'>;

export const StepReferralCode: StepParams<RegisterFormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<RegisterFormFields>) => {
    const schema: Schema<Fields> = zod.object({
      referralCode: formValidationRules.referralCode,
    });

    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const shouldButtonBeDisabled = !formState.isValid || formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = fields => {
      // TO-DO: Check if the referral code actually pertains to another
      //    user - if so, proceed call `updateStoreFields(fields)` so that
      //    the next step will be the confirmation message once
      //    `moveToNextStep()` is invoked.
      updateStoreFields(fields);
      moveToNextStep();
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
          />
        </div>
      </Form>
    );
  },
};
