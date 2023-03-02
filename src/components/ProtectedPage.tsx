import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';

import { AuthContext } from './AuthProvider';

interface ProtectedPageProps {
  children: JSX.Element;
}

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const router = useRouter();

  const { loading, user } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>loading</div>;
  }

  if (!user) {
    return <div>redirect</div>;
  }

  return children;
};
