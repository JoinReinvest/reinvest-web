import { InputAuthenticationCode } from 'components/FormElements/InputAuthenticationCode';
import { GetHelpLink } from 'components/Links/GetHelp';
import { ResendCodeLink } from 'components/Links/ResendCodeLink';
import { Title } from 'components/Title';
import { StepParams } from 'services/form-flow';

interface LoginFormFields {
  authenticationCode: string;
  email: string;
  password: string;
}

export const StepCheckYourPhone: StepParams<LoginFormFields> = {
  Component: () => {
    const { handleSubmit, control, formState } = useForm<Fields>({ defaultValues: storeFields, resolver: zodResolver(schema) });

    return (
      <>
        <Title
          title="Check Your Phone"
          subtitle="Enter the SMS authentication code sent to your phone (xxx) xxxx-xx84."
        />

        <InputAuthenticationCode
          name="authenticationCode"
          control={control}
          required
        />

        <div className="my-20 flex justify-between">
          <ResendCodeLink href="/" />
          <GetHelpLink />
        </div>
      </>
    );
  },
};
