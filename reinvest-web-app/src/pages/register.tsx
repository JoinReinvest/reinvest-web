import { useRouter } from 'next/router';
import { RegistrationView } from 'views/register';
import { RegisterFormFlowProvider } from 'views/register/form-flow';

export default function PageRegister() {
  const router = useRouter();
  const referralQuery = router.query.referral;
  const referralCode = typeof referralQuery === 'string' ? referralQuery : undefined;

  return (
    <RegisterFormFlowProvider initialStoreFields={{ email: '', referralCode: referralCode, password: '', authenticationCode: '' }}>
      <RegistrationView />
    </RegisterFormFlowProvider>
  );
}
