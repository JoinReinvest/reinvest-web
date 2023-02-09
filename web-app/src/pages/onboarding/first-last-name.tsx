import { zodResolver } from '@hookform/resolvers/zod';
import { BlackModal } from 'components/BlackModal';
import { FirstLastNameForm } from 'components/FirstLastNameForm';
import { Title } from 'components/Title';
import { MainLayout } from 'layouts/MainLayout';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

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
  const form = useForm<FirstLastNameFormFields>({ resolver: zodResolver(schema) });

  const { handleSubmit } = form;

  const onSubmit = (data: any) => console.log(data);

  return (
    <MainLayout>
      <BlackModal
        isOpen={true}
        onOpenChange={() => {
          console.log('First-last-name');
        }}
      >
        <Title title="Enter your first and last name as it appears on your ID" />
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <FirstLastNameForm />
          </form>
        </FormProvider>
      </BlackModal>
    </MainLayout>
  );
};

export default FirstLastNamePage;
