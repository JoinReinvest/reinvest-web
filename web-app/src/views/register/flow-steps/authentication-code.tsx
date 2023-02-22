import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModal } from 'components/BlackModal';
import { Button } from 'components/Button';
import { Form } from 'components/FormElements/Form';
import { Link } from 'components/Link';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { useEffect, useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import { areElementsTrue } from 'utilities/array-validations';
import zod, { Schema } from 'zod';

import { AuthenticationCodeInput } from '../../../components/FormElements/AuthenticationCodeInput';
import { FormFields } from '../form-fields';

type Fields = Pick<FormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<FormFields> = {
  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password];

    return areElementsTrue(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const schema: Schema<Fields> = zod.object({
      authenticationCode: zod.string().regex(/^\d{8}$/, { message: 'Invalid authentication code' }),
    });
    const { handleSubmit, control } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });
    const [isOpen, setIsOpen] = useState(false);
    const subtitleMessage = useMemo(() => `Enter the email authentication code sent to your email ${storeFields.email}.`, [storeFields.email]);

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    useEffect(() => {
      setIsOpen(true);
    }, []);

    return (
      <MainLayout>
        <BlackModal isOpen={isOpen}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Title
              title="Check Your Email"
              subtitle={subtitleMessage}
            />

            <AuthenticationCodeInput control={control} />

            <div className="flex justify-between">
              <Link
                href="/"
                title="Resend Code"
              >
                Resend Code
              </Link>
              <Link
                href="/"
                title="Get Help"
              >
                Get Help
              </Link>
            </div>

            <Button
              type="submit"
              label="Sign Up"
              className="absolute bottom-0 w-full md:relative md:bottom-auto"
            />
          </Form>
        </BlackModal>
      </MainLayout>
    );
  },
};
