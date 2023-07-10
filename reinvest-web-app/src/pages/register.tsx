import { useRouter } from 'next/router';
import { RegistrationView } from 'views/register';

export default function PageRegister() {
  const router = useRouter();
  const referralQuery = router.query.referral;
  const referralCode = typeof referralQuery === 'string' ? referralQuery : undefined;

  // eslint-disable-next-line no-console
  console.info({ referralCode });

  return <RegistrationView referralCode={referralCode} />;
}
