import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput } from 'components/TextInput';
import { NextPage } from 'next';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import zod from 'zod';

const schema = zod
  .object({
    firstName: zod.string({ required_error: 'This field is required' }),
    lastName: zod.string({ required_error: 'This field is required' }),
  })
  .required();

const FirstLastNamePage: NextPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const form = useForm({ resolver: zodResolver(schema) });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = form;

  const onSubmit = (data: any) => console.log(data);

  return (
    <div className="bg-black-01 flex h-screen w-screen flex-col gap-60 p-24">
      <h2 className="text-white">First last name</h2>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            control={control}
            value={firstName}
            {...register('firstName')}
            placeholder="First name"
            error={errors.firstName?.message?.toString()}
            onChange={event => {
              console.log(event.target.value);
              setFirstName(event.target.value);
            }}
          />
          <TextInput
            value={lastName}
            {...register('lastName')}
            placeholder="Last name"
            error={errors.lastName?.message?.toString()}
            onChange={event => setLastName(event.target.value)}
          />
          <button
            type="submit"
            className="text-white"
          >
            Submit
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default FirstLastNamePage;
