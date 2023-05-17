import {FieldValues, UseFormReturn} from 'react-hook-form';
import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';

import { Button } from '../../components/Button';
import { ButtonStack } from '../../components/FormElements/ButtonStack';
import { ErrorMessagesHandler } from '../../components/FormElements/ErrorMessagesHandler';
import { Form } from '../../components/FormElements/Form';
import { FormContent } from '../../components/FormElements/FormContent';
import { Input } from '../../components/FormElements/Input';
import { ModalTitle } from '../../components/ModalElements/Title';

interface FullNameViewProps<T> {
  onSubmit: (fields: T) => Promise<void>;
  error?: ErrorResponse;
  form: UseFormReturn<T>;
}

export const FullNameView = <T extends FieldValues>({ error, form, onSubmit }: FullNameViewProps<T>) => {
  return (
    <Form onSubmit={form.handleSubmit(onSubmit)}>
      <FormContent>
        <ModalTitle title="Enter your first and last name as it appears on your ID" />

        {error && <ErrorMessagesHandler error={error} />}
        <div className="flex w-full flex-col gap-16">
          <Input
            name="name.firstName"
            control={form.control}
            placeholder="First Name"
            required
          />

          <Input
            name="name.middleName"
            control={form.control}
            placeholder="Middle Name (Optional)"
          />

          <Input
            name="name.lastName"
            control={form.control}
            placeholder="Last Name"
            required
          />
        </div>
      </FormContent>

      <ButtonStack>
        <Button
          type="submit"
          label="Continue"
        />
      </ButtonStack>
    </Form>
  );
};
