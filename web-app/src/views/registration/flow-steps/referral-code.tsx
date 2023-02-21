import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModal } from 'components/BlackModal';
import { Button } from 'components/Button';
import { InputMasked } from 'components/FormElements/InputMasked';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import zod, { Schema } from 'zod';

import { FormFields } from '../form-fields';

type Fields = Pick<FormFields, 'referralCode'>;

export const StepReferralCode: StepParams<FormFields> = {
  doesMeetConditionFields: fields => !!fields.email,

  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const schema: Schema<Fields> = zod.object({
      referralCode: zod.string().regex(/^\d{8}$/, { message: 'Invalid referral code' }),
    });

    const { handleSubmit, control } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);

      moveToNextStep();
    };

    const onSkip = () => {
      moveToNextStep();
    };

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
      setIsOpen(true);
    }, []);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative flex h-full flex-col"
          >
            <Title
              title="Do you have a referral code? (optional)"
              subtitle="You and your referrer will receive $20 in dividends following your first investment!"
            />

            <InputMasked
              name="referralCode"
              control={control}
              maskOptions={{ mask: '0000-0000' }}
              placeholder="Referral Code"
            />

            <div className="absolute bottom-0 w-full">
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
              />
            </div>
          </form>
        </BlackModal>
      </MainLayout>
    );
  },
};
