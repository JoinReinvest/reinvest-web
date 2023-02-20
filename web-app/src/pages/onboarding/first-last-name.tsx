import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useCheckAuthorization } from 'services/useAuth';
import { z } from 'zod';

import { TextInput } from '../../components/FormElements/TextInput';
import { formValidationRules } from '../../formValidationRules';

const schema = z
  .object({
    firstName: formValidationRules.firstName,
    lastName: formValidationRules.lastName,
    middleName: formValidationRules.middleName,
  })
  .required();

export interface FirstLastNameFormFields {
  firstName: string;
  lastName: string;
  middleName?: string;
}

const FirstLastNamePage: NextPage = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [middleName, setMiddleName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useCheckAuthorization();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const form = useForm<FirstLastNameFormFields>({ resolver: zodResolver(schema) });

  const { handleSubmit } = form;

  const onSubmit = (data: any) => console.log(data); // eslint-disable-line

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Enter your first and last name as it appears on your ID" />
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              value={firstName}
              name="firstName"
              placeholder="First name"
              required
              onChange={event => setFirstName(event.target.value)}
            />
            <TextInput
              value={middleName}
              name="middleName"
              placeholder="Middle Name (Optional)"
              required
              onChange={event => setMiddleName(event.target.value)}
            />
            <TextInput
              value={lastName}
              name="lastName"
              placeholder="Last name"
              onChange={event => setLastName(event.target.value)}
            />
          </form>
        </FormProvider>
      </BlackModal>
    </MainLayout>
  );
};

export default FirstLastNamePage;
