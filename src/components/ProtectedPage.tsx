import { Auth, CognitoUser } from '@aws-amplify/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface ProtectedPageProps {
  children: JSX.Element;
}

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();
      const token = currentUser.getSignInUserSession()?.getAccessToken().getJwtToken();

      return token || null;
    };

    getToken()
      .then(value => {
        if (!value) {
          router.push('/login');
        }
      })
      .catch(() => {
        router.push('/login');
      });
  });

  return children;
};
