import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModal } from 'components/BlackModal';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCheckAuthorization } from 'services/useAuth';
import { z } from 'zod';

import { Input } from '../../components/FormElements/Input';
import { formValidationRules } from '../../formValidationRules';

const schema = z.object({
  firstName: formValidationRules.firstName,
  lastName: formValidationRules.lastName,
  middleName: formValidationRules.middleName,
});

export interface FirstLastNameFormFields {
  firstName: string;
  lastName: string;
  middleName?: string;
}

const FirstLastNamePage: NextPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useCheckAuthorization();

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const form = useForm<FirstLastNameFormFields>({ resolver: zodResolver(schema) });

  const { handleSubmit, control } = form;

  const onSubmit = (data: any) => console.log(data); // eslint-disable-line

  return (
    <MainLayout>
      <BlackModal isOpen={isOpen}>
        <Title title="Enter your first and last name as it appears on your ID" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            name="firstName"
            placeholder="First name"
            control={control}
          />
          <Input
            name="middleName"
            placeholder="Middle Name (Optional)"
            control={control}
          />
          <Input
            name="lastName"
            placeholder="Last name"
            control={control}
          />
        </form>
      </BlackModal>
    </MainLayout>
  );
};

export default FirstLastNamePage;
