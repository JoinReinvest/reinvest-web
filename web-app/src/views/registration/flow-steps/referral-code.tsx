import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import { FormFields } from '../form-fields';
import { Title } from 'components/Title';
import { Button } from 'components/Button';
import { InputMasked } from 'components/FormElements/InputMasked';

type Fields = Pick<FormFields, 'referralCode'>;

export const StepReferralCode: StepParams<FormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const { handleSubmit, control } = useForm<Fields>({ defaultValues: storeFields });

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);

      moveToNextStep();
    };

    const onSkip = () => {
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Your referral code has been applied."
          subtitle="You and your referrer will receive $20 in dividends following your first investment!"
        />

        <InputMasked
          name="referralCode"
          control={control}
          required
          maskOptions={{ mask: '0000-0000' }}
          placeholder="Referral Code"
        />

        <Button
          type="button"
          variant="outlined"
          label="Skip"
          onClick={onSkip}
        />

        <Button
          type="submit"
          label="Enter Code"
        />
      </form>
    );
  },
};
