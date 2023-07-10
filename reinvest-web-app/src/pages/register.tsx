// import { GetServerSideProps } from 'next';
// import { ParsedUrlQuery } from 'querystring';
import { RegistrationView } from 'views/register';
import { RegisterFormFlowProvider } from 'views/register/form-flow';

// interface Props {
//   referralCode?: string;
// }

// interface Params extends ParsedUrlQuery, Props {}

export default function PageRegister() {
  return (
    <RegisterFormFlowProvider initialStoreFields={{ email: '', referralCode: '', password: '', authenticationCode: '' }}>
      <RegistrationView />
    </RegisterFormFlowProvider>
  );
}

// export const getServerSideProps: GetServerSideProps<Props, Params> = async context => {
//   const referralCode = context.query.referral?.toString();

//   return { props: { referralCode: referralCode || undefined } };
// };
