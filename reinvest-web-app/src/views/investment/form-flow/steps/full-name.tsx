import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Input } from 'components/FormElements/Input';
import { ModalTitle } from 'components/ModalElements/Title';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dateOlderThanEighteenYearsSchema, formValidationRules } from 'reinvest-app-common/src/form-schemas';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { formatDate, isDateFromApi } from 'reinvest-app-common/src/utilities/dates';
import { z } from 'zod';

import { InputBirthDate } from '../../../../components/FormElements/InputBirthDate';
import { InputSocialSecurityNumber } from '../../../../components/FormElements/InputSocialSecurityNumber';
import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

type Fields = Required<Pick<FlowFields, 'name' | 'dateOfBirth' | 'ssn'>>;

const schema = z.object({
  name: z.object({
    firstName: formValidationRules.firstName,
    middleName: formValidationRules.middleName,
    lastName: formValidationRules.lastName,
  }),
  dateOfBirth: dateOlderThanEighteenYearsSchema,
});

export const StepFullName: StepParams<FlowFields> = {
  identifier: Identifiers.FULL_NAME,

  doesMeetConditionFields: fields => {
    return !!fields._shouldUpdateProfileDetails;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const defaultValues: Fields =
      storeFields.name && storeFields.dateOfBirth && storeFields.ssn
        ? {
            name: storeFields.name,
            dateOfBirth: isDateFromApi(storeFields.dateOfBirth || '')
              ? formatDate(storeFields.dateOfBirth || '', 'DEFAULT', { currentFormat: 'API' })
              : storeFields.dateOfBirth,
            ssn: storeFields.ssn,
          }
        : { name: { firstName: '', middleName: '', lastName: '' }, dateOfBirth: '', ssn: '' };
    const form = useForm<Fields>({
      mode: 'all',
      resolver: zodResolver(schema),
      defaultValues: async () => defaultValues,
    });

    const shouldButtonBeDisabled = !form.formState.isValid || form.formState.isSubmitting;

    const onSubmit: SubmitHandler<Fields> = async fields => {
      const dateOfBirth = formatDate(fields.dateOfBirth || '', 'API', { currentFormat: 'DEFAULT' });

      await updateStoreFields({ ...fields, dateOfBirth });
      moveToNextStep();
    };

    return (
      <Form onSubmit={form.handleSubmit(onSubmit)}>
        <FormContent>
          <ModalTitle title="Enter your first and last name as it appears on your ID" />

          <div className="full-name-investment-flow flex w-full flex-col gap-16">
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

            <InputBirthDate
              name="dateOfBirth"
              control={form.control}
            />

            <InputSocialSecurityNumber
              name="ssn"
              control={form.control}
              willUseSecureMask={true}
              disabled
            />
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
            disabled={shouldButtonBeDisabled}
          />
        </ButtonStack>
      </Form>
    );
  },
};
