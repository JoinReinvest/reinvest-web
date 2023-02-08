import { zodResolver } from '@hookform/resolvers/zod';
import { FirstLastNameForm } from 'components/FirstLastNameForm';
import { Title } from 'components/Title';
import { NextPage } from 'next';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z
  .object({
    firstName: z.string({ required_error: 'This field is required' }),
    lastName: z.string({ required_error: 'This field is required' }),
  })
  .required();

export interface FirstLastNameFormFields {
  firstName: string;
  lastName: string;
}

const FirstLastNamePage: NextPage = () => {
  const form = useForm<FirstLastNameFormFields>({ resolver: zodResolver(schema) });

  const { handleSubmit } = form;

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="bg-black-01 flex h-screen w-screen flex-col gap-60 p-24 md:items-center md:justify-center">
      <div className="max-w-332 flex flex-col gap-60 md:items-center md:justify-center">
        <div className="text-white md:text-center">
          <Title title="Enter your first and last name as it appears on your ID" />
        </div>
        <FormProvider {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full"
          >
            <FirstLastNameForm />
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default FirstLastNamePage;
