import { IconSpinner } from 'assets/icons/IconSpinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAuth } from './AuthProvider';

interface ProtectedPageProps {
  children: JSX.Element;
}

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const router = useRouter();

  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <IconSpinner />;
  }

  return children;
};
