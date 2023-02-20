import { SubmitHandler, useForm } from 'react-hook-form';
import { StepParams } from 'services/form-flow';
import { FormFields } from '../form-fields';
import { InputMasked } from 'components/FormElements/InputMasked';
import { Button } from 'components/Button';
import { areElementsTrue } from 'utilities/array-validations';
import { Title } from 'components/Title';
import { Link } from 'components/Link';
import { useMemo } from 'react';

type Fields = Pick<FormFields, 'authenticationCode'>;

export const StepAuthenticationCode: StepParams<FormFields> = {
  doesMeetConditionFields: fields => {
    const requiredFields = [fields.email, fields.password];

    return areElementsTrue(requiredFields);
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }) => {
    const { handleSubmit, control } = useForm<Fields>({ defaultValues: storeFields });

    const subtitleMessage = useMemo(() => `Enter the email authentication code sent to your email ${storeFields.email}.`, [storeFields.email]);

    const onSubmit: SubmitHandler<Fields> = fields => {
      updateStoreFields(fields);
      moveToNextStep();
    };

    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Title
          title="Check Your Email"
          subtitle={subtitleMessage}
        />

        <InputMasked
          name="authenticationCode"
          control={control}
          maskOptions={{ mask: '0000-0000' }}
          placeholder="Authentication Code"
          required
        />

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
        />
      </form>
    );
  },
};
