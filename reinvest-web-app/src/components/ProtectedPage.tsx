import { IconSpinner } from 'assets/icons/IconSpinner';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { URL } from '../constants/urls';
import { useAuth } from '../providers/AuthProvider';

interface ProtectedPageProps {
  children: JSX.Element;
}

export const ProtectedPage = ({ children }: ProtectedPageProps) => {
  const router = useRouter();

  const { loading, user } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push(URL.login);
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return <IconSpinner />;
  }

  return children;
};
