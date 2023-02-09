import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import { TextInput } from '../../components/FormElements/TextInput';

const schema = z
  .object({
    firstName: z.string({ required_error: 'This field is required' }),
    lastName: z.string({ required_error: 'This field is required' }),
    middleName: z.string(),
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
  const { control } = useFormContext<FirstLastNameFormFields>();
  const [isOpen, setIsOpen] = useState(false);

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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <TextInput
              value={firstName}
              name="firstName"
              placeholder="First name"
              onChange={event => setFirstName(event.target.value)}
              control={control}
            />
            <TextInput
              value={middleName}
              name="middleName"
              placeholder="Middle Name (Optional)"
              onChange={event => setMiddleName(event.target.value)}
              control={control}
            />
            <TextInput
              value={lastName}
              name="lastName"
              placeholder="Last name"
              control={control}
              onChange={event => setLastName(event.target.value)}
            />
          </form>
        </FormProvider>
      </BlackModal>
    </MainLayout>
  );
};

export default FirstLastNamePage;
